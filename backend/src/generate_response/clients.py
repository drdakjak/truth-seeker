import os

import boto3
from langchain_openai import ChatOpenAI
from tavily import TavilyClient
from config import OPENAI_MODEL_NAME
from load_secrets import load_secrets

load_secrets()

def get_model():
    return ChatOpenAI(
        model=OPENAI_MODEL_NAME, temperature=0, api_key=os.environ.get("OPENAI_API_KEY")
    )


def get_tavily():
    return TavilyClient(api_key=os.environ.get("TAVILY_API_KEY"))


def get_s3_client():
    return boto3.client("s3")
