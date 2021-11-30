// SPDX-License-Identifier: MIT
pragma solidity 0.8.2;

import "./AceToken.sol";


/// @title Contract for Yield Farming
/// @author Alfred Varghese Jose
/// @notice Allows users to stake their crypto assets and get ACE Token Rewards
/// @dev ETH is the crypto asset used currently for staking
contract TokenFarm {
    string public name = "Dapp Token Farm";
    address public owner;
    AceToken public aceToken;

    /// @notice List of all the current investors
    address[] public stakers;

    /// @notice Mapping of investor address and their staking balance
    mapping(address => uint) public stakingBalance;

    /// @notice Mapping of investors staking status
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    /// @param _aceToken Reference to an AceToken instance used for initializing TokenFarm contract
    /// @dev Owner variable set as contract creator for future use
    constructor(AceToken _aceToken) {
        aceToken = _aceToken;
        owner = msg.sender;
    }


    /// @notice Allows contract owners to issue dividends for investors
    /// @dev Addresses in stakers array will recieve dividends equal to their current staking balance
    function issueTokens() public {
        /// @notice Only owner can call this function
        require(msg.sender == owner, "caller must be the owner");

        /// @notice Issue dividends to all stakers
        for (uint i=0; i<stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];
            if(balance > 0) {
                aceToken.transfer(recipient, balance);
            }
        }
    }


    /// @notice Allows users to unstake their crypto assets
    /// @dev Entire ETH staking balance is paid back to the investor
    function sendEther() public {
        /// @notice Staking balance amount should be greater than 0
        require(stakingBalance[msg.sender] > 0, "Insufficient balance");

        uint ethBalance = stakingBalance[msg.sender];

        /// @notice Update staking status
        stakingBalance[msg.sender] = 0;
        isStaking[msg.sender] = false;

        /// @notice Send ETH back to investor
        payable(msg.sender).transfer(ethBalance);

    }


    /// @notice Allows users to stake their crypto assets
    /// @dev Same value of ACE Tokens are rewarded to the investor
    function recieveEther() external payable {
        /// @notice Staking amount should be greater than 0
        require(msg.value > 0, "Invalid amount for staking");

        stakingBalance[msg.sender] += msg.value;

        /// @notice Add user to stakers array only if they haven't staked already
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        /// @notice Update staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;

        /// @notice Issue Token Rewards
        aceToken.transfer(msg.sender, msg.value);
    }
    

    /// @notice Returns the staking balance of an investor
    /// @return Staking balance of the investor
    function showBalance() public view returns(uint) {
        return stakingBalance[msg.sender];
    }
}
