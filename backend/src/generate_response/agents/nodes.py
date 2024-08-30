from typing import List
import logging

from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from langchain_core.pydantic_v1 import BaseModel

from config import TAVILY_MAX_RESULTS, DEBUG_MODE
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
def get_plan(state: AgentState, model, version):
    plan_prompt = prompts.PLAN_PROMPT if version == 1 else prompts.PLAN_PROMPT_v2
    logger.info("Getting plan")
    messages = [
        SystemMessage(content=plan_prompt),
        HumanMessage(content=state["task"]),
    ]
    response = model.invoke(messages)
    plan = response.content

    logger.info(f"Plan generated: {plan}")
    return plan


def plan_node(state: AgentState, version=1):

    plan = get_plan(state, version=version)
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


class Query(BaseModel):
    query: str


@inject_model(model=MODEL)
def get_queries(state: AgentState, model):

    logger.info("Getting queries")

    prompt = prompts.RESEARCH_PLAN_PROMPT.format(max_queries=TAVILY_MAX_RESULTS)
    messages = [SystemMessage(content=prompt), HumanMessage(content=state["task"])]
    queries = model.with_structured_output(Queries).invoke(messages)
    queries = queries.queries

    logger.info(f"Queries generated: {queries}")
    return queries


@inject_model(model=MODEL)
def get_queries(state: AgentState, model):

    logger.info("Getting queries")

    user_prompt = f"This is the subject matter: {state['task']}\n\n ------------------ \n\nHere is the outline of the fact-checking article:\n{state['plan']}"

    prompt = prompts.RESEARCH_PLAN_PROMPT.format(max_queries=TAVILY_MAX_RESULTS)
    messages = [SystemMessage(content=prompt), HumanMessage(content=user_prompt)]
    queries = model.with_structured_output(Queries).invoke(messages)
    queries = queries.queries

    logger.info(f"Queries generated: {queries}")
    return queries


@inject_model(model=MODEL)
def get_queries_v3(state: AgentState, model, run_id, content, chat_history):

    logger.info("Getting queries")
    if run_id == 0:
        prompt = prompts.RESEARCH_PLAN_PROMPT_v3
        chat_history.add_message(SystemMessage(content=prompt))
        user_prompt = f"This is the subject matter: \n\n{state['task']}\n\n ------------------ \n\nHere is the outline of the fact-checking article:\n\n{state['plan']}"
        chat_history.add_message(HumanMessage(content=user_prompt))

    else:
        user_prompt = f"Fetched content from previous queries is {content}."
        chat_history.add_message(HumanMessage(content=user_prompt))

    response = model.with_structured_output(Query).invoke(chat_history.messages)
    query = response.query
    chat_history.add_message(AIMessage(content=query))

    logger.info(f"Query generated: {query}")
    return query


@inject_tavily(TAVILY)
def get_content(state, queries, tavily):

    logger.info("Getting content and references")

    references = state.get("references") or set()
    contents = state.get("content") or set()
    ref_num = 0
    for q in queries:
        response = tavily.search(query=q, max_results=TAVILY_MAX_RESULTS)
        for r in response["results"]:
            content = f"REFERENCE: {ref_num}\n\n" + r["content"]
            contents.add(content)
            references.add((ref_num, r["title"], r["url"]))
            ref_num += 1

    logger.info(f"Content generated: {contents}")
    logger.info(f"References generated : {references}")

    return contents, references


@inject_tavily(TAVILY)
def get_content_v3(state, tavily):
    from langchain.memory import ChatMessageHistory

    chat_history = ChatMessageHistory()

    logger.info("Getting content and references")

    references = state.get("references") or set()
    contents = state.get("content") or set()

    queries = []
    ref_num = 0
    for i in range(5):
        query = get_queries_v3(
            state, run_id=i, content=format_content(contents), chat_history=chat_history
        )

        queries.append(query)

        response = tavily.search(query=query, max_results=TAVILY_MAX_RESULTS)
        for r in response["results"]:
            content = f"REFERENCE: {ref_num}\n\n" + r["content"]
            contents.add(content)
            references.add((ref_num, r["title"], r["url"]))
            ref_num += 1

    logger.info(f"Content generated: {contents}")
    logger.info(f"References generated : {references}")

    return queries, contents, references


def research_plan_node(state: AgentState, version=1):
    if version == 1:
        queries = get_queries(state)
        contents, references = get_content(state, queries)

    elif version == 3:
        queries, contents, references = get_content_v3(state)

    return {"content": contents, "queries": queries, "references": references}
