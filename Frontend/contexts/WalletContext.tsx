// contexts/WalletContext.tsx
'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { useWallet } from '@/hooks/useWallet'
import { WalletInfo } from '@/services/walletService'
import { ethers } from 'ethers'
import { Wallet } from 'lucide-react'

interface WalletContextType {
  isConnected: boolean
  isConnecting: boolean
  wallet: WalletInfo | null
  error: string | null
  connect: () => Promise<void>
  disconnect: () => void
  switchNetwork: (chainId: number) => Promise<void>
  getFormattedAddress: () => string
  getFormattedBalance: (decimals?: number) => string
  isMetaMaskInstalled: boolean
  getProvider: () => ethers.BrowserProvider | null
  getSigner: () => ethers.JsonRpcSigner | null
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const useWalletContext = () => {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWalletContext must be used within a WalletProvider')
  }
  return context
}

interface WalletProviderProps {
  children: ReactNode
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const walletHook = useWallet()

  return (
    <WalletContext.Provider value={walletHook}>
      {children}
    </WalletContext.Provider>
  )
}

// Higher-order component for pages that require wallet connection
export const withWalletRequired = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const WrappedComponent = (props: P) => {
    const { isConnected, connect, isConnecting } = useWalletContext()

    if (!isConnected) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Connect Your Wallet
            </h2>
            <p className="text-gray-600 mb-6">
              You need to connect your wallet to access this page.
            </p>
            <button
              onClick={connect}
              disabled={isConnecting}
              className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          </div>
        </div>
      )
    }

    return <Component {...props} />
  }

  WrappedComponent.displayName = `withWalletRequired(${Component.displayName || Component.name})`

  return WrappedComponent
}