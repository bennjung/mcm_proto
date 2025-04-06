import { ethers } from 'ethers';

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  properties?: Record<string, unknown>;
}

export interface NFTContract extends ethers.Contract {
  mint: (to: string, metadataUri: string) => Promise<ethers.ContractTransaction>;
  tokenURI: (tokenId: number) => Promise<string>;
  ownerOf: (tokenId: number) => Promise<string>;
  balanceOf: (owner: string) => Promise<ethers.BigNumber>;
  totalSupply: () => Promise<ethers.BigNumber>;
} 