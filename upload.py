from pydantic import BaseModel

class UploadedFile(BaseModel):
    file_id: str
    filename: str
    file_path: str
    status: str = "uploaded"