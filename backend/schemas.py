from pydantic import BaseModel

class InputText(BaseModel):
    content: str   
    
class Feedback(BaseModel):
    content: str
    expected_label: str
    comment : str | None = None