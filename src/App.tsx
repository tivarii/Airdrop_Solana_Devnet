"use client"

import { useState } from "react"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import "@solana/wallet-adapter-react-ui/styles.css"
import { Airdrops } from "./airdrops"
import Amount from "./amount"
import SignMessage from "./signMessage"
import { motion } from "framer-motion"
import { Sparkles, Wallet, ArrowDown, MessageSquare } from "lucide-react"

export default function App() {
  const [activeTab, setActiveTab] = useState("airdrop")

  return (
    <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/owOHUuMiX-SKnS1Ke5XzeKN54r83iGUI"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-4xl"
            >
              <header className="mb-8 flex flex-col items-center">
                <motion.div
                  className="flex items-center gap-2 mb-2"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    repeatDelay: 5,
                  }}
                >
                  <Sparkles className="text-purple-400 h-8 w-8" />
                  <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                    Solana Wallet
                  </h1>
                  <Sparkles className="text-purple-400 h-8 w-8" />
                </motion.div>

                <div className="flex gap-4 mt-4 w-full justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative z-10">
                    <WalletMultiButton className="!bg-gradient-to-r from-purple-600 to-blue-600 !rounded-xl !px-6 !py-3 !transition-all !duration-300 !shadow-lg !shadow-purple-900/30 hover:!shadow-purple-600/40" />
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative z-10">
                    <WalletDisconnectButton className="!bg-gradient-to-r from-red-600 to-pink-600 !rounded-xl !px-6 !py-3 !transition-all !duration-300 !shadow-lg !shadow-red-900/30 hover:!shadow-red-600/40" />
                  </motion.div>
                </div>
              </header>

              <motion.div
                className="grid grid-cols-3 gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab("airdrop")}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 ${
                    activeTab === "airdrop"
                      ? "bg-gradient-to-br from-purple-900/80 to-purple-800/50 border border-purple-500/50 shadow-lg shadow-purple-500/20"
                      : "bg-gray-800/50 border border-gray-700/50 hover:border-purple-500/30"
                  }`}
                >
                  <ArrowDown
                    className={`h-6 w-6 mb-2 ${activeTab === "airdrop" ? "text-purple-400" : "text-gray-400"}`}
                  />
                  <span className={activeTab === "airdrop" ? "text-purple-300" : "text-gray-300"}>Airdrop</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab("balance")}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 ${
                    activeTab === "balance"
                      ? "bg-gradient-to-br from-cyan-900/80 to-cyan-800/50 border border-cyan-500/50 shadow-lg shadow-cyan-500/20"
                      : "bg-gray-800/50 border border-gray-700/50 hover:border-cyan-500/30"
                  }`}
                >
                  <Wallet className={`h-6 w-6 mb-2 ${activeTab === "balance" ? "text-cyan-400" : "text-gray-400"}`} />
                  <span className={activeTab === "balance" ? "text-cyan-300" : "text-gray-300"}>Balance</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab("sign")}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 ${
                    activeTab === "sign"
                      ? "bg-gradient-to-br from-pink-900/80 to-pink-800/50 border border-pink-500/50 shadow-lg shadow-pink-500/20"
                      : "bg-gray-800/50 border border-gray-700/50 hover:border-pink-500/30"
                  }`}
                >
                  <MessageSquare
                    className={`h-6 w-6 mb-2 ${activeTab === "sign" ? "text-pink-400" : "text-gray-400"}`}
                  />
                  <span className={activeTab === "sign" ? "text-pink-300" : "text-gray-300"}>Sign Message</span>
                </motion.button>
              </motion.div>

              <motion.div
                className="bg-gray-900/70 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {activeTab === "airdrop" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                      Request SOL Airdrop
                    </h2>
                    <Airdrops />
                  </motion.div>
                )}

                {activeTab === "balance" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                      Your SOL Balance
                    </h2>
                    <Amount />
                  </motion.div>
                )}

                {activeTab === "sign" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
                      Sign a Message
                    </h2>
                    <SignMessage />
                  </motion.div>
                )}
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-8 text-sm text-gray-500 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Connected to Solana Devnet
            </motion.div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
