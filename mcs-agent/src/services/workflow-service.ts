/**
 * MCS 통합 워크플로우 서비스
 * 
 * 이 모듈은 MCS 시스템의 전체 워크플로우를 0G Chain과 통합하여 처리합니다.
 */
import { analyzeCode } from './code-analysis';
import { encryptCode } from './encryption';
import { uploadToZeroGStorage } from './zeroGStorage';
import { mintNFT } from './nftService';
import { WorkflowStatus, StepResult } from '../types/workflow';

interface WorkflowOptions {
  fileExtensions?: string[];
  verifierAddress?: string;
}

/**
 * 0G Chain 통합 MCS 워크플로우 실행
 * 
 * 전체 MCS 워크플로우를 0G Chain과 통합하여 실행하는 함수입니다.
 * 
 * @param {string} repoUrl - 분석할 GitHub 저장소 URL
 * @param {string} walletAddress - NFT를 받을 지갑 주소
 * @param {string} privateKey - 0G Chain 트랜잭션 서명용 개인 키
 * @param {Object} options - 추가 옵션
 * @returns {Promise<Object>} 워크플로우 상태 및 결과
 */
export const runZeroGMCSWorkflow = async (
  repoUrl: string,
  walletAddress: string,
  privateKey: string,
  options: WorkflowOptions = {}
): Promise<WorkflowStatus> => {
  try {
    // 작업 상태 초기화
    const workflowStatus: WorkflowStatus = {
      repoUrl,
      walletAddress,
      steps: {
        analysis: { status: 'pending', result: null },
        encryption: { status: 'pending', result: null },
        storage: { status: 'pending', result: null },
        minting: { status: 'pending', result: null }
      },
      startTime: new Date().toISOString()
    };
    
    // 1. 코드 분석
    console.log('Step 1: Analyzing code');
    workflowStatus.steps.analysis.status = 'processing';
    const analysis = await analyzeCode(repoUrl);
    workflowStatus.steps.analysis.status = 'completed';
    workflowStatus.steps.analysis.result = analysis;
    
    // 2. 코드 암호화
    console.log('Step 2: Encrypting code');
    workflowStatus.steps.encryption.status = 'processing';
    const encryptionResult = await encryptCode(repoUrl);
    workflowStatus.steps.encryption.status = 'completed';
    workflowStatus.steps.encryption.result = encryptionResult;
    
    // 3. 0G Storage 업로드
    console.log('Step 3: Uploading to 0G Storage');
    workflowStatus.steps.storage.status = 'processing';
    const storageResult = await uploadToZeroGStorage(
      encryptionResult.encryptedCode,
      analysis,
      {
        sourceRepo: repoUrl,
        analysisTimestamp: new Date().toISOString()
      }
    );
    
    if (!storageResult.success) {
      throw new Error(`0G Storage upload failed: ${storageResult.error}`);
    }
    
    workflowStatus.steps.storage.status = 'completed';
    workflowStatus.steps.storage.result = {
      storageId: storageResult.storageId,
      metadataUri: storageResult.metadataUri
    };
    
    // 4. NFT 민팅
    console.log(`Step 4: Minting NFT with metadata URI ${storageResult.metadataUri}`);
    workflowStatus.steps.minting.status = 'processing';
    const mintResult = await mintNFT(
      storageResult.metadataUri,
      {
        sourceRepo: repoUrl,
        analysisTimestamp: new Date().toISOString()
      }
    );
    
    if (!mintResult.success) {
      throw new Error(`NFT minting failed: ${mintResult.error}`);
    }
    
    workflowStatus.steps.minting.status = 'completed';
    workflowStatus.steps.minting.result = {
      tokenId: mintResult.tokenId,
      transactionHash: mintResult.transactionHash,
      metadataUri: storageResult.metadataUri
    };
    
    // 워크플로우 최종 상태 업데이트
    workflowStatus.endTime = new Date().toISOString();
    workflowStatus.status = 'completed';
    workflowStatus.result = {
      tokenId: mintResult.tokenId,
      transactionHash: mintResult.transactionHash,
      metadataUri: storageResult.metadataUri,
      encryptedCodeUri: encryptionResult.encryptedCodeUri,
      storageId: storageResult.storageId
    };
    
    console.log('MCS 0G Chain workflow completed successfully');
    return workflowStatus;
  } catch (error) {
    console.error('Error in MCS 0G Chain workflow:', error);
    
    // 워크플로우 오류 상태 업데이트 및 반환
    return {
      status: 'failed', 
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString()
    } as WorkflowStatus;
  }
};