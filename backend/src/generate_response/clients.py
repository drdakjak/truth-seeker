import os

import boto3
from langchain_openai import ChatOpenAI
from tavily import TavilyClient
from load_secrets import load_secrets

load_secrets()

def get_model(model_name: str):
    return ChatOpenAI(
        model=model_name, temperature=0.0, api_key=os.environ.get("OPENAI_API_KEY")
    )


def get_tavily():
    return TavilyClient(api_key=os.environ.get("TAVILY_API_KEY"))


def get_s3_client():
    return boto3.client("s3")

def get_dynamodb_resource():
    return boto3.resource("dynamodb")

def get_dynamodb_table():
    dynamodb = get_dynamodb_resource()
    table_name = os.environ.get('RATINGS_TABLE_NAME', 'UserRatings')
    table = dynamodb.Table(table_name)
    return table