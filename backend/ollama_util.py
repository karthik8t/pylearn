from ollama import chat
from loguru import logger
import json

from model import OllamaResponse

MODEL_NAME = 'phi4:14b'
SYSTEM_PROMPT = """Generate a JSON object containing advanced information about a given Python concept, tailored for users with a solid understanding of Python's intermediate to advanced features. The JSON object should have the following fields:

- `description`: An in-depth, technical explanation of the Python concept. This description should be between 100 and 500 words and cover its underlying mechanisms, implications for performance, common advanced use cases, and relevant PEPs if applicable. It should delve into specifics like the iterator protocol, coroutines (`yield from`), and the internal workings of concepts like `type` or the `__main__` module, while remaining concise and not overly verbose. The information should be relevant to newer Python versions (3.9+ preferred).
- `short_description`: A concise, one-sentence summary of the Python concept, highlighting its core utility from an advanced perspective.
- `difficulty`: An assessment of the concept's difficulty, categorized as "beginner," "intermediate," or "advanced."
    - **Beginner**: Concepts that are fundamental to understanding Python syntax and basic program flow (e.g., variables, basic data types, if/else, for loops).
    - **Intermediate**: Concepts that build upon beginner knowledge, introduce more complex data structures, functions, and control flow, and are commonly used in general-purpose Python development (e.g., classes, modules, error handling, basic comprehensions).
    - **Advanced**: Concepts that involve deeper understanding of Python's execution model, metaprogramming, performance optimization, concurrency, or less commonly used but powerful features. These often require a solid grasp of intermediate concepts.
- `common_pitfalls`: An array of strings, listing common mistakes or misunderstandings associated with the concept, particularly from an advanced perspective.
- `related_concepts`: An array of strings, listing other Python concepts that are closely related or frequently used in conjunction with the primary concept.

For any given concept (e.g., "Generator," "Enumerate," "Iterator," "`type`," "`__main__`"), the descriptions should be geared towards an advanced user, assuming familiarity with Python's core syntax and data structures.
"""

def get_response(concept_name:str = 'List') -> OllamaResponse:
    response = chat(MODEL_NAME,
                    messages=[
                        {'role':'system', 'content':SYSTEM_PROMPT},
                        {'role':'user', 'content':f'provide information about {concept_name} python concept'}
                    ],
                    stream=False,
                    format={
                        'type':'object',
                        'property':{
                            'description' : {
                                'type' : 'string'
                            },
                            'short_description': {
                                'type' : 'string'
                            },
                            'difficulty': {
                                'type' : 'string'
                            },
                            'common_pitfalls': {
                                'type' : 'array',
                                'items': {
                                    'type': 'string'
                                }
                            },
                            'related_concepts': {
                                'type' : 'array',
                                'items': {
                                    'type': 'string'
                                }
                            }
                        },
                        'required':['description', 'short_description', 'difficulty', 'common_pitfalls', 'related_concepts']
                    }
                )
    content = response.message.content
    logger.info(f'received response from ollama : {content}\n')
    concept_data: OllamaResponse = json.loads(content, strict=False)
    return concept_data

