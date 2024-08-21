import json

from config import DEBUG_MODE
from agents.graph import build_graph, invoke_graph
from helpers import get_content_and_references, get_parameters


def lambda_handler(event, context):

    query, language = get_parameters(event)

    graph = build_graph()
    state = invoke_graph(graph, query, language, DEBUG_MODE)
    body = get_content_and_references(state)

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
        },
        "body": json.dumps(body),
    }
