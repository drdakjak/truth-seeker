from typing import TypedDict, List

class AgentState(TypedDict):
    task: str
    plan: str
    draft: str
    translation: str
    target_language: str
    queries: List[str]
    content: List[str]