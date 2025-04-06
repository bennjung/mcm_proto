# NFT 컨트랙트 배포 가이드

## 1. 개발 환경 설정

```bash
# Hardhat 설치
npm install --save-dev hardhat

# 필요한 패키지 설치
npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers @openzeppelin/contracts
```

## 2. 컨트랙트 작성

`contracts/MCSNFT.sol` 파일을 생성하고 다음 코드를 작성:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MCSNFT is ERC721, Ownable {
    constructor() ERC721("MCS NFT", "MCS") {}

    function mint(address to, string memory metadataUri) public onlyOwner returns (uint256) {
        uint256 tokenId = totalSupply() + 1;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, metadataUri);
        return tokenId;
    }
}
```

## 3. 배포 스크립트 작성

`scripts/deploy.ts` 파일을 생성:

```typescript
import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const MCSNFT = await ethers.getContractFactory("MCSNFT");
  const nft = await MCSNFT.deploy();

  await nft.deployed();
  console.log("MCSNFT deployed to:", nft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

## 4. 하드햇 설정

`hardhat.config.ts` 파일을 생성:

```typescript
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  networks: {
    mumbai: {
      url: process.env.NETWORK_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
```

## 5. 컨트랙트 배포

```bash
# 컴파일
npx hardhat compile

# 배포
npx hardhat run scripts/deploy.ts --network mumbai
```

## 6. 배포 후 작업

1. 배포된 컨트랙트 주소를 `.env` 파일의 `NFT_CONTRACT_ADDRESS`에 설정
2. Mumbai 테스트넷에서 컨트랙트 확인 (https://mumbai.polygonscan.com)
3. 테스트넷 MATIC 토큰 요청 (https://faucet.polygon.technology)

## 7. 보안 고려사항

- 프라이빗 키는 절대 공개하지 마세요
- 운영 환경에서는 하드웨어 지갑 사용
- 컨트랙트 배포 전 테스트넷에서 충분히 테스트
- 가스비 최적화 확인 