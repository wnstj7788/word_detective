from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()


def setup_cors(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
