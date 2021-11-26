import React, { Component } from 'react'
import Web3 from 'web3'
import AceToken from '../abis/AceToken.json'
import TokenFarm from '../abis/TokenFarm.json'
import Navbar from './Navbar'
import Main from './Main'
import './App.css'


class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }


  // Detect MetaMask and Connect to current account
  async loadWeb3() {

    // Check for Metamask
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.request({ method: 'eth_requestAccounts' })
    }

    //Check for other wallets
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }

    else {
      window.alert('No Ethereum wallets detected. You should consider trying MetaMask!')
    }
  }


  // Loading the Data from Chain
  async loadBlockchainData() {

    const web3 = window.web3
    const networkId = await web3.eth.net.getId()

    // Load AceToken
    const aceTokenData = AceToken.networks[networkId]
    if(aceTokenData) {
      const aceToken = new web3.eth.Contract(AceToken.abi, aceTokenData.address)
      this.setState({ aceToken })
      let aceTokenBalance = await aceToken.methods.balanceOf(window.ethereum.selectedAddress).call()
      this.setState({ aceTokenBalance: aceTokenBalance.toString() })
    } else {
      window.alert('AceToken contract not deployed to detected network.')
    }

    // Load TokenFarm
    const tokenFarmData = TokenFarm.networks[networkId]
    if(tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
      this.setState({ tokenFarm })
      let stakingBalance = await tokenFarm.methods.stakingBalance(window.ethereum.selectedAddress).call()
      this.setState({ stakingBalance: stakingBalance.toString() })
    } else {
      window.alert('TokenFarm contract not deployed to detected network.')
    }

    // Current Ethereum Balance
    let etherBalance = await window.web3.eth.getBalance(window.ethereum.selectedAddress)
    etherBalance = window.web3.utils.fromWei(etherBalance.toString(), 'Ether')
    this.setState({ etherBalance: etherBalance })

    this.setState({ loading: false })
  }


  // Stake ETH into the Contract
  stakeTokens = async(amount) => {
    if( amount <= 0 ) {
      alert("Please enter a valid amount!");
    }
    else {
      await this.state.tokenFarm.methods.recieveEther().send({ from: window.ethereum.selectedAddress, value: amount});
      
      // Checking transaction status
      if(window.web3.eth.getTransactionReceipt("{hash}") == null) {
        alert("Transaction failed! Please check your transaction and try again.");
      }
      else {
        alert("Transaction confirmed successfully!");
        window.location.reload()
      }

    }
  }


  // Unstake ETH to user wallet
  unstakeTokens = async() => {
    if(this.stakingBalance > 0) {
      await this.state.tokenFarm.methods.sendEther().send({ from: window.ethereum.selectedAddress })

      // Checking transaction status
      if(window.web3.eth.getTransactionReceipt("{hash}") == null) {
        alert("Transaction failed! Please check your transaction and try again.");
      }
      else {
        alert("Transaction confirmed successfully!");
        window.location.reload()
      }
    }
    else {
      alert("Not enough balance to unstake!");
    }

  }


  constructor(props) {
    super(props)
    this.state = {
      aceToken: {},
      tokenFarm: {},
      aceTokenBalance: '0',
      stakingBalance: '0',
      etherBalance: '0',
      loading: true
    }
  }

  
  render() {
    let content
    if(this.state.loading) {
      if(window.ethereum.selectedAddress) {
        content = 
        <div className="text-center">
          <p id="loader" className="h5 text-bold" style={{paddingTop: '100px'}}>Loading data...</p>
        </div>
      }
      else {
        content = 
        <div className="text-center">
          <p id="loader" className="h5 text-bold text-secondary" style={{paddingTop: '100px'}}>Looking for some ACE Tokens?</p>
          <p id="loader" className="h5 text-bold" style={{paddingTop: '15px', paddingBottom: '15px'}}>Connect Ropsten wallet to continue.</p>
          <button
            type="submit"
            className="btn btn-success"
            style={{fontWeight: 'bold', fontSize: '15px'}}
            onClick={async(event) => {
              await window.ethereum.request({ method: 'eth_requestAccounts' });
              window.location.reload();
            }}>
              Connect
          </button>
        </div>
      }
    } 
    else {
      content = <Main
        etherBalance={this.state.etherBalance}
        aceTokenBalance={this.state.aceTokenBalance}
        stakingBalance={this.state.stakingBalance}
        stakeTokens={this.stakeTokens}
        unstakeTokens={this.unstakeTokens}
      />
    }

    return (
      <div>
        <Navbar account={window.ethereum.selectedAddress} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">

                {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
