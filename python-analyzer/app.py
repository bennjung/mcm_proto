from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import os
from typing import List, Dict, Any
import json
import re

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

def detect_malicious_patterns(code: str) -> List[Dict[str, Any]]:
    vulnerabilities = []
    
    # 외부 통신 패턴 감지
    external_comm_patterns = [
        r'fetch\(.*\)',
        r'axios\.get\(.*\)',
        r'axios\.post\(.*\)',
        r'http\.request\(.*\)',
        r'https\.request\(.*\)',
        r'websocket\.connect\(.*\)'
    ]
    
    for pattern in external_comm_patterns:
        matches = re.finditer(pattern, code)
        for match in matches:
            vulnerabilities.append({
                "type": "external_communication",
                "severity": "high",
                "line": code[:match.start()].count('\n') + 1,
                "description": f"의심스러운 외부 통신 패턴 감지: {match.group()}"
            })
    
    # 분기문 패턴 감지
    branch_patterns = [
        r'if\s*\(.*\)\s*{\s*return\s*false\s*;\s*}',
        r'if\s*\(.*\)\s*{\s*throw\s*new\s*Error\s*\(.*\)\s*;\s*}'
    ]
    
    for pattern in branch_patterns:
        matches = re.finditer(pattern, code)
        for match in matches:
            vulnerabilities.append({
                "type": "malicious_branch",
                "severity": "high",
                "line": code[:match.start()].count('\n') + 1,
                "description": f"의심스러운 분기문 패턴 감지: {match.group()}"
            })
    
    return vulnerabilities

def detect_wallet_draining(code: str) -> List[Dict[str, Any]]:
    vulnerabilities = []
    
    # 지갑 주소 탈취 패턴
    wallet_patterns = [
        r'privateKey\s*=\s*[\'"][0-9a-fA-F]{64}[\'"]',
        r'wallet\.privateKey\s*=\s*[\'"][0-9a-fA-F]{64}[\'"]',
        r'process\.env\.PRIVATE_KEY',
        r'localStorage\.setItem\s*\(\s*[\'"]privateKey[\'"]',
        r'localStorage\.setItem\s*\(\s*[\'"]wallet[\'"]'
    ]
    
    for pattern in wallet_patterns:
        matches = re.finditer(pattern, code)
        for match in matches:
            vulnerabilities.append({
                "type": "wallet_draining",
                "severity": "critical",
                "line": code[:match.start()].count('\n') + 1,
                "description": f"지갑 주소 탈취 시도 감지: {match.group()}"
            })
    
    return vulnerabilities

def detect_unauthorized_abi_calls(code: str) -> List[Dict[str, Any]]:
    vulnerabilities = []
    
    # 무단 ABI 호출 패턴
    abi_patterns = [
        r'contract\.call\s*\(\s*[\'"]transfer[\'"]',
        r'contract\.call\s*\(\s*[\'"]approve[\'"]',
        r'contract\.call\s*\(\s*[\'"]transferFrom[\'"]',
        r'contract\.call\s*\(\s*[\'"]mint[\'"]',
        r'contract\.call\s*\(\s*[\'"]burn[\'"]'
    ]
    
    for pattern in abi_patterns:
        matches = re.finditer(pattern, code)
        for match in matches:
            vulnerabilities.append({
                "type": "unauthorized_abi_call",
                "severity": "high",
                "line": code[:match.start()].count('\n') + 1,
                "description": f"무단 ABI 호출 감지: {match.group()}"
            })
    
    return vulnerabilities

@app.get("/")
async def root():
    return {"message": "MCS Code Analyzer API"}

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_code(request: AnalysisRequest):
    try:
        code = request.code
        vulnerabilities = []
        
        # 각 취약점 유형별로 분석 수행
        vulnerabilities.extend(detect_malicious_patterns(code))
        vulnerabilities.extend(detect_wallet_draining(code))
        vulnerabilities.extend(detect_unauthorized_abi_calls(code))
        
        # 보안 점수 계산
        severity_weights = {
            "critical": 5,
            "high": 3,
            "medium": 2,
            "low": 1
        }
        
        total_score = 100
        for vuln in vulnerabilities:
            total_score -= severity_weights.get(vuln["severity"], 1)
        
        score = max(0, min(100, total_score))
        
        # 개선 제안 생성
        suggestions = [
            "외부 통신은 신뢰할 수 있는 도메인으로만 제한하세요.",
            "민감한 정보는 절대 코드에 하드코딩하지 마세요.",
            "모든 ABI 호출은 적절한 권한 검사를 수행하세요.",
            "분기문은 명확한 조건과 함께 사용하세요."
        ]
        
        return AnalysisResponse(
            vulnerabilities=vulnerabilities,
            suggestions=suggestions,
            score=score
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