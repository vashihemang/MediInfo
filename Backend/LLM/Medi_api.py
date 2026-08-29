from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import Annotated
from backend.medi_llm import LLM_explanation,Normalize_text
import joblib


medicine_data = joblib.load(r'backend\model\mediscan_model.pkl')
tdf_vector = joblib.load(r'backend\model\tdf_vectorzer.pkl')
tdf_vector_matrix = tdf_vector.transform(medicine_data["combined_features"])

class MedicineInput(BaseModel):
    name: Annotated[str,Field(...,description="Name of the medicine",examples=["Paracetamol"])]

    def get_scanned_medicine_details(self,medicine_df):
        match = medicine_df[medicine_df['name'].str.contains(self.name,case=False,na=False)]
        if not match.empty:        
            # First matched medicine
            med_info = match.iloc[0]

            API = LLM_explanation({"Name":med_info['name'],
                "Side_Effects":med_info['Consolidated_Side_Effects'],
                "Benefits":med_info['combined_features']})

            return {"explanation": API}
        else:
            return {"explanation": Normalize_text(self.name)}
app = FastAPI()

@app.get("/")
def hello_user():
    return {"message": "Medical information"}


@app.post("/predict")
def prediction(medicine: MedicineInput):
    details = medicine.get_scanned_medicine_details(medicine_data)
    return JSONResponse(status_code=200,content=details)



