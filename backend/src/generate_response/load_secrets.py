# Use this code snippet in your app.
# If you need more information about configurations
# or implementing the sample code, visit the AWS docs:
# https://aws.amazon.com/developer/language/python/
import json
import os
import logging

import boto3
from botocore.exceptions import ClientError

from config import SECRET_NAME, REGION_NAME

logger = logging.getLogger()
logger.setLevel("INFO")

def load_secrets():
    secret_name = SECRET_NAME
    region_name = REGION_NAME

    logger.info("Loading secrets client")
    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=region_name
    )
    logger.info("Secrets client loaded")

    try:
        get_secret_value_response = client.get_secret_value(
            SecretId=secret_name
        )
    except ClientError as e:
        # For a list of exceptions thrown, see
        # https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        logger.exception(e)

    secret = get_secret_value_response['SecretString']
    secret = json.loads(secret)

    for key, value in secret.items():
        os.environ[key] = value