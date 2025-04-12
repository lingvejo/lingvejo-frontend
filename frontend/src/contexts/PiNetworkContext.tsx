'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { signinVoyager } from '@/utils/data/mutations/signinVoyager';
import { logIncompletePayment } from '@/utils/data/mutations/logIncompletePayment';
import { approvePayment } from '@/utils/data/mutations/approvePayment';
import { completePayment } from '@/utils/data/mutations/completePayment';
import { cancelPayment } from '@/utils/data/mutations/cancelPayment';
import {
  PiUser,
  PiAuthResult,
  PiPaymentCallbacks,
} from '@/types/pi';

interface PaymentMetadata {
  [key: string]: any;
}

interface PiNetworkContextType {
  user: PiUser | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  createPayment: (
    memo: string,
    amount: number,
    metadata: PaymentMetadata
  ) => Promise<void>;
  loading: boolean;
}

const PiNetworkContext = createContext<PiNetworkContextType>({
  user: null,
  signIn: async () => {},
  signOut: async () => {},
  createPayment: async () => {},
  loading: true,
});

export const PiNetworkProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<PiUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('[Pi] Injecting Pi SDK...');
    const script = document.createElement('script');
    script.src = 'https://sdk.minepi.com/pi-sdk.js';
    script.async = true;

    script.onload = () => {
      console.log('[Pi] SDK loaded');
      const sandbox = process.env.NEXT_PUBLIC_PI_SANDBOX_SDK === 'true';
      const tryInit = () => {
        if (window.Pi) {
          console.log('[Pi] Initializing SDK (sandbox:', sandbox, ')');
          window.Pi.init({ version: '2.0', sandbox });
          setLoading(false);
        } else {
          console.log('[Pi] SDK not ready, retrying...');
          setTimeout(tryInit, 500);
        }
      };
      tryInit();
    };

    document.head.appendChild(script);
    return () => {
      console.log('[Pi] Removing SDK');
      document.head.removeChild(script);
    };
  }, []);

  const signIn = async () => {
    console.log('[Pi] Attempting sign-in...');
    if (!window.Pi) {
      console.warn('[Pi] Pi SDK not available for sign-in');
      return;
    }

    try {
      const scopes = ['username', 'payments'];
      const authResult: PiAuthResult = await window.Pi.authenticate(scopes);
      console.log('[Pi] Auth successful:', authResult);
      setUser(authResult.user);

      console.log('[Pi] Registering voyager in backend...');
      await signinVoyager(authResult.user.uid, authResult.user.username);
      console.log('[Pi] Voyager registered');
    } catch (error) {
      console.error('[Pi] Sign-in error:', error);
    }
  };

  const signOut = async () => {
    console.log('[Pi] Signing out...');
    setUser(null);
  };

  const createPayment = async (
    memo: string,
    amount: number,
    metadata: PaymentMetadata
  ) => {
    if (!window.Pi) {
      console.warn('[Pi] SDK not available to create payment');
      return;
    }
    if (!user) {
      console.warn('[Pi] User not signed in');
      return;
    }

    const callbacks: PiPaymentCallbacks = {
      onIncompletePaymentFound: async (payment: any) => {
        console.log('[Pi] Incomplete payment found:', payment);
        await logIncompletePayment(payment);
      },
      onReadyForServerApproval: async (paymentId: string) => {
        console.log('[Pi] Ready for server approval, paymentId:', paymentId);
        await approvePayment(paymentId);
        console.log('[Pi] Payment approved by server');
      },
      onReadyForServerCompletion: async (paymentId: string, txid: string) => {
        console.log(
          '[Pi] Ready for server completion, paymentId:',
          paymentId,
          'txid:',
          txid
        );
        await completePayment(paymentId, txid);
        console.log('[Pi] Payment completed');
      },
      onCancel: async (paymentId: string) => {
        console.log('[Pi] Payment was cancelled by user, paymentId:', paymentId);
        await cancelPayment(paymentId);
        console.log('[Pi] Payment marked as cancelled');
      },
      onError: (error: Error) => {
        console.error('[Pi] Payment error occurred:', error);
      },
    };

    try {
      console.log(
        '[Pi] Creating payment with memo:',
        memo,
        'amount:',
        amount,
        'metadata:',
        metadata
      );
      await window.Pi.createPayment(
        {
          amount,
          memo,
          metadata,
        },
        callbacks
      );
      console.log('[Pi] Payment creation flow started');
    } catch (error) {
      console.error('[Pi] createPayment failed:', error);
    }
  };

  return (
    <PiNetworkContext.Provider
      value={{ user, signIn, signOut, createPayment, loading }}
    >
      {children}
    </PiNetworkContext.Provider>
  );
};

export const usePiNetwork = () => useContext(PiNetworkContext);
