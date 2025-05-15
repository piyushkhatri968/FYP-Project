import threading
from pymongo import MongoClient
from bson import ObjectId
from database import db           # your existing MongoClient/db
from utils.vector_db import (
    insert_into_vector_db,
    update_vector_db,
    delete_from_vector_db
)

# the operations we care about
OPS = ["insert", "update", "replace", "delete"]

def _watch_collection(collection_name):
    coll = getattr(db, collection_name)
    pipeline = [
        { "$match": { "operationType": { "$in": OPS } } }
    ]

    print(f"[Listener:{collection_name}] starting (watching ops={OPS})")
    stream = coll.watch(pipeline, full_document='updateLookup')
    for change in stream:
        op = change["operationType"]
        doc_id = change["documentKey"]["_id"]
        print(f"[Listener:{collection_name}] event={op} _id={doc_id}")

        if op == "insert":
            insert_into_vector_db(change["fullDocument"], collection_name)

        elif op in ("update", "replace"):
            # updateDescription only exists on update, but full_document is always fresh
            updated_fields = list(change.get("updateDescription", {}).get("updatedFields", {}).keys())
            # pass string id so it matches your title_ids/skill_ids lists
            update_vector_db(str(doc_id), updated_fields, collection_name)

        elif op == "delete":
            delete_from_vector_db(str(doc_id), collection_name)

def listen_to_changes():
    # spawn one thread per collection
    for coll_name in ("jobposts", "candidates"):
        t = threading.Thread(
            target=_watch_collection,
            args=(coll_name,),
            daemon=True
        )
        t.start()
