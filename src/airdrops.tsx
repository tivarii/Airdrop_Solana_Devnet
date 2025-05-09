import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import React from "react";
export function Airdrops(){
    const wallet = useWallet();
    const inputRef = React.useRef<HTMLInputElement>(null);
    const {connection} = useConnection();
    const handleAirdrop = async () => {
        if (inputRef.current && wallet.publicKey) {
            const amount = inputRef.current.value;
            const publicKey = wallet.publicKey;
            const transaction = await connection.requestAirdrop(publicKey, Number(amount)*100000000);
            console.log(transaction);
            alert(`Airdrop of ${amount} SOL requested to ${publicKey.toString()}`);
        }
    }
    return(
        <div>
            <input type="text" placeholder="enter the amount"  ref= {inputRef}/>
            <button onClick={handleAirdrop}>Airdrop</button>
            <div>
                {JSON.stringify(wallet.publicKey)}
            </div>
        </div>
    )
}