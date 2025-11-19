from fastapi import FastAPI, Depends, Body
from fastapi.responses import FileResponse, JSONResponse
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

@app.get('cars/{id}')
def get_car(id,db: Session=Depends(db_get)):
    car=db.query(Cars).filter(Cars.id==id).first()
    if car==None:
        return JSONResponse(status_code=404, content={'message':'Автомомбиль не найден'})
    return car

@app.post('/add')
def add_car(data=Body(), db: Session=Depends(db_get)):
    new_car=Cars(name=data['name'], mark=data['mark'], color=data['color'])
    db.add(new_car)
    db.commit()
    db.refresh(new_car)
    return new_car

@app.delete('/cars/{id}')
def delet_car(id,db: Session=Depends(db_get)):
    del_car=db.query(Cars).filter(Cars.id==id).first()
    if del_car==None:
        return JSONResponse(status_code=404, content={'message':'Автомомбиль не найден'})
    db.delete(del_car)
    db.commit()
    return del_car
