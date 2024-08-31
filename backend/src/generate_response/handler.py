import json

from agents.graph import build_graph, invoke_graph
from helpers import get_content_and_references, get_parameters, get_request_id, add_request_id_to_body
from db_storage import store_request_in_db


def lambda_handler(event, context):
    try:
        request_id = get_request_id()
        query, language, version = get_parameters(event)

        if version == "v0":
            return {
                "statusCode": 200,
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                },
                "body": json.dumps({"request_id": request_id, "references": [], "content": "# Version 0 is no longer supported. Please use version 1."}),
            }

        graph = build_graph()
        state = invoke_graph(graph, query, language)
        body = get_content_and_references(state)

        # Store the request in DynamoDB
        store_request_in_db(request_id, query, language, body)
        body = add_request_id_to_body(body, request_id)
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
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }