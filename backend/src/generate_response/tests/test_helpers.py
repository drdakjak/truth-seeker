import pytest
from ..helpers import find_all_ref_nums, get_only_used_references, get_parameters, get_content_and_references

def test_find_all_ref_nums():
    text = "This is a test string with references [1, 2, 3] and [4, 5] and [6]."
    expected_result = {1, 2, 3, 4, 5, 6}
    assert find_all_ref_nums(text) == expected_result

    text = "No references here."
    expected_result = set()
    assert find_all_ref_nums(text) == expected_result

    text = "Single reference [42]."
    expected_result = {42}
    assert find_all_ref_nums(text) == expected_result

    text = "Multiple references [7, 8, 9] and [10, 11, 12]."
    expected_result = {7, 8, 9, 10, 11, 12}
    assert find_all_ref_nums(text) == expected_result

    text = "Overlapping references [13, 14] and [14, 15]."
    expected_result = {13, 14, 15}
    assert find_all_ref_nums(text) == expected_result

    text = "Next each other [13][14, 15, 16] and [1, 2]."
    expected_result = {1, 2, 13, 14, 15, 16}
    assert find_all_ref_nums(text) == expected_result


def test_get_only_used_references():
    text = "This is a test string with references [1, 2, 3] and [4, 5] and [6]."
    references = [(1, "ref1"), (2, "ref2"), (3, "ref3"), (4, "ref4"), (5, "ref5"), (6, "ref6")]
    expected_result = [(1, "ref1"), (2, "ref2"), (3, "ref3"), (4, "ref4"), (5, "ref5"), (6, "ref6")]
    assert get_only_used_references(text, references) == expected_result

    text = "No references here."
    references = [(1, "ref1"), (2, "ref2"), (3, "ref3")]
    expected_result = []
    assert get_only_used_references(text, references) == expected_result

    text = "Single reference [42]."
    references = [(42, "ref42"), (43, "ref43"), (44, "ref44")]
    expected_result = [(42, "ref42")]
    assert get_only_used_references(text, references) == expected_result

    text = "Multiple references [7, 8, 9] and [10, 11, 12]."
    references = [(7, "ref7"), (8, "ref8"), (9, "ref9"), (10, "ref10"), (11, "ref11"), (12, "ref12")]
    expected_result = [(7, "ref7"), (8, "ref8"), (9, "ref9"), (10, "ref10"), (11, "ref11"), (12, "ref12")]
    assert get_only_used_references(text, references) == expected_result

    text = "Overlapping references [13, 14] and [14, 15]."
    references = [(13, "ref13"), (14, "ref14"), (15, "ref15")]
    expected_result = [(13, "ref13"), (14, "ref14"), (15, "ref15")]
    assert get_only_used_references(text, references) == expected_result


def test_get_content_and_references():
    state = {
        "draft": "This is a test string with references [1, 2, 3] and [4, 5] and [6].",
        "references": [(1, "ref1"), (2, "ref2"), (3, "ref3"), (4, "ref4"), (5, "ref5"), (6, "ref6")]
    }
    expected_result = {
        "references": [(1, "ref1"), (2, "ref2"), (3, "ref3"), (4, "ref4"), (5, "ref5"), (6, "ref6")],
        "content": "This is a test string with references [1, 2, 3] and [4, 5] and [6]."
    }
    assert get_content_and_references(state) == expected_result

    state = {
        "draft": "No references here.",
        "references": [(1, "ref1"), (2, "ref2"), (3, "ref3")]
    }
    expected_result = {
        "references": [],
        "content": "No references here."
    }
    assert get_content_and_references(state) == expected_result

    state = {
        "draft": "Single reference [42].",
        "references": [(42, "ref42"), (43, "ref43"), (44, "ref44")]
    }
    expected_result = {
        "references": [(42, "ref42")],
        "content": "Single reference [42]."
    }
    assert get_content_and_references(state) == expected_result

    state = {
        "draft": "Multiple references [7, 8, 9] and [10, 11, 12].",
        "references": [(7, "ref7"), (8, "ref8"), (9, "ref9"), (10, "ref10"), (11, "ref11"), (12, "ref12")]
    }
    expected_result = {
        "references": [(7, "ref7"), (8, "ref8"), (9, "ref9"), (10, "ref10"), (11, "ref11"), (12, "ref12")],
        "content": "Multiple references [7, 8, 9] and [10, 11, 12]."
    }
    assert get_content_and_references(state) == expected_result

    state = {
        "draft": "Overlapping references [13, 14] and [14, 15].",
        "references": [(13, "ref13"), (14, "ref14"), (15, "ref15")]
    }
    expected_result = {
        "references": [(13, "ref13"), (14, "ref14"), (15, "ref15")],
        "content": "Overlapping references [13, 14] and [14, 15]."
    }
    assert get_content_and_references(state) == expected_result


def test_get_parameters():
    event = {
        "pathParameters": {
            "query": "example query",
            "language": "python"
        }
    }
    expected_result = ("example query", "python")
    assert get_parameters(event) == expected_result

if __name__ == "__main__":
    pytest.main()