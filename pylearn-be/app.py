import json

from flask import Flask, request, jsonify, Response
from flask_cors import CORS

from loguru import logger

from src.dto import LoginDto, SignUpDto
from src.service import validate_user_credentials, create_new_user

app = Flask(__name__)
CORS(app)

@app.before_request
def log_request_info():
    raw_data = request.get_data(cache=True).decode("utf-8")
    logger.info(f"Request received : {raw_data}, Path: {request.path}, Method: {request.method}, Remote Addr: {request.remote_addr}")

@app.after_request
def log_response_info(response):
    logger.info(f"Response sent : status={response.status}, \ndata={response.get_json()}")
    return response

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.post("/login")
def login_request():
    data = request.get_json()
    data = LoginDto(**data)
    user_dto = validate_user_credentials(data)
    return jsonify(user_dto)

@app.post("/signup")
def signup_request():
    data = request.get_json()
    data = SignUpDto(**data)
    user_dto = create_new_user(data)
    return jsonify(user_dto)

if __name__ == '__main__':
    app.run(debug=True)