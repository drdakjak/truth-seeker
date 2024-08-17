from typing import List

from langchain_core.messages import SystemMessage, HumanMessage
from langchain_core.pydantic_v1 import BaseModel

from config import TAVILY_MAX_RESULTS
from clients import get_model, get_tavily
from agents.state import AgentState
from agents import prompts

MODEL = get_model()
TAVILY = get_tavily()


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

    messages = [
        SystemMessage(content=prompts.PLAN_PROMPT),
        HumanMessage(content=state["task"]),
    ]
    response = model.invoke(messages)
    plan = response.content

    return plan


def plan_node(state: AgentState):

    plan = get_plan(state)
    return {"plan": plan}


def format_content(contents: list):

    content = "\n-------------------\n".join(contents)
    return content


@inject_model(model=MODEL)
def get_draft(state: AgentState, model):

    language = state["target_language"]
    content = format_content(state["content"])
    user_message = f"{state['task']}\n\nHere is my outline:\n\n{state['plan']}"

    draft_promp = prompts.WRITER_PROMPT.format(content=content, language=language)
    messages = [SystemMessage(content=draft_promp), HumanMessage(content=user_message)]

    response = model.invoke(messages)
    draft = response.content
    return draft


def writer_node(state: AgentState):

    draft = get_draft(state)

    return {"draft": draft}


class Queries(BaseModel):
    queries: List[str]


@inject_model(model=MODEL)
def get_queries(state: AgentState, model):

    prompt = prompts.RESEARCH_PLAN_PROMPT.format(max_queries=TAVILY_MAX_RESULTS)
    messages = [SystemMessage(content=prompt), HumanMessage(content=state["task"])]
    queries = model.with_structured_output(Queries).invoke(messages)
    queries = queries.queries

    return queries


@inject_tavily(TAVILY)
def get_content(state, queries, tavily):
    references = state["references"] or set()
    content = state["content"] or set()
    for q in queries:
        response = tavily.search(query=q, max_results=TAVILY_MAX_RESULTS)
        for r in response["results"]:
            content.add(r["content"])
            references.add((r["title"], r["url"]))
    return content, references


def research_plan_node(state: AgentState):

    queries = get_queries(state)
    content, references = get_content(state, queries)

    return {"content": content, "queries": queries, "references": references}
