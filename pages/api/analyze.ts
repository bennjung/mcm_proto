import { NextApiRequest, NextApiResponse } from 'next';
import { downloadRepo } from '@/lib/github';
import { analyzeCode } from '@/lib/eliza';
import { saveToIPFS } from '@/lib/storage';
import { mintNFT } from '@/lib/mint';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { repoUrl, walletAddress } = req.body;

    const zip = await downloadRepo(repoUrl);
    const analysis = await analyzeCode(zip);
    const storage = await saveToIPFS(analysis, repoUrl);

    const metadata = {
      name: `Security Audit NFT`,
      description: `Security score: ${analysis.securityScore}`,
      image: `https://dummyimage.com/400x400/000/fff&text=Score:${analysis.securityScore}`,
      attributes: {
        securityScore: analysis.securityScore,
        vulnerabilitiesCount: analysis.vulnerabilities.length,
        analysisDate: new Date().toISOString(),
        repoUrl
      }
    };

    const tokenId = await mintNFT(walletAddress, metadata);

    res.status(200).json({
      status: 'success',
      data: {
        analysisResult: analysis,
        storageHash: storage.ipfsHash,
        nftTokenId: tokenId,
        nftContractAddress: process.env.NFT_CONTRACT_ADDRESS
      }
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      error: err.message || 'Internal error'
    });
  }
} 