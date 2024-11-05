"use client"

import React, { useState, useEffect } from "react"
import { ethers, BrowserProvider } from "ethers"
import { TOKEN_ABI } from "./TokenABI"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"
import { Input } from "./input"
import { Button } from "./button"
import { Loader2, Send, Wallet } from "lucide-react"

const TokenDApp = () => {
  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState("0")
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [txStatus, setTxStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [provider, setProvider] = useState(null)
  const [contract, setContract] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const tokenAddress = process.env.REACT_APP_CONTRACT_ADDRESS

  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0])
        loadBalance(accounts[0]) // Load balance when account changes
      } else {
        setAccount(null)
        setBalance("0")
      }
    }

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged)
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
      }
    }
  }, [])

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new BrowserProvider(window.ethereum);
      try {
        const accounts = await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
  
        setAccount(accounts[0]);
        setProvider(provider);
  
        if (!tokenAddress || !ethers.isAddress(tokenAddress)) {
          setErrorMessage("Invalid contract address.");
          return;
        }
  
        const contract = new ethers.Contract(tokenAddress, TOKEN_ABI, signer);
        setContract(contract);
  
        // Load balance when wallet connects
        await loadBalance(accounts[0]);
      } catch (error) {
        // Check if the error is related to user denying the connection
        if (error.code === 4001) {
          setErrorMessage("Connection request denied. Please allow the connection in MetaMask.");
        } else {
          setErrorMessage("Failed to connect wallet. Please try again.");
        }
      }
    } else {
      setErrorMessage("Please install MetaMask!");
    }
  }  

  const loadBalance = async (accountAddress) => {
    if (contract) {
      try {
        const balance = await contract.balanceOf(accountAddress)
        setBalance(ethers.formatUnits(balance, 18))
      } catch (error) {
        setErrorMessage("Failed to load balance.")
      }
    }
  }

  const transferTokens = async () => {
    if (contract && recipient && amount) {
      setLoading(true)
      setTxStatus("Pending...")
      setErrorMessage(null)
      try {
        const tx = await contract.transfer(
          recipient,
          ethers.parseUnits(amount, 18)
        )
        await tx.wait()
        setTxStatus("Transfer Successful!")
        setRecipient("")
        setAmount("")
        await loadBalance(account) // Update balance after successful transfer
      } catch (error) {
        setTxStatus("Transfer Failed")
        setErrorMessage("Transfer failed. Please check the details and try again.")
      } finally {
        setLoading(false)
      }
    } else {
      setErrorMessage("Please enter recipient and amount.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-blue-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md backdrop-blur-lg bg-white/10 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">My Token DApp</CardTitle>
          <CardDescription className="text-gray-200">Transfer your tokens with ease</CardDescription>
        </CardHeader>
        <CardContent>
          {account ? (
            <div className="space-y-4">
              <div className="bg-white/20 p-4 rounded-lg">
                <p className="text-sm">Connected Account:</p>
                <p className="font-mono text-lg font-extrabold truncate tracking-wider bg-gradient-to-r from-yellow-400 to-green-400 text-transparent bg-clip-text">
                  {account}
                </p>
              </div>
              <div className="bg-white/20 p-4 rounded-lg">
                <p className="text-sm">Token Balance:</p>
                <p className="text-2xl font-bold">{balance}</p>
              </div>
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Recipient Address"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                />
                <Input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                />
              </div>
            </div>
          ) : (
            <Button onClick={connectWallet} className="w-full" variant="outline">
              <Wallet className="mr-2 h-4 w-4" /> Connect MetaMask
            </Button>
          )}
        </CardContent>
        {account && (
          <CardFooter className="flex flex-col items-center space-y-2">
            <Button onClick={transferTokens} className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Tokens
                </>
              )}
            </Button>
            {txStatus && <p className="text-sm font-medium text-green-400">{txStatus}</p>}
            {errorMessage && <p className="text-sm font-medium text-red-400">{errorMessage}</p>}
          </CardFooter>
          )}
      </Card>
    </div>
  )
}

export default TokenDApp
