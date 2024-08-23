import pytest
import os

from ..load_secrets import is_environment_variables_set


def test_is_environment_variables_set():
    os.environ["OPENAI_API_KEY"] = ""
    os.environ["TAVILY_API_KEY"] = ""

    expected_result = False
    assert is_environment_variables_set() == expected_result

    expected_result = False
    assert is_environment_variables_set() == expected_result

    os.environ["OPENAI_API_KEY"] = "xyz"
    os.environ["TAVILY_API_KEY"] = ""

    expected_result = False
    assert is_environment_variables_set() == expected_result

    os.environ["OPENAI_API_KEY"] = ""
    os.environ["TAVILY_API_KEY"] = "xyz"

    expected_result = False
    assert is_environment_variables_set() == expected_result

    os.environ["OPENAI_API_KEY"] = "xyz"
    os.environ["TAVILY_API_KEY"] = "xyz"

    expected_result = True
    assert is_environment_variables_set() == expected_result

    del os.environ["OPENAI_API_KEY"]
    del os.environ["TAVILY_API_KEY"]

    expected_result = False
    assert is_environment_variables_set() == expected_result

    os.environ["TAVILY_API_KEY"] = "xyz"

    expected_result = False
    assert is_environment_variables_set() == expected_result
