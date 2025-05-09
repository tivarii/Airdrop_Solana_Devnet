"use client"

import { useEffect, useState } from "react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { motion } from "framer-motion"
import { RefreshCw } from "lucide-react"

export default function Amount() {
  const wallet = useWallet()
  const { connection } = useConnection()
  const [amount, setAmount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)

  const getBalance = async () => {
    if (wallet.publicKey) {
      try {
        setIsLoading(true)
        const balance = await connection.getBalance(wallet.publicKey)
        setAmount(balance / LAMPORTS_PER_SOL)
      } catch (error) {
        console.error("Error fetching balance:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    getBalance()
    // Set up an interval to refresh the balance every 30 seconds
    const interval = setInterval(() => {
      if (wallet.publicKey) {
        getBalance()
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [wallet.publicKey, connection])

  return (
    <div className="flex flex-col items-center">
      {!wallet.publicKey ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-6 rounded-xl bg-gray-800/50 border border-gray-700 text-center w-full"
        >
          <p className="text-gray-400">Connect your wallet to view balance</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-400">Current Balance</h3>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 20 }}
              whileTap={{ scale: 0.9 }}
              onClick={getBalance}
              disabled={isLoading}
              className="text-cyan-400 p-2 rounded-full hover:bg-cyan-900/20 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </motion.button>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-700/30 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.5,
                repeat: 5,
                repeatType: "reverse",
                repeatDelay: 5,
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-cyan-400 rounded-full blur-xl opacity-20"></div>
              <div className="relative text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                {amount.toFixed(4)}
              </div>
            </motion.div>
          </div>

          <div className="mt-2 text-center text-sm text-cyan-300">SOL</div>
        </motion.div>
      )}
    </div>
  )
}
