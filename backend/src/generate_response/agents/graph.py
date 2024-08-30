from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import StateGraph
from agents import nodes
from agents import state


def build_graph():
    builder = StateGraph(state.AgentState)
    builder.add_node("planner_node", nodes.plan_node)
    builder.add_node("research_plan_node", nodes.research_plan_node)
    builder.add_node("writer_node", nodes.writer_node)

    builder.add_edge("planner_node", "research_plan_node")
    builder.add_edge("research_plan_node", "writer_node")

    builder.set_entry_point("planner_node")

    graph = builder.compile()
    return graph


def invoke_graph(graph: StateGraph, query: str, language: str, debug: bool = False):
    params = {
        "task": query,
        "target_language": language,
    }
    config = {"configurable": {"thread_id": 1}}
    final_state = graph.invoke(params, config=config, debug=debug)
    return final_state
