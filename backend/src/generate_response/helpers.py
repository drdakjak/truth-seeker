import logging
from urllib.parse import unquote
import uuid
from config import DEBUG_MODE

logger = logging.getLogger()
logger.setLevel(logging.INFO if DEBUG_MODE else logging.ERROR)



def find_all_ref_nums(text: str) -> set:
    import re

    # Create a regex pattern to match individual numbers within square brackets
    pattern = r"\[(\d+(?:, \d+)*)\]"

    # Find all matches
    matches = list(re.finditer(pattern, text))

    # Extract positions and values of individual numbers
    individual_numbers = []
    for match in matches:
        numbers_str = match.group(1)
        numbers = numbers_str.split(", ")

        for number in numbers:
            individual_numbers.append(int(number))

    return set(individual_numbers)


def get_only_used_references(text: str, references: list) -> list:
    ref_nums = find_all_ref_nums(text)
    references = [ref for ref in references if ref['ref_num'] in ref_nums]
    references = sorted(references, key=lambda x: x['ref_num'])
    return references


def get_content_and_references(state: dict) -> dict:
    content = state["draft"]
    references = state["references"]

    references = get_only_used_references(content, references)

    logger.info(f"CONTENT: {content}")
    logger.info(f"REFERENCES: {references}")

    body = {"references": references, "content": content}
    return body


def get_parameters(event: dict) -> tuple:
    path_parameters = event["pathParameters"]
    query = unquote(path_parameters["query"])
    language = path_parameters["language"]
    version = path_parameters["version"]


    logger.info(f"QUERY: {query}")
    logger.info(f"LANGUAGE: {language}")
    logger.info(f"VERSION: {version}")

    return query, language, version

def get_request_id() -> str:
    return uuid.uuid4().hex

def add_request_id_to_body(body: dict, request_id: str) -> dict:
    body["request_id"] = request_id
    return body