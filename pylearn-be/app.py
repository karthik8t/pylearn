import json

from flask import Flask, request, jsonify, Response

from loguru import logger

from src.dto import LoginDto, SignUpDto
from src.service import validate_user_credentials, create_new_user

app = Flask(__name__)

@app.before_request
def log_request_info():
    logger.info(f"Request received : {request.get_json()}, Path: {request.path}, Method: {request.method}, Remote Addr: {request.remote_addr}")

@app.after_request
def log_response_info(response):
    logger.info(f"Response sent : status={response.status}, \ndata={response.get_json()}")
    return response

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.post("/login")
def login_request():
    request_payload = _get_request_payload()
    data = LoginDto(**request_payload)
    user_dto = validate_user_credentials(data)
    return jsonify(user_dto)

@app.post("/signup")
def signup_request():
    request_payload = _get_request_payload()
    data = SignUpDto(**request_payload)
    user_dto = create_new_user(data)
    return jsonify(user_dto)

def _get_request_payload():
    request_payload = request.get_json()
    if request_payload is None:
        return Response(status=400)
    return request_payload

if __name__ == '__main__':
    app.run(debug=True)