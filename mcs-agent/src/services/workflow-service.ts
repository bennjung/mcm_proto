/**
 * MCS 통합 워크플로우 서비스
 * 
 * 이 모듈은 MCS 시스템의 전체 워크플로우를 0G Chain과 통합하여 처리합니다.
 */
import { cloneRepo } from '../utils/github';
import { analyzeRepository } from '../utils/analyzer';
import { encryptFile } from '../utils/encryption';
import { uploadEncryptedCodeToIPFS } from '../utils/ipfs';
import { 
  mintNFTOnZeroGChain, 
  generateTEEAttestation,
  verifyCodeSecurityStatus 
} from '../utils/zerogs';

interface WorkflowOptions {
  fileExtensions?: string[];
  verifierAddress?: string;
}

interface StepResult {
  status: string;
  result: {
    [key: string]: string | number | boolean | null | undefined;
  } | null;
}

interface WorkflowStatus {
  repoUrl: string;
  walletAddress: string;
  steps: {
    cloning: StepResult;
    analysis: StepResult;
    teeAttestation: StepResult;
    encryption: StepResult;
    ipfsUpload: StepResult;
    zeroGMinting: StepResult;
  };
  startTime: string;
  endTime?: string;
  status?: string;
  result?: {
    [key: string]: string | number | boolean | null | undefined;
  };
  error?: string;
  timestamp?: string;
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
        cloning: { status: 'pending', result: null },
        analysis: { status: 'pending', result: null },
        teeAttestation: { status: 'pending', result: null },
        encryption: { status: 'pending', result: null },
        ipfsUpload: { status: 'pending', result: null },
        zeroGMinting: { status: 'pending', result: null }
      },
      startTime: new Date().toISOString()
    };
    
    // 1. GitHub 저장소 클론
    console.log(`Step 1: Cloning repository ${repoUrl}`);
    workflowStatus.steps.cloning.status = 'processing';
    
    const cloneResult = await cloneRepo(repoUrl);
    if (!cloneResult.success) {
      throw new Error(`Repository cloning failed: ${cloneResult.error}`);
    }
    
    workflowStatus.steps.cloning.status = 'completed';
    workflowStatus.steps.cloning.result = {
      repoPath: cloneResult.path,
      folderName: cloneResult.folderName
    };
    
    // 2. 코드 분석 및 AI 주석 추가
    console.log(`Step 2: Analyzing repository at ${cloneResult.path}`);
    workflowStatus.steps.analysis.status = 'processing';
    
    const analysisResult = await analyzeRepository(
      cloneResult.path,
      options?.fileExtensions || ['.sol', '.js', '.ts']
    );
    
    workflowStatus.steps.analysis.status = 'completed';
    workflowStatus.steps.analysis.result = {
      fileCount: analysisResult.fileCount,
      vulnerabilityCount: analysisResult.results.reduce(
        (count, file) => count + (file.analysis.analysis?.vulnerability_count || 0), 
        0
      )
    };
    
    // 주석이 추가된 파일 선택 (취약점이 가장 많은 파일)
    const targetFile = analysisResult.results
      .sort((a, b) => 
        (b.analysis.analysis?.vulnerability_count || 0) - 
        (a.analysis.analysis?.vulnerability_count || 0)
      )[0];
    
    if (!targetFile) {
      throw new Error('No files were analyzed');
    }
    
    const annotatedFilePath = targetFile.analysis.annotation?.annotatedFilePath;
    if (!annotatedFilePath) {
      throw new Error('No annotated file was generated');
    }
    
    // 2.5 TEE 증명 생성 (0G Chain 통합을 위한 단계)
    console.log(`Step 2.5: Generating TEE attestation for analysis results`);
    workflowStatus.steps.teeAttestation.status = 'processing';
    
    const teeResult = await generateTEEAttestation(targetFile.analysis);
    
    if (!teeResult.success) {
      throw new Error(`TEE attestation failed: ${teeResult.error}`);
    }
    
    workflowStatus.steps.teeAttestation.status = 'completed';
    workflowStatus.steps.teeAttestation.result = {
      attestation: teeResult.attestation.substring(0, 20) + '...',
      expiry: teeResult.expiry
    };
    
    // 3. 주석이 추가된 코드 암호화
    console.log(`Step 3: Encrypting annotated file ${annotatedFilePath}`);
    workflowStatus.steps.encryption.status = 'processing';
    
    const encryptionResult = await encryptFile(annotatedFilePath);
    
    workflowStatus.steps.encryption.status = 'completed';
    workflowStatus.steps.encryption.result = {
      encryptedFilePath: encryptionResult.encryptedFilePath,
      metadataPath: encryptionResult.metadataPath
    };
    
    // 4. 암호화된 코드 IPFS 업로드
    console.log(`Step 4: Uploading encrypted file to IPFS`);
    workflowStatus.steps.ipfsUpload.status = 'processing';
    
    // TEE 증명 정보를 메타데이터에 추가
    const ipfsResult = await uploadEncryptedCodeToIPFS(
      encryptionResult,
      targetFile.analysis,
      {
        name: `MCS_${targetFile.name}`,
        description: `Secured smart contract code analyzed by MCS with 0G Chain attestation`,
        metadata: {
          sourceRepo: repoUrl,
          fileName: targetFile.name,
          analysisTimestamp: new Date().toISOString(),
          teeAttestationId: teeResult.attestation.substring(0, 10) + '...',
          teeExpiry: teeResult.expiry
        }
      }
    );
    
    if (!ipfsResult.success) {
      throw new Error(`IPFS upload failed: ${ipfsResult.error}`);
    }
    
    workflowStatus.steps.ipfsUpload.status = 'completed';
    workflowStatus.steps.ipfsUpload.result = {
      encryptedCodeCid: ipfsResult.encrypted.ipfsHash,
      metadataCid: ipfsResult.metadata.ipfsHash,
      metadataUri: ipfsResult.metadata.uri
    };
    
    // 5. 0G Chain에 NFT 민팅
    console.log(`Step 5: Minting NFT on 0G Chain with metadata URI ${ipfsResult.metadata.uri}`);
    workflowStatus.steps.zeroGMinting.status = 'processing';
    
    // 코드 해시 및 분석 결과에 대한 보안 데이터 생성
    const securityData = {
      codeHash: encryptionResult.originalContent || targetFile.content,
      analysisHash: JSON.stringify(targetFile.analysis),
      timestamp: Math.floor(Date.now() / 1000),
      verifier: options.verifierAddress || '0x0000000000000000000000000000000000000000',
      teeAttestation: teeResult.attestation
    };
    
    // 0G Chain에 NFT 민팅
    const mintResult = await mintNFTOnZeroGChain(
      walletAddress,
      ipfsResult.metadata.uri,
      securityData,
      privateKey
    );
    
    if (!mintResult.success) {
      throw new Error(`NFT minting on 0G Chain failed: ${mintResult.error}`);
    }
    
    workflowStatus.steps.zeroGMinting.status = 'completed';
    workflowStatus.steps.zeroGMinting.result = {
      tokenId: mintResult.tokenId,
      txHash: mintResult.txHash,
      blockNumber: mintResult.blockNumber
    };
    
    // 워크플로우 최종 상태 업데이트
    workflowStatus.endTime = new Date().toISOString();
    workflowStatus.status = 'completed';
    workflowStatus.result = {
      tokenId: mintResult.tokenId,
      txHash: mintResult.txHash,
      blockNumber: mintResult.blockNumber,
      metadataUri: ipfsResult.metadata.uri,
      encryptedCodeUri: ipfsResult.encrypted.uri,
      teeAttestation: teeResult.attestation.substring(0, 20) + '...',
      keyData: {
        key: encryptionResult.key,
        iv: encryptionResult.iv
      }
    };
    
    console.log('MCS 0G Chain workflow completed successfully');
    return workflowStatus;
  } catch (error) {
    console.error('Error in MCS 0G Chain workflow:', error);
    
    // 워크플로우 오류 상태 업데이트 및 반환
    return {
      status: 'failed',
      error: error.message,
      timestamp: new Date().toISOString()
    } as WorkflowStatus;
  }
}; 