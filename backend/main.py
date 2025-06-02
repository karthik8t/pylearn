import json
import uuid

from loguru import logger

import mistune
from mistune import HTMLRenderer
from mistune.renderers.markdown import BlockState

from model import ConceptValue, SubConcept, Concept, dataclass_encoder


def _read_file(file_path):
    with open(file_path, "r", encoding='utf8') as file:
        read = file.read()
        return read


def file_to_ast(file_path="python-cheatsheet.txt"):
    logger.info(f'converting file to AST')
    file_content = _read_file(file_path)
    markdown = mistune.create_markdown(renderer=None)
    ast = markdown(file_content)
    with open("ast.json", "w") as outfile:
        json_string = json.dumps(ast)
        outfile.write(json_string)
        logger.info(f'wrote AST to file')
    return ast


def convert_to_html(ast):
    logger.info(f'converting AST to HTML')
    renderer = HTMLRenderer()
    html = renderer(ast, state=BlockState())
    return html


def extract_titles(ast):
    logger.info(f'extracting titles from AST')
    titles = []
    for item in ast:
        if item.get('attrs', {}).get('level') == 2:
            children_ = item['children']
            titles.append(children_[0].get('raw'))
    return titles

def extract_content_map(ast):
    logger.info(f'extracting content map from AST')
    all_content = []
    concept = None
    sub_concept = None
    current_heading = None
    sub_heading = None
    for item in ast:
        logger.info(f'processing item index: {item["type"]}')
        if item.get('attrs', {}).get('level') == 2:
            if sub_heading is not None:
                concept.sub_concepts.append(sub_concept)
                sub_heading = None
            if current_heading is not None:
                all_content.append(concept)

            current_heading = item['children'][0].get('raw')
            concept = Concept(str(uuid.uuid4()), current_heading, [], [])
        elif item.get('attrs', {}).get('level') == 3:
            sub_heading = item['children'][0].get('raw')
            sub_concept = SubConcept(str(uuid.uuid4()), sub_heading, [])
        elif sub_heading is not None:
            type = item['type']
            if type == 'blank_line':
                continue
            value = item['raw'] if 'raw' in item else convert_to_html(item['children']) if 'children' in item else None
            concept_value = ConceptValue(str(uuid.uuid4()), type, value)
            sub_concept.value.append(concept_value)
        elif current_heading is not None:
            type = item['type']
            if type == 'blank_line':
                continue
            value = item['raw'] if 'raw' in item else convert_to_html(item['children']) if 'children' in item else None
            concept_value = ConceptValue(str(uuid.uuid4()), type, value)
            concept.value.append(concept_value)

    content_part = []
    for index, item in enumerate(all_content):
        content_part.append(item)
        if (index+1)%10 == 0:
            with open(f"content_map_{index}.json", "w") as outfile:
                json_string = json.dumps(content_part, default=dataclass_encoder)
                outfile.write(json_string)
                logger.info(f'wrote content map to file')
            content_part = []

    return all_content



if __name__ == "__main__":
    print("Hello World")
    # _extract_ast_save()
    ast = file_to_ast()
    # list_of_titles = extract_titles(ast)
    # print(list_of_titles)
    # html = ast_to_html(ast)
    # print(html)
    content_map = extract_content_map(ast)
    print(content_map)