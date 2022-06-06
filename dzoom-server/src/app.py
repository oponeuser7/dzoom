import os
import cv2
from main import main
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def hello():
    img = cv2.imread('../experiment/test/results-Demo/image_x2_SR.png')
    if img is None: main()
    params = request.args
    x1 = int(params.get('x'))
    x2 = x1+int(params.get('width'))
    y1 = int(params.get('y'))
    y2 = y1+int(params.get('height'))
    img = img[y1:y2, x1:x2]
    cv2.imwrite('static/images/image_x2.png', img)
    return "Done!"

if __name__ == '__main__':
    app.run()
