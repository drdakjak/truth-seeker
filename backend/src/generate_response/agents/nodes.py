from typing import List
import logging

from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from langchain_core.pydantic_v1 import BaseModel

from config import TAVILY_MAX_RESULTS, DEBUG_MODE, MAX_QUERIES
from clients import get_model, get_tavily
from agents.state import AgentState
from agents import prompts

MODEL = get_model()
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


@inject_model(model=MODEL)
def get_plan(state: AgentState, model):
    logger.info("Getting plan")
    messages = [
        SystemMessage(content=prompts.PLAN_PROMPT),
        HumanMessage(content=state["task"]),
    ]
    response = model.invoke(messages)
    plan = response.content

    logger.info(f"Plan generated: {plan}")
    return plan


def plan_node(state: AgentState):

    plan = get_plan(state)
    return {"plan": plan}


def format_content(contents: list):

    content = "\n-------------------\n".join(contents)
    return content


@inject_model(model=MODEL)
def get_draft(state: AgentState, model):

    logger.info("Getting draft")

    language = state["target_language"]
    content = format_content(state["content"])
    user_message = f"{state['task']}\n\nHere is my outline:\n\n{state['plan']}"

    draft_promp = prompts.WRITER_PROMPT.format(content=content, language=language)
    messages = [SystemMessage(content=draft_promp), HumanMessage(content=user_message)]

    response = model.invoke(messages)
    draft = response.content

    logger.info(f"Draft generated: {draft}")
    return draft


def writer_node(state: AgentState):

    draft = get_draft(state)

    return {"draft": draft}


class Queries(BaseModel):
    queries: List[str]


@inject_model(model=MODEL)
def get_queries(state: AgentState, model):

    logger.info("Getting queries")

    prompt = prompts.RESEARCH_PLAN_PROMPT.format(
        max_queries=MAX_QUERIES, target_language=state["target_language"]
    )
    user_prompt = f"This is the subject matter: {state['task']}"
    user_prompt += "\n\n ------------------ \n\n"
    user_prompt += f"Here is the outline of the fact-checking article:\n{state['plan']}"

    messages = [SystemMessage(content=prompt), HumanMessage(content=user_prompt)]
    queries = model.with_structured_output(Queries).invoke(messages)
    queries = queries.queries

    logger.info(f"Queries generated: {queries}")
    return queries


@inject_tavily(TAVILY)
def get_content(state, queries, tavily):

    logger.info("Getting content and references")

    references = state.get("references") or set()
    contents = state.get("content") or set()
    ref_num = 0
    for q in queries:
        response = tavily.search(query=q, max_results=TAVILY_MAX_RESULTS)
        for r in response["results"]:
            content = f"REFERENCE: {ref_num}\n"
            content += f"SEARCH QUERY: {q}\n"
            content += f"CONTENT: {r['content']}"
            contents.add(content)
            references.add((ref_num, r["title"], r["url"]))
            ref_num += 1

    logger.info(f"Content generated: {contents}")
    logger.info(f"References generated : {references}")

    return contents, references


def research_plan_node(state: AgentState):
    queries = get_queries(state)
    contents, references = get_content(state, queries)

    return {"content": contents, "queries": queries, "references": references}
