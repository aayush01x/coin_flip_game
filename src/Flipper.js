import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import contractABI from './abis/Flipper.json';
import './Flipper.css';  // Assuming you have a separate CSS file for Flipper

const contractAddress = "0x0319a27483A22578Bf2A52D34e2e4c71fFAbf489";

function Flipper() {
    const [account, setAccount] = useState(null);
    const [flipResult, setFlipResult] = useState('');
    const [isFlipping, setIsFlipping] = useState(false);

    const requestAccount = async () => {
        try {
            const [selectedAccount] = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(selectedAccount);
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
        }
    };

    const flipCoin = async () => {
        if (!window.ethereum) return alert('Please install MetaMask.');
        if (!account) return alert('Please connect to MetaMask.');

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);

        setIsFlipping(true);
        try {
            const transactionResponse = await contract.flipCoin();
            const receipt = await transactionResponse.wait();
            const flipEvent = receipt.events?.filter((x) => x.event === 'CoinFlipped')[0];
            setFlipResult(flipEvent.args.result ? 'Heads' : 'Tails');
            setIsFlipping(false);
        } catch (error) {
            console.error('Error:', error);
            alert('Transaction failed!');
            setIsFlipping(false);
        }
    };

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_accounts' })
                .then(accounts => {
                    if (accounts.length > 0) {
                        setAccount(accounts[0]);
                    }
                });
        }
    }, []);

    return (
        <div className="flipper-container">
            <button onClick={requestAccount} className="connect-button">
                {account ? 'Connected' : 'Connect to MetaMask'}
            </button>
            <button onClick={flipCoin} disabled={!account} className="flip-button">
                {isFlipping ? 'Flipping...' : 'Flip Coin'}
            </button>
            {flipResult && <div className="result-display">{flipResult}</div>}
        </div>
    );
}

export default Flipper;