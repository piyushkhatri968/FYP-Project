from pymongo import MongoClient

client = MongoClient("mongodb+srv://piyushkhatri968:wh2Z0AIFwFUJZm8x@fyp-project.moxg2.mongodb.net/fyp-project?retryWrites=true&w=majority&appName=fyp-project")
db = client["fyp-project"]
jobs_collection = db["jobposts"]
candidates_collection = db["candidates"]
