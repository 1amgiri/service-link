import os
import sys

# Add the project root to the system path to allow importing 'backend'
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.app import create_app

app = create_app()

@app.route('/api/test')
def debug_test():
    return {"status": "ok", "message": "Backend processes are running on Vercel"}

# Vercel expects 'app' to be exposed

