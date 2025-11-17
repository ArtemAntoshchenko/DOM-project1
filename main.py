from fastapi import FastAPI, Depends, Body
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from database import *

Base.metadata.create_all(bind=engine)

def db_get():
    db=session()
    try:
        yield db
    finally:
        db.close()

app=FastAPI()

@app.get('/')
def index():
    return FileResponse('catalog/index.html')

@app.get('/cars')
def get_cars(db: Session=Depends(db_get)):
    return db.query(Cars).all()

@app.post('/add')
def add_car(data=Body(), db: Session=Depends(db_get)):
    new_car=Cars(name=data['name'], mark=data['mark'], color=data['color'])
    db.add(new_car)
    db.commit()
    db.refresh(new_car)
    return new_car