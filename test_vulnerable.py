import os
import sqlite3
from flask import Flask, request, render_template_string

app = Flask(__name__)

# Vulnerable database configuration
DB_NAME = "user_data.db"
ADMIN_PASSWORD = "admin123"  # Hardcoded credentials

@app.route('/search')
def search():
    # SQL Injection vulnerability
    query = request.args.get('q', '')
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM users WHERE name LIKE '%{query}%'")  # Unsafe SQL query
    results = cursor.fetchall()
    return str(results)

@app.route('/profile')
def profile():
    # Path traversal vulnerability
    filename = request.args.get('file', '')
    with open(os.path.join('/user/profiles/', filename), 'r') as f:  # Unsafe path handling
        content = f.read()
    return content

@app.route('/template')
def template():
    # Server-Side Template Injection vulnerability
    user_template = request.args.get('template', '')
    return render_template_string(user_template)  # Unsafe template rendering

@app.route('/execute')
def execute_command():
    # Command Injection vulnerability
    cmd = request.args.get('cmd', 'ls')
    output = os.popen(cmd).read()  # Unsafe command execution
    return output

def process_data(data):
    # Insecure deserialization
    import pickle
    return pickle.loads(data)  # Unsafe deserialization

def save_log(message):
    # Unsafe logging practice
    with open('app.log', 'a') as f:
        f.write(message)  # No input validation or sanitization

if __name__ == '__main__':
    # Insecure configuration
    app.run(debug=True, host='0.0.0.0', port=5000)  # Debug mode enabled in production 