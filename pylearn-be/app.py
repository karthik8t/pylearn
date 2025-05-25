from flask import Flask
from loguru import logger

app = Flask(__name__)

@app.before_request
def log_request_info():
    logger.info("Request received")

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/login")
def login_request():
    return "<p>Login request received</p>"

if __name__ == '__main__':
    app.run(debug=True)