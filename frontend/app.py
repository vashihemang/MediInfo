from flask import Flask, render_template, request, jsonify
import requests

API_URL = "http://127.0.0.1:8000/predict"

app = Flask(__name__, template_folder='templates',static_folder='static')

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():

    user_message = request.json.get("message")

    response = requests.post( API_URL,json={"name": user_message})

    data = response.json()
    return jsonify({"reply": data.get("explanation", str(data))})


if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0')







