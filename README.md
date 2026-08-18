# 🎵 LRRecords Web3 MusicNFT SaaS

Open-source, free-to-deploy Music NFT platform for **lrrecords.com.au**.

Built on:
- **Polygon Amoy testnet** (zero gas for testing)
- **Pinata IPFS** (free tier for metadata + audio)
- **Next.js 14** + Ethers.js + Zora SDK
- Deployable to **Vercel / Netlify / Replit** for free

## Features (Phase 1 – Ready)
- Connect MetaMask / Coinbase / OKX / Phantom (via WalletConnect-ready)
- Upload audio + artwork → Pinata IPFS
- Mint ERC-721 Music NFT on Polygon Amoy
- Simple marketplace listing (OpenSea-compatible metadata)
- Survey embed + feedback loop ready

## Quick Start

```bash
git clone https://github.com/lrrecords/lrrecords-web3-musicnft.git
cd lrrecords-web3-musicnft
npm install
cp .env.example .env.local
# Fill in PINATA_JWT and NEXT_PUBLIC_POLYGON_AMOY_RPC
npm run dev
```

## Environment Variables

```env
# Pinata (https://app.pinata.cloud → API Keys)
PINATA_JWT=your_jwt_here
NEXT_PUBLIC_PINATA_GATEWAY=https://gateway.pinata.cloud/ipfs/

# Polygon Amoy
NEXT_PUBLIC_POLYGON_AMOY_RPC=https://rpc-amoy.polygon.technology
NEXT_PUBLIC_CHAIN_ID=80002

# Optional – Zora / OpenSea later
NEXT_PUBLIC_ZORA_API_KEY=
```

## Deploy (Free)

1. Push to GitHub
2. Import to [Vercel](https://vercel.com) → Framework Preset: Next.js
3. Add the env vars
4. Deploy → point `nft.lrrecords.com.au` (or subdomain) via your domain DNS

## Next Phases (from roadmap)
- Embed Spinamp / Audius / Nina players
- Token-gated exclusives (Unlock Protocol)
- Survey + Google Forms feedback loop
- Move to Polygon Mainnet + real royalties
- Discord + Lens community hub

## License
MIT – free for LRRecords and open-source community use.
