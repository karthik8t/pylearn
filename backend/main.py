
def _read_file(file_path):
    with open(file_path, "r", encoding='utf8') as file:
        read = file.read()
        return read



if __name__ == "__main__":
    print("Hello World")
    file_content = _read_file("python-cheatsheet.txt")
    print(file_content[0:1000])