const AceToken = artifacts.require('AceToken')
const TokenFarm = artifacts.require('TokenFarm')

require('chai')
  .use(require('chai-as-promised'))
  .should()

// Function to convert Ether to Wei
function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('TokenFarm', ([owner]) => {
  let aceToken, tokenFarm;

  before(async () => {
    // Load Contracts
    aceToken = await AceToken.new()
    tokenFarm = await TokenFarm.new(aceToken.address)

    // Transfer all Ace tokens to farm (1 million)
    await aceToken.transfer(tokenFarm.address, tokens('1000000'))
  })

  describe('Ace Token deployment', async () => {
    it('has a name', async () => {
      const name = await aceToken.name()
      assert.equal(name, 'Ace Token')
    })
  })

  describe('Token Farm deployment', async () => {
    it('has a name', async () => {
      const name = await tokenFarm.name()
      assert.equal(name, 'Dapp Token Farm')
    })

    it('contract has tokens', async () => {
      let balance = await aceToken.balanceOf(tokenFarm.address)
      assert.equal(balance.toString(), tokens('1000000'))
    })
  })

  describe('Farming Tokens', async () => {
    it('owner rewards investors for staking ETH tokens', async () => {
      await tokenFarm.issueTokens({ from: owner })
    })

    it('reject issue token request from other addresses', async () => {
      await tokenFarm.issueTokens({ from: "0x357A3fEEd7bB112f63227A5b5A2CA42246566919" }).should.be.rejected;
    })
  })

})