from typing import TypedDict, List, Set, Tuple

class AgentState(TypedDict):
    task: str
    plan: str
    draft: str
    target_language: str
    references: Set[Tuple[str, str]]
    queries: List[str]
    content: Set[str]