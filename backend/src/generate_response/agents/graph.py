from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import StateGraph
from agents import nodes
from agents import state

def build_graph():
    checkpointer = MemorySaver()

    builder = StateGraph(state.AgentState)
    builder.add_node("planner_node", nodes.plan_node)
    builder.add_node("research_plan_node", nodes.research_plan_node)
    builder.add_node("writer_node", nodes.writer_node)

    builder.add_edge("planner_node", "research_plan_node")
    builder.add_edge("research_plan_node", "writer_node")

    builder.set_entry_point("planner_node")

    graph = builder.compile(checkpointer=checkpointer)
    return graph