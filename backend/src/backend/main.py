from fastapi import FastAPI, APIRouter
from datetime import datetime
from contextlib import asynccontextmanager
from .api.config import init_db
from .api.routes import user_routes


# runs before api starts handling requests
@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


# tell fastapi to use lifespan defined above
app = FastAPI(lifespan=lifespan)

# prefix all endpoints with api/v1
api_router = APIRouter(prefix="/api/v1")

# include api logic routes
api_router.include_router(user_routes.router)

# include main api route
app.include_router(api_router)


# testing route
@app.get("/test")
def test_endpoint():
    time_now = datetime.now()
    return {"message": "API is up and running", "time": time_now}
