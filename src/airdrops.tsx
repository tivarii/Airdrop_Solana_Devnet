"use client"

import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown, Loader2 } from "lucide-react"

export function Airdrops() {
  const wallet = useWallet()
  const { connection } = useConnection()
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [transactionId, setTransactionId] = useState("")

  const handleAirdrop = async () => {
    if (wallet.publicKey && amount) {
      try {
        setIsLoading(true)
        setTransactionId("")
        const transaction = await connection.requestAirdrop(wallet.publicKey, Number(amount) * 100000000)
        setTransactionId(transaction)
        setAmount("")
      } catch (error) {
        console.error("Airdrop error:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md">
        <div className="relative mb-6">
          <input
            type="number"
            placeholder="Enter SOL amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 focus:border-purple-500 rounded-xl text-white placeholder-gray-500 outline-none transition-all duration-300 focus:ring-2 focus:ring-purple-500/30"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">SOL</div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleAirdrop}
          disabled={!wallet.publicKey || !amount || isLoading}
          className={`w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
            !wallet.publicKey || !amount || isLoading
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-900/30 hover:shadow-purple-600/40"
          }`}
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowDown className="w-5 h-5" />}
          {isLoading ? "Processing..." : "Request Airdrop"}
        </motion.button>

        {!wallet.publicKey && <p className="mt-4 text-center text-sm text-red-400">Please connect your wallet first</p>}

        {transactionId && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 rounded-xl bg-green-900/20 border border-green-700/30"
          >
            <p className="text-green-400 text-sm mb-1">Airdrop requested successfully!</p>
            <p className="text-gray-400 text-xs break-all">Transaction ID: {transactionId}</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
