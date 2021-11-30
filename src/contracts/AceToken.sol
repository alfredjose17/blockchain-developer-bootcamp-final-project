// SPDX-License-Identifier: MIT
pragma solidity 0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


/// @title Contract for ACE Token
/// @author Alfred Varghese Jose
/// @notice Create an ERC20 token for Ace Token Farm Dapp
/// @dev ERC20 Token is created using the OpenZeppelin contracts
contract AceToken is ERC20, ERC20Burnable, Pausable, Ownable {
    constructor() ERC20("Ace Token", "ACE") {
        _mint(msg.sender, 1000000 * 10 ** 18);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }
}