'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Menu, X, User, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-2 hover:bg-primary/10 hover:text-primary">
              <Wallet className="w-4 h-4" />
              <span>Connect</span>
            </Button>
            
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
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10 hover:text-primary">
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
