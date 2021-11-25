const AceToken = artifacts.require('AceToken')
const TokenFarm = artifacts.require('TokenFarm')

module.exports = async function(deployer, network, accounts) {
  // Deploy Ace Token
  await deployer.deploy(AceToken)
  const aceToken = await AceToken.deployed()

  // Deploy TokenFarm
  await deployer.deploy(TokenFarm, aceToken.address)
  const tokenFarm = await TokenFarm.deployed()

  // Transfer all tokens to TokenFarm (1 million)
  await aceToken.transfer(tokenFarm.address, '1000000000000000000000000')
}