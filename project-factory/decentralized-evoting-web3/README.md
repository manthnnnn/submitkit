# SecureVote: Web3 Decentralized E-Voting System

A fully decentralized, cryptographically secure voting dApp. It uses Ethereum smart contracts to ensure that votes cannot be altered, spoofed, or deleted by anyone—not even the administrators.

## Features
- **Smart Contracts:** Solidity contracts compiled and deployed via Hardhat.
- **Web3 Frontend:** Next.js + Ethers.js integration for MetaMask wallet connections.
- **Immutable Ledger:** Local blockchain network testing.

## Setup Instructions
1. Run `npm install`
2. Start the local Hardhat node: `npx hardhat node`
3. Deploy the contract: `npx hardhat run scripts/deploy.js --network localhost`
4. Start the frontend: `npm run dev`
