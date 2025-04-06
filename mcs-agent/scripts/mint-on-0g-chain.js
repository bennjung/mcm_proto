#!/usr/bin/env node

/**
 * 0G Chain NFT 민팅 스크립트
 * 
 * 이 스크립트는 0G Chain에 NFT를 민팅합니다.
 * Usage: node mint-on-0g-chain.js --address <wallet_address> --metadata <metadata_uri> --attestation <attestation> --network <network>
 */

const { mintNFTOnZeroGChain } = require('../dist/services/zerogs');
const { validateEnvVars } = require('../dist/utils/helpers');

async function main() {
  try {
    // 필수 환경 변수 검증
    validateEnvVars(['ZEROG_CHAIN_RPC_URL', 'ZEROG_CHAIN_PRIVATE_KEY']);

    const walletAddress = process.argv[2];
    const metadataUri = process.argv[3];
    const securityData = JSON.parse(process.argv[4]);

    if (!walletAddress || !metadataUri || !securityData) {
      throw new Error('Wallet address, metadata URI, and security data are required');
    }

    console.log('Minting NFT on 0G Chain...');
    const result = await mintNFTOnZeroGChain(
      walletAddress,
      metadataUri,
      securityData,
      process.env.ZEROG_CHAIN_PRIVATE_KEY
    );
    console.log('NFT minted:', result);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main(); 