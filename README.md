# Flipper DApp

The Flipper DApp is a decentralized application built on the Ethereum blockchain, specifically tailored for the Sepolia test network. It allows users to interact with a smart contract that simulates a coin flip game. This project utilizes Solidity for smart contract development, React for the frontend, and leverages MetaMask for Ethereum blockchain interactions.

The app is deployed at : https://coin-flip-gamee9s.vercel.app/
## Features

- **Coin Flip Simulation**: Users can flip a coin and receive a random result of "Heads" or "Tails".
- **MetaMask Integration**: Connects directly with MetaMask for Ethereum transactions.
- **Infura**: Uses Infura's Ethereum node as a provider to interact with the Sepolia network.
- **Responsive UI**: A clean and responsive user interface built with React.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (version 12.x or higher)
- [npm](https://www.npmjs.com/) (typically comes with Node.js)
- [MetaMask](https://metamask.io/) extension installed in your browser for interacting with the DApp.

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/flipper-dapp.git
   cd flipper-dapp
   ```

2. **Install Dependencies**

   Navigate to the project directory and install the required npm packages:

   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   REACT_APP_INFURA_PROJECT_ID=your_infura_project_id_here
   REACT_APP_CONTRACT_ADDRESS=deployed_contract_address_here
   ```

   Replace `your_infura_project_id_here` and `deployed_contract_address_here` with your actual Infura Project ID and deployed contract address.

## Smart Contract Deployment

To deploy the smart contract to the Sepolia network:

1. **Configure Truffle**

   Ensure your `truffle-config.js` is set up to use the Sepolia network via Infura:

   ```javascript
   const HDWalletProvider = require('@truffle/hdwallet-provider');
   const mnemonic = 'your_wallet_mnemonic_here';

   module.exports = {
     networks: {
       sepolia: {
         provider: () => new HDWalletProvider(mnemonic, `https://sepolia.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`),
         network_id: 11155111,
         gas: 5500000,
         confirmations: 2,
         timeoutBlocks: 200,
         skipDryRun: true
       },
     },
   };
   ```

2. **Migrate the Contract**

   ```bash
   truffle migrate --network sepolia
   ```

## Running the Application Locally

To start the application:

```bash
npm start
```

This will launch the React application on `http://localhost:3000`.

## Interacting with the DApp

1. **Connect MetaMask to Sepolia Test Network.**
2. **Use the MetaMask extension to connect your account to the DApp.**
3. **Enjoy flipping the coin and viewing results directly on the blockchain.**
