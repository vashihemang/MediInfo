import requests
from dotenv import load_dotenv
import re
import os

load_dotenv()
API_KEY = os.getenv("OPENROUTER_API_KEY")


def LLM_explanation (prediction):

    prompt = f"""
    You are a professional medical assistant.

    Medicine Name:
    {prediction['Name']}

    Benefits:
    {prediction['Benefits']}

    Side Effects:
    {prediction['Side_Effects']}

    Respond in English.

    The output MUST follow this EXACT structure:

    <Medicine Name>: An Overview

    A short 2-3 sentence introduction explaining what the medicine is and what it is commonly used for.

    Common Uses

    ```
    • First use

    • Second use

    • Third use
    ```

    How Does It Work?

    Provide a simple explanation in 2-4 sentences.

    Important Precautions

    ```
    • First precaution

    • Second precaution

    • Third precaution
    ```

    Side Effects

    ```
    • First side effect

    • Second side effect

    • Third side effect
    ```

    Medical Disclaimer:

    I am an AI assistant. This information is provided for educational purposes only and should not replace professional medical advice. Always consult your doctor, pharmacist, or healthcare provider before taking any medication.

    Rules:

    * Write in clear and simple English.
    * Do not use markdown symbols such as #, *, **, -, or backticks.
    * Keep the tone professional and easy to understand.
    * Leave one blank line between sections.
    * The response should look like a medical article, not a chatbot conversation.
    * Use complete sentences and natural formatting.
    """


    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "google/gemma-4-26b-a4b-it:freeze-2024-06-11",
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        }
    )

    answer = response.json()["choices"][0]["message"]["content"]

    answer = re.sub(r'#+\s*', '', answer)      # ### remove
    answer = re.sub(r'\*+', '', answer)        # *** and **
    answer = re.sub(r'`+', '', answer)         # code marks
    answer = answer.strip()

    return answer




def Normalize_text (prompt2):
    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        },
        json={
        "model": "google/gemma-4-26b-a4b-it:freeze-2024-06-11",
        "messages": [
            {
                "role": "system",
                "content": """
You are MediGuide AI.

Identity:
- Your name is MediInfo AI.
- If someone asks "Who made you?", answer:
  "I was created by Vashi Hemang."
- If someone asks "What is your name?", answer:
  "My name is MediGuide AI."

Rules:
- Respond naturally to greetings.
- If asked who you are, explain that you are an AI assistant specializing in medicine information.
- Answer general knowledge questions briefly and clearly.
- For medicine-related questions, provide detailed explanations.
- Be friendly and professional.
- Keep answers concise unless detailed information is requested.
- Never claim to be a doctor.
- Include a medical disclaimer only for medical topics.
"""
            },
            {
                "role": "user",
                "content": prompt2
            }
        ]
    }
    )
    answer = response.json()["choices"][0]["message"]["content"]

    answer = re.sub(r'#+\s*', '', answer)      # ### remove
    answer = re.sub(r'\*+', '', answer)        # *** and **
    answer = re.sub(r'`+', '', answer)         # code marks
    answer = answer.strip()

    return answer













