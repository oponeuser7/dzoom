import os
import cv2
from main import main
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def hello():
    file = request.files['file']
    file_name = request.form['fileName']
    file_name = file_name[:len(file_name)-4]
    file.save('./static/images/'+file_name+'.png')
    img = cv2.imread('../experiment/test/results-Demo/'+file_name+'_x2_SR.png')
    if img is None: 
        main()
        img = cv2.imread('../experiment/test/results-Demo/'+file_name+'_x2_SR.png')
    params = request.form
    x1 = int(params['x'])
    x2 = x1+int(params['width'])
    y1 = int(params['y'])
    y2 = y1+int(params['height'])
    img = img[y1:y2, x1:x2]
    cv2.imwrite('static/results/'+file_name+'_x2_SR.png', img)
    for file in os.scandir('./static/images'):
        os.remove(file.path)
    return "Done!"

if __name__ == '__main__':
    app.run()
