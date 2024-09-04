from typing import List
import logging

from langchain_core.messages import SystemMessage, HumanMessage
from langchain_core.pydantic_v1 import BaseModel, Field

from config import (
    TAVILY_MAX_RESULTS,
    DEBUG_MODE,
    MAX_QUERIES,
    OPENAI_MODEL_NAME_MINI,
    OPENAI_MODEL_NAME_LARGE,
    ANTHROPIC_MODEL_NAME,
)
from clients import get_model, get_tavily
from agents.state import AgentState
from agents import prompts

ANTHROPIC_MODEL = get_model(ANTHROPIC_MODEL_NAME)
OPENAI_MODEL = get_model(OPENAI_MODEL_NAME_MINI)

TAVILY = get_tavily()

logger = logging.getLogger()
logger.setLevel(logging.INFO if DEBUG_MODE else logging.ERROR)


def inject_model(model):
    def decorator(func):
        def wrapper(*args, **kwargs):
            return func(*args, model=model, **kwargs)

        return wrapper

    return decorator


def inject_tavily(tavily):
    def decorator(func):
        def wrapper(*args, **kwargs):
            return func(*args, tavily=tavily, **kwargs)

        return wrapper

    return decorator


def format_task_prompt(task: str):
    return f"This is the subject matter: {task}\n\n"


def format_outline_prompt(outline: str):
    return f"Here is the outline of the fact-checking article:\n{outline}\n\n"


def format_controversies_prompt(controversies: list):
    controversies_str = "\n-------------------\n".join(controversies)

    return f"Here are the controversies found:\n{controversies_str}\n\n"


def format_content_entry(content: dict):

    formated_entry = f"REFERENCE NUMBER: {content['ref_num']}\n"
    formated_entry += f"SEARCH QUERY: {content['search_query']}\n"
    formated_entry += (
        f"CONTENT:\n{content['content']['title']}\n{content['content']['content']}"
    )
    return formated_entry


def format_content(contents: list):
    content = "\n-------------------\n".join(map(format_content_entry, contents))
    return content


def format_content_prompt(contents: list):
    return f"This is the content:\n{format_content(contents)}\n\n"


@inject_model(model=ANTHROPIC_MODEL)
def get_outline(state: AgentState, model):
    logger.info("Getting outline")
    messages = [
        SystemMessage(content=prompts.OUTLINE_PROMPT),
        HumanMessage(content=state["task"]),
    ]
    response = model.invoke(messages)
    outline = response.content

    logger.info(f"Outline generated: {outline}")
    return outline


def outline_node(state: AgentState):

    outline = get_outline(state)
    return {"outline": outline}


class Queries(BaseModel):
    queries: List[str] = Field(description="list of seraech queries")


@inject_model(model=OPENAI_MODEL)
def get_queries(state: AgentState, model):

    logger.info("Getting queries")

    prompt = prompts.RESEARCH_OUTLINE_PROMPT.format(
        max_queries=MAX_QUERIES, target_language=state["target_language"]
    )
    user_prompt = format_task_prompt(state["task"])
    user_prompt += format_outline_prompt(state["outline"])

    messages = [SystemMessage(content=prompt), HumanMessage(content=user_prompt)]
    queries = model.with_structured_output(Queries).invoke(messages)
    queries = queries.queries

    logger.info(f"Queries generated: {queries}")
    return queries


@inject_tavily(TAVILY)
def get_content(state, queries, tavily):

    logger.info("Getting content and references")

    references = state.get("references") or []
    contents = state.get("content") or []
    ref_num = 0
    for q in queries:
        response = tavily.search(query=q, max_results=TAVILY_MAX_RESULTS)
        for r in response["results"]:
            content = {"ref_num": ref_num, "search_query": q, "content": r}
            reference = {"ref_num": ref_num, "title": r["title"], "url": r["url"]}
            contents.append(content)
            references.append(reference)
            ref_num += 1

    logger.info(f"Content generated: {contents}")
    logger.info(f"References generated : {references}")

    return contents, references


def research_outline_node(state: AgentState):
    queries = get_queries(state)
    contents, references = get_content(state, queries)

    return {"content": contents, "queries": queries, "references": references}


class Controversies(BaseModel):
    controversies: List[str] = Field(
        description="list of misinformation, disinformation or claims worth fact-checking"
    )


@inject_model(model=OPENAI_MODEL)
def get_controversies(state: AgentState, model):

    logger.info("Getting controversies")

    user_promp = format_task_prompt(state["task"])
    user_promp += format_content_prompt(state["content"])
    controversies = model.with_structured_output(Controversies).invoke(
        [
            SystemMessage(content=prompts.CONTROVERSIES_PROMPT),
            HumanMessage(content=user_promp),
        ]
    )
    controversies = controversies.controversies
    logger.info(f"Controversies found: {controversies}")
    return controversies


def content_analyzer_node(state: AgentState):

    controversies = get_controversies(state)

    return {"controversies": controversies}


@inject_model(model=OPENAI_MODEL)
def get_draft(state: AgentState, model):

    logger.info("Getting draft")

    language = state["target_language"]
    content = format_content(state["content"])
    draft_promp = prompts.WRITER_PROMPT.format(content=content, language=language)

    user_prompt = format_task_prompt(state["task"])
    user_prompt += format_outline_prompt(state["outline"])
    user_prompt += format_controversies_prompt(state["controversies"])

    messages = [SystemMessage(content=draft_promp), HumanMessage(content=user_prompt)]

    response = model.invoke(messages)
    draft = response.content

    logger.info(f"Draft generated: {draft}")
    return draft


def writer_node(state: AgentState):

    draft = get_draft(state)

    return {"draft": draft}
