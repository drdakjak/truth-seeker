import os

import boto3

def get_dynamodb_resource():
    return boto3.resource("dynamodb")

def get_dynamodb_table():
    dynamodb = get_dynamodb_resource()
    table_name = os.environ.get('RATINGS_TABLE_NAME', 'UserRatings')
    table = dynamodb.Table(table_name)
    return table