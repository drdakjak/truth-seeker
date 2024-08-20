def find_all_ref_nums(text: str) -> set:
    import re

    # Create a regex pattern to match individual numbers within square brackets
    pattern = r'\[(\d+(?:, \d+)*)\]'

    # Find all matches
    matches = list(re.finditer(pattern, text))

    # Extract positions and values of individual numbers
    individual_numbers = []
    for match in matches:
        numbers_str = match.group(1)
        numbers = numbers_str.split(', ')
        
        for number in numbers:
            individual_numbers.append(int(number))

            
    return set(individual_numbers)

def get_only_used_references(text: str, references: list) -> list:
    ref_nums = find_all_ref_nums(text)
    references = [ref for ref in references if ref[0] in ref_nums]
    references = sorted(references, key=lambda x: x[0])
    return references