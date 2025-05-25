from dataclasses import dataclass

@dataclass()
class SignUpDto:
    username: str
    email: str
    password: str