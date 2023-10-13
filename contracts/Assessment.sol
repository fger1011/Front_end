// SimpleStorage.sol
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private storedValue;


    function set(uint256 newValue) public {
        storedValue = newValue;
    }

    function get() public view returns (uint256) {
        return storedValue;
    }

    function checkBalance() public view returns (uint256) {
        return address(this).balance;
    }

}
