from fastapi import FastAPI

app = FastAPI()


@app.get("/fast")
async def root():
    return {"message": "Hello World"}
