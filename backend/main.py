import json
from email.policy import strict

from model import Concept, dataclass_encoder, OllamaResponse, dataclass_decoder
from markdown_util import extract_concepts

from os.path import exists
from loguru import logger

from ollama_util import get_response

CONCEPTS_FILE = "content_db.json"
# CONCEPTS_FILE = "content_map_9.json"

def add_additional_info(concepts):
    for concept in concepts:
        if concept.get('description') is None:
            response: OllamaResponse = get_response(concept.get('name'))
            concept['short_description'] = response.get('short_description')
            concept['description'] = response.get('description')
            concept['difficulty'] = response.get('difficulty')
            concept['common_pitfalls'] = response.get('common_pitfalls', [])
            concept['related_concepts'] = response.get('related_concepts', [])
            with open(CONCEPTS_FILE, 'w') as file:
                dumps = json.dumps(concepts)
                file.write(dumps)
                logger.info(f'saved new details for {concept.get("name")}')
        if concept.get('sub_concepts') != []:
            for sub_concept in concept.get('sub_concepts'):
                if sub_concept.get('description') == 'description not provided':
                    logger.info(f'sub concept {sub_concept.get("name")}')
                    response: OllamaResponse = get_response(f"{sub_concept.get('name')}({concept.get('name')})")
                    sub_concept['short_description'] = response.get('short_description')
                    sub_concept['description'] = response.get('description')
                    sub_concept['difficulty'] = response.get('difficulty')
                    sub_concept['common_pitfalls'] = response.get('common_pitfalls', [])
                    sub_concept['related_concepts'] = response.get('related_concepts', [])
                    logger.info(f'saved new details for {sub_concept.get("name")}')
                    with open(CONCEPTS_FILE, 'w') as file:
                        dumps = json.dumps(concepts)
                        file.write(dumps)
                        logger.info(f'saved new details for {concept.get("name")}')


example = """{
  "description": "In Python, the `__main__` module is a special built-in variable that plays a crucial role in determining how scripts are executed. When a Python script is run directly (i.e., from the command line), the interpreter sets the `__name__` attribute of the script's global scope to the string `'__main__'`. This mechanism allows developers to conditionally execute code based on whether a script is being run as the main program or if it has been imported as a module in another script. The `if __name__ == '__main__':` idiom is used to encapsulate code that should only be executed when the script is run directly, rather than when it's imported. This pattern facilitates code reuse and modularity by allowing functions and classes defined in a script to be imported without executing top-level script code.\n\nInternally, the `__main__` module is created dynamically at runtime. When Python starts up, it creates a special module named `__main__`, which serves as the environment where the top-level statements of the program are executed. If a file is specified on the command line, its contents become part of the `__main__` module. This dynamic nature allows for flexibility in script execution and testing.\n\nFrom an advanced perspective, understanding `__main__` is essential for designing modular codebases that can serve both as standalone programs and as libraries. It also plays a role in testing and debugging by allowing developers to include test suites within the same file as the module's main functionality, which are only executed when the script is run directly.\n\nThe use of `if __name__ == '__main__':` is not just limited to scripts but can be applied to modules intended for reuse. This practice ensures that any code meant for direct execution does not interfere with the module’s utility as an importable component, thus supporting clean separation of concerns and enhancing maintainability.\n\nPerformance implications are minimal, as this check incurs no significant overhead. However, it is a critical feature for structuring Python applications in a way that promotes clarity, reusability, and testability.",
  "short_description": "`__main__` determines if a script runs standalone or is imported, enabling conditional execution of code blocks.",
  "difficulty": "intermediate",
  "common_pitfalls": [
    "Forgetting to wrap executable code with `if __name__ == '__main__':`, leading to unintended behavior when scripts are imported.",
    "Misunderstanding that the `__main__` module is not a physical file but a special environment created by Python at runtime.",
    "Overlooking the utility of this pattern for structuring test suites within modules."
  ],
  "related_concepts": [
    "`if __name__ == '__main__':` idiom",
    "Modules and imports",
    "Script execution vs. module importation",
    "Testing and debugging Python code"
  ]
}"""


def start_script():
    global file
    content_exists = exists(CONCEPTS_FILE)
    if not content_exists:
        concepts: list[Concept] = extract_concepts()
    else:
        logger.info(f"retrieving concepts from {CONCEPTS_FILE}")
        with open(CONCEPTS_FILE, 'r') as file:
            json_data: list[Concept] = json.load(file)
            concepts = json_data
    add_additional_info(concepts)
    logger.info('saving updated content')
    with open("updated_content.json", 'w') as file:
        json_dumps = json.dumps(concepts, default=dataclass_encoder)
        file.write(json_dumps)


if __name__ == "__main__":
    start_script()
