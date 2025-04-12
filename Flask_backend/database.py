from pymongo import MongoClient

client = MongoClient("mongodb+srv://babarhanif:N0Q7L7yXSITw9qbU@fyp-project.moxg2.mongodb.net/fyp-project?retryWrites=true&w=majority&appName=fyp-project")
db = client["fyp-project"]
jobs_collection = db["jobposts"]
candidates_collection = db["candidates"]
