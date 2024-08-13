import json

# from agents.graph import build_graph
from config import DEBUG_MODE

def lambda_handler(event, context):
    print("Event: ", event)
    print("Context: ", context)
    # event_body = json.loads(event["body"])
    # human_input = event_body["prompt"]
    # Get the environment variables
    # bucket_name = os.environ['BUCKET_NAME']
    # key = os.environ['KEY']
    print(DEBUG_MODE)


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


    if DEBUG_MODE:
        return {
        'statusCode': 200,
        'headers': {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
        },
        'body': {"debug": "DEBUG MODE ENABLED"}
        }
    
    graph = build_graph()

    human_input = "Dezinformátorské žně kvůli ukrajinskému obilí. EU přitom nezavádí omezení dovozu kvůli jedům"
    params = {
        'task': human_input,
        'target_language': "czech",
    }
    config = {"configurable": {"thread_id": 1}}
    final_state = graph.invoke(params, config=config, debug=DEBUG_MODE)
    content = final_state['draft']

    # Return the response
    return {
        'statusCode': 200,
        'headers': {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
        },
        'body': content
    }