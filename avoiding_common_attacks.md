# Contract security measures

## SWC-103 (Floating pragma)

Specific compiler pragma `0.8.2` used in contracts to avoid accidental bug inclusion through outdated compiler versions.

## Proper Use of Require, Assert and Revert 

Used in `issueToken` and `recieveEther` methods in the TokenFarm contract, so that certain conditions gets satisfied before executing the functions. They are also used for coding unit tests.

## SWC-107 (Reentrancy)

The Checks-Effects-Interactions pattern is being used for `sendEther` method in TokenFarm contract.

## SWC-115 (tx.origin auth)

The contracts use msg.sender everywhere.

## Pull over push

All functions that modify state are based on receiving calls rather than making contract calls.

