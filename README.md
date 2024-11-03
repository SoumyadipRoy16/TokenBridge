# 🪙 My Token DApp

This project is a decentralized application (DApp) that allows users to transfer ERC-20 tokens using **MetaMask**. The DApp connects to the Ethereum blockchain and interacts with a smart contract to manage token transfers securely.

---

## 🚀 Features

- 🔗 **Connect MetaMask**: Easily connect to MetaMask to access your wallet and interact with the blockchain.
- 💰 **View Token Balance**: Display the user's token balance for the connected wallet.
- ✉️ **Transfer Tokens**: Securely transfer ERC-20 tokens to other addresses.

---

## 🛠️ Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [MetaMask](https://metamask.io/) browser extension
- Ethereum-compatible browser (e.g., Chrome, Brave)
- [Infura](https://infura.io/) account for deployment
- [Hardhat](https://hardhat.org/) development environment

### Installation Steps

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/SoumyadipRoy16/TokenBridge.git
cd TokenBridge/my-token-dapp
```

#### 2️⃣ Install Dependencies
```bash
npm install
```

#### 3️⃣ Create `.env` File
Create a `.env` file in the root of your project and add:
```bash
# .env
CONTRACT_ADDRESS=0x3627eCB5135d38f9CA14b103B2c50761FFe55194
INFURA_API_KEY=your-infura-api-key
PRIVATE_KEY=your-wallet-private-key
```

#### 4️⃣ Export Contract Address
For Linux/macOS:
```bash
export CONTRACT_ADDRESS=0x3627eCB5135d38f9CA14b103B2c50761FFe55194
```

For Windows (Command Prompt):
```bash
set CONTRACT_ADDRESS=0x3627eCB5135d38f9CA14b103B2c50761FFe55194
```

## 📜 Smart Contract Development

### Development Framework
This project uses [Hardhat](https://hardhat.org/) as the development environment for compiling, testing, and deploying smart contracts. The contract is deployed on the Sepolia testnet using Infura as the node provider.

### Compile Contract
```bash
npx hardhat compile
```

### Deploy Contract
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### Test Contract
```bash
npx hardhat test
```

### Contract Configuration
Update the `hardhat.config.js` file with your network settings:
```javascript
module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
```

## ⚙️ Running the Project

1️⃣ Start the Development Server
```bash
npm run dev
```

2️⃣ Open Your Browser
```plaintext
http://localhost:3000
```

## 🧑‍💻 Usage

1. **Connect MetaMask**: Click on the "Connect MetaMask" button to connect your wallet.
2. **Check Balance**: Your ERC-20 token balance will be displayed after connecting.
3. **Transfer Tokens**: Enter the recipient's address and the amount of tokens you want to transfer, and click "Send Tokens".

## 📄 Smart Contract

This DApp interacts with an ERC-20 smart contract deployed on the Ethereum Sepolia testnet via Infura. The contract address used is:

```plaintext
0x3627eCB5135d38f9CA14b103B2c50761FFe55194
```

## 🧰 Tools and Technologies

* **React**: A JavaScript library for building user interfaces.
* **Ethers.js**: A library for interacting with the Ethereum blockchain.
* **MetaMask**: Ethereum wallet and browser extension.
* **Solidity**: Programming language for writing smart contracts.


* **Hardhat**: Ethereum development environment for professionals.
* **Infura**: Ethereum node infrastructure provider.
* **Sepolia**: Ethereum testnet for development and testing.

## 💻 Screenshots

### 1️⃣ Connect Wallet Interface

![Connect Wallet Screenshot](https://github.com/user-attachments/assets/b96c6ea7-0e16-486a-82d9-895b9c708267)

### 2️⃣ Token Balance Display
![Token Balance Display](https://github.com/user-attachments/assets/a551521d-70e1-4964-9263-a8575db9ba43)

### 3️⃣ Transfer Tokens Interface
![Transfer Interface Screenshot](https://github.com/user-attachments/assets/f63aed8a-ab41-4839-957b-2727d7ff415f)

## 📝 License

This project is licensed under the MIT License.

---

🏗️ Built with Love for Blockchain! 🛠️
