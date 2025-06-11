from dataclasses import dataclass, asdict, field


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
    short_description: str = None
    description: str = None
    difficulty: str = None
    common_pitfalls: list[str] = field(default_factory=list)
    related_concepts: list[str] = field(default_factory=list)
    tags: list[str] = field(default_factory=list)

@dataclass()
class OllamaResponse:
    short_description: str = None
    description: str = None
    difficulty: str = None
    related_concepts: list[str] = field(default_factory=list)
    common_pitfalls: list[str] = field(default_factory=list)

def dataclass_decoder(obj):
    if '__class__' in obj and obj['__class__'] == 'OllamaResponse':
        print(obj)
        return OllamaResponse(**obj)

def dataclass_encoder(obj):
    if isinstance(obj, ConceptValue):
        return asdict(obj)
    if isinstance(obj, SubConcept):
        return asdict(obj)
    if isinstance(obj, Concept):
        return asdict(obj)
    raise TypeError(f"Object of type {obj.__class__.__name__} is not JSON serializable")
