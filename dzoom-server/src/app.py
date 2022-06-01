import os
from main import main
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    main()
    return "Done!"

if __name__ == '__main__':
    app.run()
