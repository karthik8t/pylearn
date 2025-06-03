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


def _file_to_ast(file_path="python-cheatsheet.txt"):
    logger.info(f'converting file to AST')
    file_content = _read_file(file_path)
    markdown = mistune.create_markdown(renderer=None)
    ast = markdown(file_content)
    with open("ast.json", "w") as outfile:
        json_string = json.dumps(ast)
        outfile.write(json_string)
        logger.info(f'wrote AST to file')
    return ast


def _convert_to_html(ast):
    logger.info(f'converting AST to HTML')
    renderer = HTMLRenderer()
    html = renderer(ast, state=BlockState())
    return html


def _extract_content_map(ast):
    logger.info(f'extracting content map from AST')
    all_content = []
    concept = None
    sub_concept = None
    current_heading = None
    sub_heading = None
    for item in ast:
        logger.info(f'processing item index: {item["type"]}')
        if item.get('attrs', {}).get('level') == 2:
            if item['children'][0].get('raw') in ['Contents']:
                continue
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
            value = item['raw'] if 'raw' in item else _convert_to_html(item['children']) if 'children' in item else None
            concept_value = ConceptValue(str(uuid.uuid4()), type, value.removesuffix("\n"))
            sub_concept.value.append(concept_value)
        elif current_heading is not None:
            type = item['type']
            if type == 'blank_line':
                continue
            value = item['raw'] if 'raw' in item else _convert_to_html(item['children']) if 'children' in item else None
            concept_value = ConceptValue(str(uuid.uuid4()), type, value.removesuffix("\n"))
            concept.value.append(concept_value)

    with open('content_db.json', "w") as file:
        json_string = json.dumps(all_content, default=dataclass_encoder)
        file.write(json_string)
    _save_to_multiple_files(all_content)

    return all_content


def _save_to_multiple_files(all_content):
    content_part = []
    for index, item in enumerate(all_content):
        content_part.append(item)
        if (index + 1) % 10 == 0:
            with open(f"content_map_{index}.json", "w") as outfile:
                json_string = json.dumps(content_part, default=dataclass_encoder)
                outfile.write(json_string)
                logger.info(f'wrote content map to file')
            content_part = []


def extract_concepts():
    logger.info("starting extracting content from markdown")
    ast = _file_to_ast()
    content_map = _extract_content_map(ast)
    return content_map