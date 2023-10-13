# Front End Project
The SimpleStorage contract is a basic example often used in tutorials to demonstrate the fundamentals of smart contracts and to provide a simple use case for understanding how Ethereum smart contracts work. Its primary purpose is to show how to store and retrieve data on the Ethereum blockchain.
## Getting Started
### Executing Program
Using GitPod an integrated development environment (IDE) that operates in the cloud and is closely integrated with Git and GitHub. It's designed to simplify and streamline the development process, making it easier for developers to create, edit, and test code without the need to install and configure software locally on their machines.

```solidity
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


```
```javascript
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [account, setAccount] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [storedValue, setStoredValue] = useState(undefined);
  const [contractBalance, setContractBalance] = useState(undefined);


  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with the actual contract address
  const contractABI = atm_abi.abi;

  useEffect(() => {
    // Check if MetaMask is installed and get the account
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          initContract();
        }
      });
    }
  }, []);

  const initContract = () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Create a contract instance
      const simpleStorageContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      setContract(simpleStorageContract);
      getStoredValue();
    }
  };

  const getStoredValue = async () => {
    if (contract) {
      const value = await contract.get();
      setStoredValue(value.toNumber());
    }
  };

  const setNewValue = async () => {
    if (contract) {
      try {
        const tx = await contract.set(newValue);
        await tx.wait();
        getStoredValue();
      } catch (error) {
        console.error("Error setting new value:", error);
      }
    }
  };

  const checkContractBalance = async () => {
    if (contract) {
      const balance = await contract.checkBalance();
      setContractBalance(balance);
    }
  };
    

  return (
    <main className="container">
      <header>
        <h1>Welcome to Your Simple Storage Dapp</h1>
      </header>
      {account ? (
        <div>
          <p>Your Account: {account}</p>
          <p>Stored Value: {storedValue}</p>
          <p>Contract Balance: {contractBalance ? `${contractBalance} ETH` : 'Loading...'}</p>
          <input
            type="number"
            placeholder="Enter new value"
            onChange={(e) => setNewValue(e.target.value)}
          />
          <button onClick={setNewValue}>Set New Value</button>
          <button onClick={checkContractBalance}>Check Contract Balance</button>
        </div>
      ) : (
        <p>Please install MetaMask and connect your wallet to use this app.</p>
      )}
      <style jsx>{`
        .container {
          text-align: center;
        }
      `}</style>
    </main>
  );
}
```


**Access GitPod:**

Go to the GitPod website at https://metacrafterc-scmstarter-9l1g2uanngq.ws-us105.gitpod.io/.
Create a New File:

##Access the DApp:##

**Connect to Ethereum:**
Before you can interact with the DApp, you need to connect to the Ethereum network. Most DApps use a service like MetaMask for this purpose. You'll need to install a wallet extension or use a mobile wallet and create an Ethereum account.

**Access the DApp Interface:**
Once connected to Ethereum, you can access the DApp's user interface. The interface displays information and controls for interacting with the "SimpleStorage" contract.

**View the Current Stored Value:**
You'll typically see the current stored value from the "SimpleStorage" contract displayed on the DApp's interface. This value is retrieved from the blockchain and is the last value set by the contract owner.


**Set a New Value:**
If the DApp allows you to set a new value, there will be an input field or a form on the interface. You can enter a new value and submit the form. This action triggers a transaction on the Ethereum network to update the stored value in the contract.

**Transaction Confirmation:**
After setting a new value, you'll see a transaction confirmation. This confirms that the transaction has been sent to the Ethereum network. You may need to confirm the transaction in your wallet.

**Transaction Confirmation on the Blockchain Explorer:**
You can track the status of your transaction on an Ethereum blockchain explorer (e.g., Etherscan) by pasting the transaction hash. This provides details about when the transaction is mined and confirmed.

**View the Updated Stored Value:**
After the transaction is confirmed, the DApp's interface updates to display the new stored value from the contract, reflecting the change you made.

**Check Contract Balance (Optional):**
If the DApp provides the option to check the contract's balance, you can do so by clicking a button or link. This action retrieves and displays the amount of Ether held by the "SimpleStorage" contract.

## Authors
Metacrafter Franco
