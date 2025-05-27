from dataclasses import dataclass

@dataclass()
class UserModel:
    username: str
    email: str
    password: str


