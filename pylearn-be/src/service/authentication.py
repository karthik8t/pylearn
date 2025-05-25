import json

from loguru import logger

from src.db import get_user_collection
from src.dto import SignUpDto, UserDto, LoginDto
from dataclasses import asdict
from src.model import UserModel

user_collection = get_user_collection()

def create_new_user(signup_form: SignUpDto) -> UserDto:
    user_model = UserModel(**asdict(signup_form))
    insert_one = user_collection.insert_one(asdict(user_model))
    inserted_user = user_collection.find_one({"_id": insert_one.inserted_id})
    return UserDto(inserted_user.get('username'), inserted_user.get('email'))

def validate_user_credentials(login_dto: LoginDto) -> UserDto:
    _user = user_collection.find_one({'email': login_dto.email, 'password': login_dto.password})
    if _user:
        return UserDto(_user.get('username'), _user.get('password'))
    else:
        # TODO raise exception and handle it
        return UserDto('', '')
