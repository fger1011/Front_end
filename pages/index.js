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
