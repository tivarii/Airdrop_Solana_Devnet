import React from 'react';
import { Airdrops } from './airdrops';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
// import dotenv from 'dotenv';

// dotenv.config();
export default function App() {
    // const url = process.env.RPCURL;
    // console.log("url is ",url);
    return (
        <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/owOHUuMiX-SKnS1Ke5XzeKN54r83iGUI"}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    <WalletMultiButton />
                    <WalletDisconnectButton />
                    <div>
                        <h1>Welcome to the Airdrop App</h1>
                        <Airdrops />
                    </div>
                    { /* Your app's components go here, nested within the context providers. */}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>

    );
}