'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Menu, X, User, Wallet, ChevronDown, Copy, ExternalLink, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useWallet } from '@/hooks/useWallet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const {
    isConnected,
    isConnecting,
    wallet,
    error,
    connect,
    disconnect,
    getFormattedAddress,
    getFormattedBalance,
    isMetaMaskInstalled
  } = useWallet()

  const handleConnect = async () => {
    if (!isMetaMaskInstalled) {
      toast.error('MetaMask is not installed. Please install MetaMask to continue.')
      return
    }

    await connect()
  }

  const handleDisconnect = () => {
    disconnect()
    toast.success('Wallet disconnected')
  }

  const copyAddress = async () => {
    if (wallet?.address) {
      await navigator.clipboard.writeText(wallet.address)
      toast.success('Address copied to clipboard')
    }
  }

  const openEtherscan = () => {
    if (wallet?.address) {
      window.open(`https://etherscan.io/address/${wallet.address}`, '_blank')
    }
  }

  return (
    <motion.header
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-100"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FD</span>
            </div>
            <span className="font-semibold text-lg text-neutral-900">FilData</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/discover" className="text-neutral-900 hover:text-primary transition-colors">
              Discover
            </Link>
            <Link href="/publish" className="text-neutral-900 hover:text-primary transition-colors">
              Publish
            </Link>
            <Link href="/about" className="text-neutral-900 hover:text-primary transition-colors">
              How it Works
            </Link>
            <Link href="/faq" className="text-neutral-900 hover:text-primary transition-colors">
              FAQ
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <Input
                placeholder="Search datasets..."
                className="pl-10 bg-neutral-100/50 border-0 focus:bg-white"
              />
            </div>
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {!isConnected ? (
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex items-center space-x-2 hover:bg-primary/10 hover:text-primary"
                onClick={handleConnect}
                disabled={isConnecting}
              >
                <Wallet className="w-4 h-4" />
                <span>{isConnecting ? 'Connecting...' : 'Connect'}</span>
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden md:flex items-center space-x-2 hover:bg-primary/10 hover:text-primary"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-mono text-sm">{getFormattedAddress()}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <div className="px-3 py-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-neutral-900 truncate">
                          {getFormattedAddress()}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {getFormattedBalance()} ETH
                        </p>
                      </div>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={copyAddress} className="cursor-pointer">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Address
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={openEtherscan} className="cursor-pointer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Etherscan
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleDisconnect} className="cursor-pointer text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-neutral-100 py-4"
          >
            <nav className="flex flex-col space-y-4">
              <Link href="/discover" className="text-neutral-900 hover:text-primary transition-colors">
                Discover
              </Link>
              <Link href="/publish" className="text-neutral-900 hover:text-primary transition-colors">
                Publish
              </Link>
              <Link href="/about" className="text-neutral-900 hover:text-primary transition-colors">
                How it Works
              </Link>
              <Link href="/faq" className="text-neutral-900 hover:text-primary transition-colors">
                FAQ
              </Link>
              <div className="pt-4 border-t border-neutral-100">
                {!isConnected ? (
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-primary/10 hover:text-primary"
                    onClick={handleConnect}
                    disabled={isConnecting}
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <div className="px-3 py-2 bg-neutral-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="font-mono text-sm">{getFormattedAddress()}</span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-1">

                        {getFormattedBalance()} ETH
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-red-600 hover:bg-red-50"
                      onClick={handleDisconnect}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Disconnect
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}