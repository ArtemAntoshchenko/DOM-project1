from fastapi import FastAPI, Depends, Body, Request
from fastapi.responses import FileResponse, JSONResponse
from sqlalchemy.orm import Session
from database import *
import json 

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

@app.get('/cars/{id}')
def get_car(id,db: Session=Depends(db_get)):
    car=db.query(Cars).filter(Cars.id==id).first()
    if car==None:
        return JSONResponse(status_code=404, content={'message':'Автомомбиль не найден'})
    return car

@app.post('/cars')
async def add_car(request:Request, db: Session=Depends(db_get)):
    # print(f"Received data: {data}")
    # print(f"Data type: {type(data)}")
    raw_data=await request.body()
    data=json.loads(raw_data)
    new_car=Cars(name=data["name"], mark=data['mark'], color=data['color'])
    db.add(new_car)
    db.commit()
    db.refresh(new_car)
    return new_car

@app.put('/cars')
async def edit_car(request:Request, db:Session=Depends(db_get)):
    raw_data=await request.body()
    data=json.loads(raw_data)
    edit_car=db.query(Cars).filter(Cars.id==data['id']).first()
    if edit_car==None:
        return JSONResponse(status_code=404, content={ "message": "Пользователь не найден"})
    edit_car.name=data['name']
    edit_car.mark=data['mark']
    edit_car.color=data['color']
    db.commit()
    db.refresh(edit_car)
    return edit_car

@app.delete('/cars/{id}')
def delet_car(id,db: Session=Depends(db_get)):
    del_car=db.query(Cars).filter(Cars.id==id).first()
    if del_car==None:
        return JSONResponse(status_code=404, content={'message':'Автомомбиль не найден'})
    db.delete(del_car)
    db.commit()
    return del_car



@app.get('/soldcars')
def get_cars(db: Session=Depends(db_get)):
    return db.query(soldCars).all()

@app.get('/soldcars/{id}')
def get_car(id,db: Session=Depends(db_get)):
    car=db.query(soldCars).filter(soldCars.id==id).first()
    if car==None:
        return JSONResponse(status_code=404, content={'message':'Автомомбиль не найден'})
    return car

@app.put('/soldcars')
async def edit_car(request:Request, db:Session=Depends(db_get)):
    raw_data=await request.body()
    data=json.loads(raw_data)
    edit_car=db.query(soldCars).filter(soldCars.id==data['id']).first()
    if edit_car==None:
        return JSONResponse(status_code=404, content={ "message": "Пользователь не найден"})
    edit_car.name=data['name']
    edit_car.mark=data['mark']
    edit_car.color=data['color']
    db.commit()
    db.refresh(edit_car)
    return edit_car

@app.delete('/soldcars/{id}')
def delet_car(id,db: Session=Depends(db_get)):
    del_car=db.query(soldCars).filter(soldCars.id==id).first()
    if del_car==None:
        return JSONResponse(status_code=404, content={'message':'Автомомбиль не найден'})
    db.delete(del_car)
    db.commit()
    return del_car