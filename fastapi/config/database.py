from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# MYSQL_HOST = "j9b105.p.ssafy.io"
# MYSQL_USER = "root"
# MYSQL_PASSWORD = "detection-password"
# MYSQL_DATABASE = "detection"

MYSQL_HOST = "localhost"
MYSQL_USER = "root"
MYSQL_PASSWORD = "root"
MYSQL_DATABASE = "detection"
DATABASE_URL = (
    f"mysql+mysqlconnector://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}/{MYSQL_DATABASE}"
)


class engineconn:
    def __init__(self):
        self.engine = create_engine(DATABASE_URL, pool_recycle=500)

    def sessionmaker(self):
        Session = sessionmaker(bind=self.engine)
        session = Session()
        return session

    def connection(self):
        conn = self.engine.connect()
        return conn
