# AlmaCoin ERC20 Token

This project is an implementation of an ERC20 token named AlmaCoin. ERC20 tokens are used in many blockchain-based systems to represent a value or asset.

## Prerequisites

In order to use this project, you will need to have the following installed:

- [Node.js](https://nodejs.org/en/) (version 14 or later)
- [npm](https://www.npmjs.com/get-npm) (version 6 or later)
- [Hardhat](https://hardhat.org/getting-started/#installation) (version 2 or later)

You will also need a web3-enabled browser (such as [Metamask](https://metamask.io/)) to interact with the deployed contract.

## Installation

To install the required dependencies, run:

```bash
npm install
```

## Usage

### Testing

To run the tests, use the following command:

```bash
npx hardhat test
```

This will run the test suite, which includes tests for each of the ERC20 token functions.

## Deployment
To deploy the contract to a network, you will need to create a .env file in the root directory of the project, containing the following variables:

```bash
ALCHEMY_API_KEY=<your Alchemy API key>
```

Once you have set up your environment variables, you can deploy the contract to the Mumbai testnet using the following command:

```bash
npx hardhat run scripts/deploy.js --network mumbai
```

This will deploy the contract to the Mumbai testnet using your Alchemy API key.

## Frontend

To interact with the deployed contract using a frontend, navigate to the frontend directory and run:

```bash
npm install
http-server frontend
```

This will start a local development server, which you can use to interact with the deployed contract via Metamask.
