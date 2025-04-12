// types/pi.d.ts

export interface PiUser {
    uid: string;
    username: string;
  }
  
  export interface PiAuthResult {
    accessToken: string;
    user: PiUser;
  }
  
  export interface PiPaymentCallbacks {
    onIncompletePaymentFound: (payment: any) => void;
    onReadyForServerApproval: (paymentId: string) => void;
    onReadyForServerCompletion: (paymentId: string, txid: string) => void;
    onCancel: (paymentId: string) => void;
    onError: (error: Error) => void;
  }
  
  export interface PiSDK {
    init: (options: { version: string; sandbox: boolean }) => void;
    authenticate: (scopes: string[]) => Promise<PiAuthResult>;
    createPayment: (
      data: { amount: number; memo: string; metadata: any },
      callbacks: PiPaymentCallbacks
    ) => Promise<void>;
  }
  
  // Extend the global window object
  declare global {
    interface Window {
      Pi?: PiSDK;
    }
  }
  