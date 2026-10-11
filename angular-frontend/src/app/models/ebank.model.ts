export interface Customer {
  id: number;
  name: string;
  email: string;
}

export interface BankAccount {
  id: string;
  balance: number;
  createdAt: string;
  type: 'CURRENT_ACCOUNT' | 'SAVING_ACCOUNT';
  customerId: number;
  customer?: Customer;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}
