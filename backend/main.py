import json
from loguru import logger

import mistune
from mistune import HTMLRenderer
from mistune.renderers.markdown import BlockState


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
    content_map = {}
    current_heading = None
    sub_content = {}
    sub_heading = None
    for item in ast:
        logger.info(f'processing item index: {item["type"]}')
        if item.get('attrs', {}).get('level') == 2:
            if sub_heading is not None:
                content_map[current_heading].append(sub_content)
                sub_heading = None
                sub_content = {}
            current_heading = item['children'][0].get('raw')
            content_map[current_heading] = {}
        elif item.get('attrs', {}).get('level') == 3:
            sub_heading = item['children'][0].get('raw')
            sub_content[sub_heading] = {}
        elif sub_heading is not None:
            if 'raw' in item:
                sub_content[sub_heading].append(item['raw'])
            elif 'children' in item:
                html = convert_to_html(item['children'])
                sub_content[sub_heading].append(html)
        elif current_heading is not None:
            if 'raw' in item:
                content_map[current_heading].append(item['raw'])
            elif 'children' in item:
                html = convert_to_html(item['children'])
                content_map[current_heading].append(html)

    content_map_part = {}
    count = 0
    for key, value in content_map.items():
        content_map_part[key] = value
        count += 1
        if count % 10 == 0:
            with open(f"content_map_{count}.json", "w") as outfile:
                json_string = json.dumps(content_map_part)
                outfile.write(json_string)
                logger.info(f'wrote content map to file')
            content_map_part = {}

    return content_map



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