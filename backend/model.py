from dataclasses import dataclass, asdict

@dataclass()
class ConceptValue:
    id: str
    type: str
    value: str

@dataclass()
class SubConcept:
    id: str
    name: str
    value: list[ConceptValue]
    short_description: str = 'short description not provided'
    description: str = 'description not provided'

@dataclass()
class Concept:
    id: str
    name: str
    value: list[ConceptValue]
    sub_concepts: list[SubConcept]
    short_description: str = 'short description not provided'
    description: str = 'description not provided'
    tag: str = 'tag not provided'

def dataclass_encoder(obj):
    if isinstance(obj, ConceptValue):
        return asdict(obj)
    if isinstance(obj, SubConcept):
        return asdict(obj)
    if isinstance(obj, Concept):
        return asdict(obj)
    raise TypeError(f"Object of type {obj.__class__.__name__} is not JSON serializable")
