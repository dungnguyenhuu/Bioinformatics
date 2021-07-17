from flask import Flask, request, jsonify, make_response
import json
from flask_cors import CORS, cross_origin
from preprocessing import *
from werkzeug.utils import secure_filename

# Constants
THIS_WEEK = 1
THIS_MONTH = 2
THIS_QUARTER = 3
THIS_YEAR = 4

# Configurations
app = Flask(__name__)
cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['UPLOAD_FOLDER'] = 'upload'
ALLOWED_EXTENSIONS = {'fasta'}


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/api/predict-acr', methods=['POST'])
def predictAcr():
    f = request.files['file']
    if f.filename == "":
        return jsonify({
            'status': 'ERROR',
        })
    if not allowed_file(f.filename):
        return jsonify({
            'status': 'ERROR',
        })
    else:
        full_filename = secure_filename(f.filename)
        f.save(os.path.join(app.config['UPLOAD_FOLDER'], full_filename))
        f.seek(0)
        #print("File saved")
        content = f.read()
        content = str(content, 'utf-8')
        results = analyzePhage_1(os.path.join(
            app.config['UPLOAD_FOLDER'], full_filename))
        jsonText = json.dumps(results)
        return jsonify({'data': results, 'status': 'SUCCESS', 'content': content})

@app.route('/api/predict-acr-content', methods=['POST'])
def predictAcrContent():
    data = request.get_json()
    content = data['content']
    results = analyzePhageContent(content)
    jsonText = json.dumps(results)
    return jsonify({'data': results, 'status': 'SUCCESS'})

if __name__ == '__main__':
    app.run(debug=True)
