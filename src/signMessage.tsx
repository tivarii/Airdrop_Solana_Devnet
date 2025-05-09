"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { ed25519 } from "@noble/curves/ed25519"
import bs58 from "bs58"
import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Copy, Loader2, MessageSquare } from "lucide-react"

export default function SignMessage() {
  const { publicKey, signMessage } = useWallet()
  const [message, setMessage] = useState("")
  const [signature, setSignature] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleSign = async () => {
    if (publicKey && signMessage && message) {
      try {
        setIsLoading(true)
        const encodedMessage = new TextEncoder().encode(message)
        const signature = await signMessage(encodedMessage)

        // Verify the signature
        if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) {
          throw new Error("Message signature invalid!")
        }

        setSignature(bs58.encode(signature))
      } catch (error) {
        console.error("Error signing message:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const copyToClipboard = () => {
    if (signature) {
      navigator.clipboard.writeText(signature)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md">
        <div className="relative mb-6">
          <textarea
            placeholder="Enter your message to sign"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 focus:border-pink-500 rounded-xl text-white placeholder-gray-500 outline-none transition-all duration-300 focus:ring-2 focus:ring-pink-500/30 resize-none"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSign}
          disabled={!publicKey || !signMessage || !message || isLoading}
          className={`w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
            !publicKey || !signMessage || !message || isLoading
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-900/30 hover:shadow-pink-600/40"
          }`}
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <MessageSquare className="w-5 h-5" />}
          {isLoading ? "Signing..." : "Sign Message"}
        </motion.button>

        {!publicKey && <p className="mt-4 text-center text-sm text-red-400">Please connect your wallet first</p>}

        {signature && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-pink-400 text-sm">Signature</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={copyToClipboard}
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </motion.button>
            </div>
            <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700 break-all">
              <p className="text-xs text-gray-300 font-mono">{signature}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
