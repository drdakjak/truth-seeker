import json
import logging
from db_storage import update_rating_in_db

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    try:
        logging.info(f"Received rating")
        body = json.loads(event["body"])
        rating = body["rating"]
        request_id = body["request_id"]

        update_rating_in_db(request_id, rating)
        
        logging.info(f"Rating updated successfully")
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
            },
            "body": json.dumps({"message": "Rating submitted successfully"}),
        }
    except Exception as e:
        return {"statusCode": 500, "body": json.dumps({"error": str(e)})}
