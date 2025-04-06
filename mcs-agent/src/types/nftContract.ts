import { BaseContract, Contract, ContractTransactionResponse } from 'ethers';

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string | number;
  }[];
}

export interface NFTContractInterface extends BaseContract {
  safeMint(to: string, uri: string): Promise<ContractTransactionResponse>;
  ownerOf(tokenId: number): Promise<string>;
  tokenURI(tokenId: number): Promise<string>;
  balanceOf(owner: string): Promise<bigint>;
}

export type NFTContract = Contract & NFTContractInterface;

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