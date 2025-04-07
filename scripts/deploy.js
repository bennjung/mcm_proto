const hre = require("hardhat");

async function main() {
  const MCSNFT = await hre.ethers.getContractFactory("MCSNFT");
  const mcsNFT = await MCSNFT.deploy();

  await mcsNFT.deployed();

  console.log("MCSNFT deployed to:", mcsNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 