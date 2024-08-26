import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import contractABI from './abis/Flipper.json';
import './Flipper.css';

const contractAddress = "0x0319a27483A22578Bf2A52D34e2e4c71fFAbf489";

function Flipper() {
    const [account, setAccount] = useState(null);
    const [flipResult, setFlipResult] = useState('');
    const [coinState, setCoinState] = useState('');

    const requestAccount = async () => {
        try {
            const [selectedAccount] = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(selectedAccount);
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
        }
    };

    const getCurrentState = async () => {
        if (!window.ethereum) return alert('Please install MetaMask.');
        if (!account) return alert('Please connect to MetaMask.');

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, contractABI.abi, provider);

        try {
            const state = await contract.getCurrentFlip();
            setCoinState(state);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to fetch the current state!');
        }
    };

    return (
        <div className="flipper-container">
            <button onClick={requestAccount} className="connect-button">
                {account ? 'Connected' : 'Connect to MetaMask'}
            </button>
            <button onClick={getCurrentState} className="status-button">
                View Current Status
            </button>
            <div className="status-display">{coinState}</div>
            {flipResult && <p>Result: {flipResult}</p>}
        </div>
    );
}

export default Flipper;