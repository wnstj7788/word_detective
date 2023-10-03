FROM python:3.9

# 작업 디렉토리 지정
WORKDIR /app

# 필요한 라이브러리 설치
RUN apt-get update -y && apt-get install -y libgl1-mesa-glx

# requirements.txt 복사 후 패키지 설치
COPY requirements.txt requirements.txt
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# 앱 복사
COPY . .

# 컨테이너 실행 시 실행할 명령어 지정, 8000번 포트로 서버 실행
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
