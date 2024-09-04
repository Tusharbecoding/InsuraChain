from flask import Flask, request, jsonify
from model import assess_damage

app = Flask(__name__)

@app.route('/assess', methods=['POST'])
def assess():
    file = request.files['file']
    prediction = assess_damage(file)
    return jsonify({'damage_assessment': prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
