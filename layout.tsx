import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LRRecords MusicNFT | Web3 Music on Polygon',
  description: 'Mint, stream and own music as NFTs on Polygon Amoy. Powered by LRRecords.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
