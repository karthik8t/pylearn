from dataclasses import dataclass

@dataclass()
class UserDto:
    username: str
    email: str