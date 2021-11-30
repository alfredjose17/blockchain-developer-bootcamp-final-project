# Design patterns used

## Access Control Design Patterns

- `Ownable` design pattern used in multiple functions: `mint()`, `pause()` and `unpause()` of AceToken and `issueToken()` of TokenFarm contract. These functions do not need to be used by anyone else apart from the contract creator.

## Inheritance and Interfaces

- AceToken contract inherits the OpenZeppelin `Ownable`, `Pausable`, `ERC20Burnable` and `ERC20` contracts.

## Inter-Contract Execution

- TokenFarm contract calls the `transfer` method from the AceToken contract to send ACE Token rewards and dividends to the investors for staking in the Dapp.
- AceToken contract calls multiple methods from the OpenZeppelin contracts for creating an ERC20 Token.
