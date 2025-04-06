from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import os
from typing import List, Dict, Any
import json

app = FastAPI(title="MCS Code Analyzer")

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalysisRequest(BaseModel):
    code: str
    file_type: str

class AnalysisResponse(BaseModel):
    vulnerabilities: List[Dict[str, Any]]
    suggestions: List[str]
    score: float

@app.get("/")
async def root():
    return {"message": "MCS Code Analyzer API"}

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_code(request: AnalysisRequest):
    try:
        # TODO: 실제 코드 분석 로직 구현
        # 임시 응답
        return AnalysisResponse(
            vulnerabilities=[
                {
                    "type": "reentrancy",
                    "severity": "high",
                    "line": 42,
                    "description": "Potential reentrancy vulnerability detected"
                }
            ],
            suggestions=[
                "Use checks-effects-interactions pattern",
                "Implement reentrancy guard"
            ],
            score=0.85
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze-file")
async def analyze_file(file: UploadFile = File(...)):
    try:
        content = await file.read()
        code = content.decode("utf-8")
        
        # TODO: 실제 코드 분석 로직 구현
        # 임시 응답
        return {
            "vulnerabilities": [
                {
                    "type": "reentrancy",
                    "severity": "high",
                    "line": 42,
                    "description": "Potential reentrancy vulnerability detected"
                }
            ],
            "suggestions": [
                "Use checks-effects-interactions pattern",
                "Implement reentrancy guard"
            ],
            "score": 0.85
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)