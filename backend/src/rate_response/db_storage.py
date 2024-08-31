import logging

from clients import get_dynamodb_table

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def update_rating_in_db(uuid: int, rating: int):
    logging.info(f"Updating rating in DynamoDB: {uuid}")
    table = get_dynamodb_table()

    table.update_item(
        Key={'id': uuid},
        UpdateExpression="set rating = :r",
        ExpressionAttributeValues={":r": rating},
        ReturnValues="UPDATED_NEW"
    )
    logging.info("Rating updated in DynamoDB")