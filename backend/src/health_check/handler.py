import json
def handler(event, context):
    # Log the event argument for debugging and for use in local development.
    print(json.dumps(event))

    return {'statusCode': 200, 
            'headers': {
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
            }
        }