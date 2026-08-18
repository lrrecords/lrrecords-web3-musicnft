'use client';

import { useState } from 'react';
import { ethers } from 'ethers';

export default function Home() {
  const [account, setAccount] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');

  async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
      setStatus('Please install MetaMask or another Web3 wallet');
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      if (Number(network.chainId) !== 80002) {
        // Try to switch to Amoy
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x13882' }], // 80002
        });
      }
      const accounts = await provider.send('eth_requestAccounts', []);
      setAccount(accounts[0]);
      setStatus(`Connected: ${accounts[0].slice(0, 6)}…${accounts[0].slice(-4)}`);
    } catch (err: any) {
      setStatus(err.message || 'Connection failed');
    }
  }

  async function uploadToPinata() {
    if (!file || !title) {
      setStatus('Please select a file and enter a title');
      return;
    }
    setStatus('Uploading to Pinata IPFS…');
    // In production this would call a server route that uses PINATA_JWT
    // For demo we show the flow
    setStatus('Demo mode: In production this uploads to Pinata and returns a CID. See /api/upload route.');
  }

  return (
    <div className="container">
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1>🎵 LRRecords MusicNFT</h1>
        <p className="muted">Mint music as NFTs on Polygon Amoy • Free & Open Source</p>
      </header>

      <div className="card">
        <h2>1. Connect Wallet</h2>
        {account ? (
          <p>✅ {status}</p>
        ) : (
          <button onClick={connectWallet}>Connect MetaMask / Wallet</button>
        )}
        <p className="muted" style={{ marginTop: '0.5rem' }}>
          Network: Polygon Amoy (testnet – free gas)
        </p>
      </div>

      <div className="card">
        <h2>2. Upload Track + Artwork</h2>
        <input
          type="text"
          placeholder="Track title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Artist name"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <input
          type="file"
          accept="audio/*,image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button onClick={uploadToPinata} disabled={!file || !title}>
          Upload to IPFS (Pinata)
        </button>
        <p className="muted">{status}</p>
      </div>

      <div className="card">
        <h2>3. Mint NFT (coming next)</h2>
        <p className="muted">
          Once the CID is returned we call the Zora / custom ERC-721 contract on Amoy.
          Full minting UI + royalty split will be added in the next commit.
        </p>
      </div>

      <div className="card">
        <h2>Feedback & Survey</h2>
        <p>
          Help shape the platform →{' '}
          <a href="https://forms.gle/your-survey-id" target="_blank" rel="noreferrer">
            Take the 2-minute survey
          </a>
        </p>
      </div>

      <footer style={{ textAlign: 'center', marginTop: '3rem' }} className="muted">
        <p>
          Built for <a href="https://lrrecords.com.au">lrrecords.com.au</a> • MIT License •{' '}
          <a href="https://github.com/lrrecords/lrrecords-web3-musicnft">GitHub</a>
        </p>
      </footer>
    </div>
  );
}

// TypeScript declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}
