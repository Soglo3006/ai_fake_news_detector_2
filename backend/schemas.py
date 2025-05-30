from pydantic import BaseModel,EmailStr

class InputText(BaseModel):
    content: str   
    
class Feedback(BaseModel):
    content: str
    expected_label: str
    comment : str | None = None
    
class RegisterRequest(BaseModel):
    firstname: str
    lastname: str
    email: EmailStr
    password: str
    
class LoginRequest(BaseModel):
    email:EmailStr
    password:str