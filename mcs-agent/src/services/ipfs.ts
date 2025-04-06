import axios from 'axios';
import * as fs from 'fs';
import * as FormData from 'form-data';

/**
 * 암호화된 코드를 IPFS에 업로드합니다.
 * @param encryptionResult 암호화 결과
 * @param analysis 분석 결과
 * @param metadata 메타데이터
 * @returns 업로드 결과
 */
export async function uploadEncryptedCodeToIPFS(
  encryptionResult: any,
  analysis: any,
  metadata: {
    name: string;
    description: string;
    metadata: {
      sourceRepo: string;
      fileName: string;
      analysisTimestamp: string;
      teeAttestationId: string;
      teeExpiry: string;
    };
  }
) {
  try {
    const pinataApiKey = process.env.PINATA_API_KEY;
    const pinataSecretKey = process.env.PINATA_SECRET_KEY;

    if (!pinataApiKey || !pinataSecretKey) {
      throw new Error('Pinata API keys are not configured');
    }

    // 암호화된 파일 업로드
    const encryptedFormData = new FormData();
    encryptedFormData.append('file', fs.createReadStream(encryptionResult.encryptedFilePath));
    encryptedFormData.append('pinataMetadata', JSON.stringify({
      name: metadata.name + '_encrypted'
    }));

    const encryptedResponse = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', encryptedFormData, {
      headers: {
        'Authorization': `Bearer ${pinataApiKey}`,
        ...encryptedFormData.getHeaders()
      }
    });

    // 메타데이터 업로드
    const metadataFormData = new FormData();
    metadataFormData.append('file', Buffer.from(JSON.stringify({
      ...metadata,
      analysis,
      encryption: {
        algorithm: 'aes-256-cbc',
        key: encryptionResult.key,
        iv: encryptionResult.iv
      }
    })), {
      filename: 'metadata.json'
    });

    const metadataResponse = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', metadataFormData, {
      headers: {
        'Authorization': `Bearer ${pinataApiKey}`,
        ...metadataFormData.getHeaders()
      }
    });

    return {
      success: true,
      encrypted: {
        ipfsHash: encryptedResponse.data.IpfsHash,
        uri: `ipfs://${encryptedResponse.data.IpfsHash}`
      },
      metadata: {
        ipfsHash: metadataResponse.data.IpfsHash,
        uri: `ipfs://${metadataResponse.data.IpfsHash}`
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
} 