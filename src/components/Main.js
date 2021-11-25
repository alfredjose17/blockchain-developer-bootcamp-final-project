import React, { Component } from 'react'

class Main extends Component {

  render() {
    return (
      <div id="content" className="mt-3" style={{paddingTop:"40px"}}>

        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col">Staking Balance</th>
              <th scope="col">Reward Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')} ETH</td>
              <td>{window.web3.utils.fromWei(this.props.aceTokenBalance, 'Ether')} ACE</td>
            </tr>
          </tbody>
        </table>

        <div className="card mb-4">

          <div className="card-body">

            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let amount
                amount = this.input.value.toString()
                amount = window.web3.utils.toWei(amount, 'Ether')
                this.props.stakeTokens(amount)
              }}>
              <div>
                <label className="float-left"><b>Stake Tokens</b></label>
                <span className="float-right text-muted">
                  Balance: { parseFloat(this.props.etherBalance).toFixed(4) } ETH
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.input = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg" style={{fontWeight: '500'}}>STAKE</button>
            </form>

            <button
              type="submit"
              className="btn btn-link btn-block btn-sm"
              style={{fontWeight: 'bold', fontSize: '14px'}}
              onClick={(event) => {
                event.preventDefault()
                this.props.unstakeTokens()
              }}>
                UNSTAKE
              </button>
          </div>
          <div>
            <p className="h6 text-info" style={{textAlign: 'center'}}>NB: Reload the page after transaction is confirmed </p>
            <p className="h6 text-danger" style={{textAlign: 'center', paddingTop: '5px'}}>Please connect to the Ropsten network! </p>
          </div>
          <br/>
        </div>

      </div>
    );
  }
}

export default Main;
