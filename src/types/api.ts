export interface ApiMeta {
  page?: number;
  per_page?: number;
  total_pages?: number;
  total?: number;
  [key: string]: unknown;
}

export interface ApiErrorShape {
  status: 'error' | string;
  code?: number;
  message?: string;
  data?: unknown;
}

export interface ApiSuccessShape<T> {
  status: 'success' | 'ok' | string;
  message?: string;
  data: T;
  meta?: ApiMeta;
}

export type QuidaxApiEnvelope<T> = ApiSuccessShape<T>;

// Common entities (best-effort, extend as needed)
export interface SubAccount {
  id: string;
  email: string;
  firstname?: string;
  lastname?: string;
  phone_number?: string;
  [key: string]: unknown;
}

export interface WalletAddress {
  currency: string;
  address: string;
  network?: string;
  [key: string]: unknown;
}

export interface MarketTicker {
  at?: number;
  buy?: string;
  sell?: string;
  low?: string;
  high?: string;
  open?: string;
  last?: string;
  volume?: string;
  [key: string]: unknown;
}

export interface InstantOrder {
  id: string;
  market: string;
  bid?: string;
  ask?: string;
  type: 'buy' | 'sell';
  volume: string;
  state?: string;
  [key: string]: unknown;
}

export interface DepositRecord {
  id: string;
  currency: string;
  amount: string;
  state: string;
  created_at?: string;
  [key: string]: unknown;
}

export interface SwapTransaction {
  id: string;
  from_currency: string;
  to_currency: string;
  from_amount: string;
  to_amount?: string;
  state?: string;
  [key: string]: unknown;
}
