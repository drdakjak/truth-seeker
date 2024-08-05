from config import MAX_QUERIES

PLAN_PROMPT = """You are an expert writer specialised on unbiased information veryfication in the context of dezinformation, conspiracy theories and propaganda. \
You are tasked with writing a high level outline of an expository article. \
Write such an outline for the user provided topic. Give an outline of the expository article along with any relevant notes \
or instructions for the sections."""

RESEARCH_PLAN_PROMPT = """You are a researcher charged with providing information that can \
be used when writing the following expository article. Generate a list of search queries that will gather \
any relevant information. Only generate {max_queries} queries max.""".format(max_queries=MAX_QUERIES)

TRANSLATION_PROMPT = """Translate the following text from {input_language} into {output_language}, with the following requirements: \
    ① Ensure accuracy first \
    ② Secondly, it must conform to the described context of the given text \
    ③ Maintain a balance between literal translation and paraphrasing \
    ④ For any slang that exists, provide an explanation at the end of the translation \
    ⑤ Output the results in accordance with certain formats \
    1. Translation of the original text \
    2. Paraphrased parts (list the original input-language parts without translating them into output-language, \
        explain the paraphrased translation, and indicate whether it conforms to Chinese expression habits) \
    • \
    • \
    • \
    3. Existence of slang and fixed expressions \
    • \
    • \
    • \
    ⑥ The following is the paragraph to be translated: \
    {text}'
"""

DRAFT_PROMPT = """You are an expository article assistant tasked with writing excellent 5-paragraph expository article.\
Generate the best unbiased expository article possible for the user's request and the initial outline. \
If the user provides critique, respond with a revised version of your previous attempts. \
Utilize only the information below, don't add any new information, make up or gues anything, or change the topic. : 

------

{content}"""

REFLECTION_PROMPT = """You are a teacher grading an essay submission. \
Generate critique and recommendations for the user's submission. \
Provide detailed recommendations, including requests for length, depth, style, etc."""



RESEARCH_CRITIQUE_PROMPT = """You are a researcher charged with providing information that can \
be used when making any requested revisions (as outlined below). \
Generate a list of search queries that will gather any relevant information. Only generate 3 queries max."""