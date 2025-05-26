from flask import Flask
from flask_cors import CORS
from routes.job_seeker import job_seeker_blueprint
from routes.recruiter import recruiter_blueprint
from routes.resume_analyser import resume_bp
from utils.vector_db import title_idx, skill_idx, title_ids, skill_ids
from listener import listen_to_changes
from dotenv import load_dotenv
load_dotenv()   # this reads the .env file and sets environment variables

import threading

# from utils.vector_db import vector_db_blueprint   

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Expose indexes via app.config
app.config['TITLE_INDEX'] = title_idx
app.config['SKILL_INDEX'] = skill_idx
app.config['TITLE_IDS'] = title_ids
app.config['SKILL_IDS'] = skill_ids

# Register blueprints
app.register_blueprint(job_seeker_blueprint)
app.register_blueprint(recruiter_blueprint)
app.register_blueprint(resume_bp,            url_prefix='/api') 
# app.register_blueprint(vector_db_blueprint)

# if __name__ == '__main__':
#     listener_thread = threading.Thread(target=listen_to_changes, daemon=True)
#     listener_thread.start()
#     app.run(debug=True, use_reloader=False)        

if __name__ == '__main__':
    # start watching both collections in background threads
    listen_to_changes()

    # now launch Flask (no reloader so only one copy of the listener runs)
    app.run(debug=True, use_reloader=False)
