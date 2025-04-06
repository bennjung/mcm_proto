import { Contract, ContractTransactionResponse } from 'ethers';

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: {
    securityScore: number;
    analysisDate: string;
    storageUri: string;
    teeAttestation: string;
    [key: string]: any;
  };
}

export interface NFTContract extends Contract {
  safeMint(to: string, uri: string): Promise<ContractTransactionResponse>;
  ownerOf(tokenId: number): Promise<string>;
  tokenURI(tokenId: number): Promise<string>;
  balanceOf(owner: string): Promise<bigint>;
  totalSupply(): Promise<bigint>;
}

export const NFTContract = {
  abi: [
    {
      inputs: [
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'string', name: 'uri', type: 'string' }
      ],
      name: 'safeMint',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ]
}; 