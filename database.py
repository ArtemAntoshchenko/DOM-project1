from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import DeclarativeBase, sessionmaker

SALALCHEMY_DATABASE_URL='sqlite:///./sql_app.db'

engine=create_engine(SALALCHEMY_DATABASE_URL, connect_args={'check_same_thread':False})

class Base(DeclarativeBase):pass
class Cars(Base):
    __tablename__='cars'
    id=Column(Integer, primary_key=True, index=True)
    name=Column(String)
    mark=Column(String)
    color=Column(String)


class soldCars(Base):
    __tablename__='soldCars'
    id=Column(Integer, primary_key=True, index=True)
    name=Column(String)
    mark=Column(String)
    color=Column(String)

session=sessionmaker(autoflush=False, bind=engine)