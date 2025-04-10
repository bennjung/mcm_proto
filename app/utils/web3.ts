import { createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected(),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

export const checkIfWalletIsConnected = async () => {
  try {
    if (typeof window !== 'undefined' && window.ethereum) {
      return true;
    }
    console.log('메타마스크를 설치해주세요!');
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}; 