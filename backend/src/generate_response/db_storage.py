from clients import get_dynamodb_table
from datetime import datetime
import logging
from config import DEBUG_MODE

logger = logging.getLogger()
logger.setLevel(logging.INFO if DEBUG_MODE else logging.ERROR)


def store_request_in_db(uuid: int, query: str, language: str, response: dict):
    logging.info(f"Storing request in DynamoDB: {uuid}")
    table = get_dynamodb_table()

    # Store the request in DynamoDB
    item = {
        'id': uuid,  # Use timestamp as a unique identifier
        'query': query,
        'language': language,
        'response': response,
        'timestamp': str(datetime.now()),
        'rating': None
    }
    table.put_item(Item=item)
    logging.info("Request stored in DynamoDB")
    
