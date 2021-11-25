pragma solidity >=0.4.22 <0.9.0;

import "./AceToken.sol";


contract TokenFarm {
    string public name = "Dapp Token Farm";
    address public owner;
    AceToken public aceToken;

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(AceToken _aceToken) {
        aceToken = _aceToken;
        owner = msg.sender;
    }


    // Issuing Tokens
    function issueTokens() public {
        // Only owner can call this function
        require(msg.sender == owner, "caller must be the owner");

        // Issue tokens to all stakers
        for (uint i=0; i<stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];
            if(balance > 0) {
                aceToken.transfer(recipient, balance);
            }
        }
    }

    // Unstaking ETH from Contract
    function sendEther() public {
        uint ethBalance = stakingBalance[msg.sender];
        stakingBalance[msg.sender] = 0;
        payable(msg.sender).transfer(ethBalance);

        // Reset staking balance
        stakingBalance[msg.sender] = 0;

        // Update staking status
        isStaking[msg.sender] = false;
    }

    // Staking ETH into Contract
    function recieveEther() external payable {
        stakingBalance[msg.sender] += msg.value;

        // Add user to stakers array *only* if they haven't staked already
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;

        // Issue Token Rewards
        aceToken.transfer(msg.sender, msg.value);
    }
    
    function showBalance() public view returns(uint) {
        return stakingBalance[msg.sender];
    }
}
