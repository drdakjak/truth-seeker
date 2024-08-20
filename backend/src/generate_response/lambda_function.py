import json
from urllib.parse import unquote

from agents.graph import build_graph
from config import DEBUG_MODE

from helpers import get_only_used_references

def lambda_handler(event, context):
    print("Event: ", event)
    print("Context: ", context)

    path_parameters = event["pathParameters"]
    print("event: ", path_parameters)

    query = unquote(path_parameters["query"])
    language = path_parameters["language"]
    print("human_input: ", query)
    print("language: ", language)

    # Get the environment variables
    # bucket_name = os.environ['BUCKET_NAME']
    # key = os.environ['KEY']
    print(DEBUG_MODE)

    if DEBUG_MODE:
        from load_secrets import load_secrets

        print("Loading secrets")
        load_secrets()
        print("Secrets loaded")

        from clients import get_model, get_tavily

        print("Getting model")
        model = get_model()
        print("Model gotten")
        print("Getting tavily")
        tavily = get_tavily()
        print("Tavily gotten")
        body = f"""
Heading
=======

Sub-heading
-----------

# Alternative heading

## Alternative sub-heading

Paragraphs are separated 
by a blank line.

Two spaces at the end of a line  
produce a line break.

-------------
DEBUG MODE ENABLED: query: {query} 

Language: {language}
"""
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
    print("Build graph")
    graph = build_graph()
    print("Build graph finished")

    # query = "Dezinformátorské žně kvůli ukrajinskému obilí. EU přitom nezavádí omezení dovozu kvůli jedům"
    params = {
        "task": query,
        "target_language": language,
    }
    config = {"configurable": {"thread_id": 1}}
    print("Invoke graph")
    final_state = graph.invoke(params, config=config, debug=DEBUG_MODE)
    print("Finished")

    content = final_state["draft"]
    references = final_state["references"]

    print(json.dumps(content))
    
    
    references = get_only_used_references(content, references)
    
    
    # Return the response
    body = {
        'references': references,
        'content': content
    }
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
