// hooks/useWallet.ts
import { useState, useEffect, useCallback } from 'react';
import { walletService, WalletInfo, WalletState } from '../services/walletService';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useWallet = () => {
  const [state, setState] = useState<WalletState>({
    isConnected: false,
    isConnecting: false,
    wallet: null,
    error: null,
  });

  // Connect wallet function
  const connect = useCallback(async () => {
    setState(prev => ({ ...prev, isConnecting: true, error: null }));

    try {
      const walletInfo = await walletService.connectWallet();
      setState({
        isConnected: true,
        isConnecting: false,
        wallet: walletInfo,
        error: null,
      });
    } catch (error: any) {
      setState({
        isConnected: false,
        isConnecting: false,
        wallet: null,
        error: error.message,
      });
    }
  }, []);

  // Disconnect wallet function
  const disconnect = useCallback(() => {
    walletService.disconnect();
    setState({
      isConnected: false,
      isConnecting: false,
      wallet: null,
      error: null,
    });
  }, []);

  // Check for existing connection on mount
  useEffect(() => {
    const checkExistingConnection = async () => {
      try {
        const walletInfo = await walletService.checkConnection();
        if (walletInfo) {
          setState({
            isConnected: true,
            isConnecting: false,
            wallet: walletInfo,
            error: null,
          });
        }
      } catch (error) {
        console.error('Error checking existing connection:', error);
      }
    };

    checkExistingConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnect();
      } else {
        // Refresh wallet info
        connect();
      }
    };

    const handleChainChanged = () => {
      // Refresh wallet info when chain changes
      if (state.isConnected) {
        connect();
      }
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [state.isConnected, connect, disconnect]);

  // Switch network function
  const switchNetwork = useCallback(async (chainId: number) => {
    setState(prev => ({ ...prev, error: null }));

    try {
      await walletService.switchNetwork(chainId);
      // Refresh wallet info after network switch
      if (state.isConnected) {
        const walletInfo = await walletService.checkConnection();
        if (walletInfo) {
          setState(prev => ({ ...prev, wallet: walletInfo }));
        }
      }
    } catch (error: any) {
      setState(prev => ({ ...prev, error: error.message }));
    }
  }, [state.isConnected]);

  // Get formatted address
  const getFormattedAddress = useCallback(() => {
    if (!state.wallet?.address) return '';
    return walletService.formatAddress(state.wallet.address);
  }, [state.wallet?.address]);

  // Get formatted balance
  const getFormattedBalance = useCallback((decimals?: number) => {
    if (!state.wallet?.balance) return '0';
    return walletService.formatBalance(state.wallet.balance, decimals);
  }, [state.wallet?.balance]);

  return {
    // State
    isConnected: state.isConnected,
    isConnecting: state.isConnecting,
    wallet: state.wallet,
    error: state.error,

    // Actions
    connect,
    disconnect,
    switchNetwork,

    // Utils
    getFormattedAddress,
    getFormattedBalance,
    isMetaMaskInstalled: walletService.isMetaMaskInstalled(),

    // Direct access to service
    getProvider: walletService.getProvider.bind(walletService),
    getSigner: walletService.getSigner.bind(walletService),
  };
};