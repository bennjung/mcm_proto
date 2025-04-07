const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MCSNFT", function () {
  let MCSNFT;
  let mcsNFT;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    MCSNFT = await ethers.getContractFactory("MCSNFT");
    mcsNFT = await MCSNFT.deploy();
    await mcsNFT.deployed();
  });

  describe("Code Review", function () {
    it("Should submit and approve code review", async function () {
      const repository = "test-repo";
      const commitHash = "abc123";
      const reviewer = "ElizaOS";
      const reviewScore = 85;

      const tx = await mcsNFT.submitCodeReview(
        repository,
        commitHash,
        reviewer,
        reviewScore
      );
      await tx.wait();

      const tokenId = 1;
      const review = await mcsNFT.getCodeReview(tokenId);

      expect(review.repository).to.equal(repository);
      expect(review.commitHash).to.equal(commitHash);
      expect(review.reviewer).to.equal(reviewer);
      expect(review.reviewScore).to.equal(reviewScore);
      expect(review.isApproved).to.equal(true);
    });

    it("Should not approve code review with low score", async function () {
      const repository = "test-repo";
      const commitHash = "abc123";
      const reviewer = "ElizaOS";
      const reviewScore = 75;

      const tx = await mcsNFT.submitCodeReview(
        repository,
        commitHash,
        reviewer,
        reviewScore
      );
      await tx.wait();

      const tokenId = 1;
      const review = await mcsNFT.getCodeReview(tokenId);

      expect(review.isApproved).to.equal(false);
    });
  });

  describe("Usage Rights", function () {
    it("Should grant usage right", async function () {
      // First submit and approve a code review
      await mcsNFT.submitCodeReview(
        "test-repo",
        "abc123",
        "ElizaOS",
        85
      );

      const tokenId = 1;
      const duration = 3600; // 1 hour

      const tx = await mcsNFT.grantUsageRight(
        tokenId,
        addr1.address,
        duration
      );
      await tx.wait();

      const usageRight = await mcsNFT.getUsageRight(tokenId);
      expect(usageRight.user).to.equal(addr1.address);
      expect(usageRight.isActive).to.equal(true);
    });

    it("Should transfer usage right", async function () {
      // First submit and approve a code review
      await mcsNFT.submitCodeReview(
        "test-repo",
        "abc123",
        "ElizaOS",
        85
      );

      const tokenId = 1;
      const duration = 3600;

      // Grant usage right to addr1
      await mcsNFT.grantUsageRight(
        tokenId,
        addr1.address,
        duration
      );

      // Transfer usage right from addr1 to addr2
      await mcsNFT.connect(addr1).transferUsageRight(tokenId, addr2.address);

      const usageRight = await mcsNFT.getUsageRight(tokenId);
      expect(usageRight.user).to.equal(addr2.address);
    });
  });
}); 