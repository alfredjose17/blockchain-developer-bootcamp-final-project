# Final Project - ACE Token Farm

## Deployed version url:

[https://alfredjose17.github.io/blockchain-developer-bootcamp-final-project/](https://alfredjose17.github.io/blockchain-developer-bootcamp-final-project/)

NB: Please connect to the Ropsten Network.

## How to run this project locally:

### Prerequisites

- Node.js >= v12.21.0
- npm
- Truffle and Ganache

### Contracts

- Run `npm install` in project root to install Truffle build and smart contract dependencies
- Run `npm install @openzeppelin/contracts` to install OpenZeppelin contracts
- Run `npm i chai` and `npm i chai-as-promised` to install the assertion libraries for testing
- Run local testnet in port `7545` with an Ethereum client, e.g. Ganache
- `truffle migrate --network development`
- `truffle console --network development`
- Run tests in Truffle console: `test`

### Frontend

- `npm install`
- `npm i web3`
- `npm start`
- Open `http://localhost:3000`

## Screencast link

https://youtu.be/UZpyHloMz90

## Public Ethereum wallet for certification:

`0x3D77fC007057880EFf34979f23af8B8Fc6e8ba3A`

## Project description

Yield farming is the practice of staking or lending crypto assets in order to generate high returns or rewards in the form of additional cryptocurrency. 

The ACE Token Farm Dapp allows users to stake thier crypto assets into the TokenFarm smart contract on the Dapp and get rewarded with an equal amount of ACE token, an ERC20 token that is created and added to the TokenFarm contract. Users can also unstake their assets anytime and take back the rewards they have recieved for staking.

The ERC20 token is created using the OpenZeppelin contracts and the preminted tokens are transferred to the TokenFarm contract. The owner of the contract can issue dividends to all the investors using dedicated methods from the TokenFarm contract.

## Simple workflow

1. Enter the service website
2. Connect to Ropsten Wallet via Metamask
3. Stake Crypto Assets into the Dapp
4. Issue ERC20 Token Rewards and Dividends to the Investor
5. Unstake Crypto Assets from the Dapp

## Directory structure

- `src/components`: Project's React frontend components.
- `src/contracts`: Smart contracts that are deployed in the Ropsten testnet.
- `src/abis`: Build of smart contracts that are deployed in the Ropsten testnet.
- `migrations`: Migration files for deploying contracts in `src/contracts` directory.
- `test`: Tests for smart contracts.
- `scripts`: Useful scripts for the user.

## Environment variables (not needed for running project locally)

```
ROPSTEN_INFURA_PROJECT_ID=
ROPSTEN_MNEMONIC=
```

## TODO features

- Add more crypto assets like the DAI token to the staking pool, so that users can stake any of these assets to get rewarded with ACE tokens.
- Add applications like betting or gambling in the Dapp using chainlink and other protocols, for which users will need ACE tokens to participate. This adds some utility for the ACE tokens.

## Scheduled workflow for Additional Applications (Not implemented)

1. Create new applications like betting or gambing for the Dapp.
2. Navigate to the application from the Dapp landing page.
3. Participate in the application using ACE Tokens.
