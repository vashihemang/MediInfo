# 💊 MediInfo

MediInfo is a medicine information platform that provides detailed information about medicines, including their uses, composition, dosage, side effects, precautions, indications, manufacturers, and other important details. The project is designed to make medicine-related information easy to search, understand, and access in one place.


**MediInfo** is a medicine information and prediction platform that provides useful information about medicines using **Machine Learning (ML)** and **Python-based APIs**.

The project uses **Flask**, **FastAPI**, and a **Machine Learning model** to process user input and provide relevant medicine-related information.

<img width="1024" height="559" alt="image" src="https://github.com/user-attachments/assets/3b2d6a1e-11bb-47e3-8140-20de3243f9d2" />

## 🚀 Features

* 💊 Provides information about medicines
* 🔍 Medicine-related information search
* 🤖 Machine Learning model integration
* ⚡ FastAPI backend for API services
* 🌐 Flask-based application/backend
* 📡 REST API support
* 🐍 Built using Python
* 📊 ML-based prediction/recommendation functionality
* 🔧 Modular project structure
* 🛠️ Easy to run locally


## 🧰 Technologies Used

| Technology          | Purpose                                  |
| ------------------- | ---------------------------------------- |
| 🐍 Python           | Core programming language                |
| 🌐 Flask            | Web application/backend                  |
| ⚡ FastAPI           | REST API development                     |
| 🤖 Machine Learning | Prediction / medicine-related processing |
| 📦 Scikit-learn     | ML model development                     |
| 🔢 Pandas           | Data processing                          |
| 🔢 NumPy            | Numerical operations                     |
| 🗄️ Database        | Medicine data storage                    |
| 🔀 Git & GitHub     | Version control                          |


## 📁 Project Structure

```text
MediInfo/
│
├── Backend/
│      ├──llm/
│      │   ├── __init__.py
│      │   ├── Medi_api.py
│      │   └── medical_llm.py
│      │
│      ├── model/
│      │     ├── mediscan_model.pkl
│      │     └── tdf_vectorzer.pkl
│      │   
│      │
│      ├── data/
│          ├── Extensive_A_Z_medicines_dataset_of_India.csv
│          └── medicine_name.csv
│      
│      
├── Frontend 
│       ├──  templates/
│       │      └── index.html
│       │
│       │
│       └── static/
│              ├── script.js    
│              └── style.css
│        
│
├── requirements.txt
├── README.md
└── app.py
```


## 🔄 How MediInfo Works

```text
              ┌──────────────────┐
              │      User        │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │   Flask Web App  │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │     FastAPI      │
              │      APIs        │
              └────────┬─────────┘
                       │
              ┌────────▼─────────┐
              │  Medicine Data   │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │   ML Prediction  │
              │      Model       │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ Medicine Info /  │
              │     Result       │
              └──────────────────┘
```



## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/vashihemang/MediInfo.git
```

### 2. Move into the project directory

```bash
cd MediInfo
```

### 3. Create a virtual environment

### Windows

```bash
python -m venv venv
```

Activate:

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
python3 -m venv venv
```

Activate:

```bash
source venv/bin/activate
```


## ▶️ Run Flask Application

If your Flask application uses `app.py`:

```bash
python app.py
```


The application will normally be available at:

```text
http://127.0.0.1:5000
```

---

## ⚡ Run FastAPI

If your FastAPI entry point is `medi_api.py`:

```bash
uvicorn Medi_api:app --reload
```

The API will normally be available at:

```text
http://127.0.0.1:8000
```

### FastAPI Documentation

After starting the API, open:

```text
http://127.0.0.1:8000/docs
```

FastAPI automatically provides interactive API documentation through Swagger UI.

## 🤖 Machine Learning Model

The Machine Learning component is used to process medicine-related data and generate predictions/recommendations.

Typical ML workflow:

```text
Medicine Dataset
      │
      ▼
Data Preprocessing
      │
      ▼
Feature Engineering
      │
      ▼
Model Training
      │
      ▼
Model Evaluation
      │
      ▼
Trained ML Model
      │
      ▼
Prediction
```

The trained model can be saved using formats such as:

```text
.pkl
.joblib
```

Example:

```python
import joblib

model = joblib.load("model/model.pkl")

prediction = model.predict(input_data)
```

---

## 🔌 API Example

A typical medicine API request can look like:

Example:

```text
GET /predict
```

Example:

```bash
curl http://127.0.0.1:8000/docs
```

### Update pip

```bash
python -m pip install --upgrade pip
```

### Reinstall dependencies

```bash
pip install -r requirements.txt --upgrade
```

## ⚠️ Medical Disclaimer

MediInfo provides medicine-related information for educational and informational purposes. The information provided by this application should **not** be considered professional medical advice.

Always consult a qualified doctor, pharmacist, or other healthcare professional before starting, stopping, or changing any medication.
