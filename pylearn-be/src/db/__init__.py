from pymongo import MongoClient


def get_database():
    CONNECTION_STRING = "mongodb+srv://thatikondakarthik13:sage@gt-cluster.bp3br.mongodb.net/"
    client = MongoClient(CONNECTION_STRING)
    return client['pyLearn']

def get_user_collection():
    dbname = get_database()
    user_collection = dbname['users']
    user_collection.create_index("email", unique=True)
    return user_collection
