import os
from main import main
from flask import Flask, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    main()
    return "Done!"

if __name__ == '__main__':
    app.run()
