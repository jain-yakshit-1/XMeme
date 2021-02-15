from pydantic import BaseModel, AnyHttpUrl

# Shared properties
class MemeBase(BaseModel):
    url: AnyHttpUrl
    caption: str

# Properties to receive via API on creation
class MemeCreate(MemeBase):
    name: str

# Properties to receive via API on update
class MemeUpdate(MemeBase):
    pass


class MemeInDBBase(MemeBase):
    id: int
    name: str
    
    class Config:
        orm_mode = True

# Additional properties to return via API
class Meme(MemeInDBBase):
    pass

# Additional properties stored in DB
class MemeInDB(MemeInDBBase):
    pass
