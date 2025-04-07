// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MCSNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // 코드 리뷰 정보 구조체
    struct CodeReview {
        string repository;
        string commitHash;
        string reviewer;
        uint256 reviewScore;
        bool isApproved;
    }

    // 사용권 정보 구조체
    struct UsageRight {
        address user;
        uint256 startTime;
        uint256 endTime;
        bool isActive;
    }

    // 토큰 ID별 코드 리뷰 정보
    mapping(uint256 => CodeReview) private _codeReviews;
    // 토큰 ID별 사용권 정보
    mapping(uint256 => UsageRight) private _usageRights;

    // 이벤트 정의
    event CodeReviewSubmitted(uint256 indexed tokenId, string repository, string commitHash, string reviewer);
    event CodeReviewApproved(uint256 indexed tokenId, uint256 reviewScore);
    event UsageRightGranted(uint256 indexed tokenId, address indexed user, uint256 startTime, uint256 endTime);
    event UsageRightRevoked(uint256 indexed tokenId, address indexed user);
    event UsageRightTransferred(uint256 indexed tokenId, address indexed from, address indexed to);

    constructor() ERC721("MCS NFT", "MCS") {}

    // 코드 리뷰 제출 함수 (ElizaOS MCS Agent만 호출 가능)
    function submitCodeReview(
        string memory repository,
        string memory commitHash,
        string memory reviewer,
        uint256 reviewScore
    ) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _codeReviews[newTokenId] = CodeReview({
            repository: repository,
            commitHash: commitHash,
            reviewer: reviewer,
            reviewScore: reviewScore,
            isApproved: reviewScore >= 80 // 80점 이상이면 자동 승인
        });

        if (_codeReviews[newTokenId].isApproved) {
            _safeMint(msg.sender, newTokenId);
            emit CodeReviewApproved(newTokenId, reviewScore);
        }

        emit CodeReviewSubmitted(newTokenId, repository, commitHash, reviewer);
        return newTokenId;
    }

    // 코드 리뷰 정보 조회 함수
    function getCodeReview(uint256 tokenId) public view returns (
        string memory repository,
        string memory commitHash,
        string memory reviewer,
        uint256 reviewScore,
        bool isApproved
    ) {
        CodeReview memory review = _codeReviews[tokenId];
        return (
            review.repository,
            review.commitHash,
            review.reviewer,
            review.reviewScore,
            review.isApproved
        );
    }

    // NFT 발행 함수
    function mint(address to) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(to, newTokenId);
        return newTokenId;
    }

    // 사용권 부여 함수
    function grantUsageRight(
        uint256 tokenId,
        address user,
        uint256 duration
    ) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Not owner or approved");
        require(_usageRights[tokenId].isActive == false, "Usage right already active");

        uint256 startTime = block.timestamp;
        uint256 endTime = startTime + duration;

        _usageRights[tokenId] = UsageRight({
            user: user,
            startTime: startTime,
            endTime: endTime,
            isActive: true
        });

        emit UsageRightGranted(tokenId, user, startTime, endTime);
    }

    // 사용권 취소 함수
    function revokeUsageRight(uint256 tokenId) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Not owner or approved");
        require(_usageRights[tokenId].isActive, "No active usage right");

        address user = _usageRights[tokenId].user;
        delete _usageRights[tokenId];

        emit UsageRightRevoked(tokenId, user);
    }

    // 사용권 전송 함수
    function transferUsageRight(uint256 tokenId, address to) public {
        require(_usageRights[tokenId].isActive, "No active usage right");
        require(_usageRights[tokenId].user == msg.sender, "Not usage right holder");

        address from = _usageRights[tokenId].user;
        _usageRights[tokenId].user = to;

        emit UsageRightTransferred(tokenId, from, to);
    }

    // 사용권 정보 조회 함수
    function getUsageRight(uint256 tokenId) public view returns (
        address user,
        uint256 startTime,
        uint256 endTime,
        bool isActive
    ) {
        UsageRight memory right = _usageRights[tokenId];
        return (right.user, right.startTime, right.endTime, right.isActive);
    }

    // 사용권 유효성 검사 함수
    function isValidUsageRight(uint256 tokenId) public view returns (bool) {
        UsageRight memory right = _usageRights[tokenId];
        return right.isActive && 
               block.timestamp >= right.startTime && 
               block.timestamp <= right.endTime;
    }
} 