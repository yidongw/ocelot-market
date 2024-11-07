import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface UserBalance {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  address: string;
  balance: number;
}

const backendUrl = 'https://p01--rooch-prediction-market-backend--jqzlbjwpw4qd.code.run';

async function fetchUserBalance(address: string): Promise<UserBalance> {
  const response = await fetch(
    `${backendUrl}/api/v1/user-balance/${address}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch balance');
  }
  
  return response.json();
}

export function useUserBalance(address: string | undefined) {
  return useQuery({
    queryKey: ['userBalance', address],
    queryFn: () => fetchUserBalance(address!),
    enabled: !!address, // Only run the query if address exists
    refetchInterval: 10000, // Refetch every 10 seconds
    select: (data) => ({
      ...data,
      formattedBalance: (data.balance / 1e8).toFixed(8)
    })
  });
}

interface AddBalanceRequest {
  address: string;
  amount: number;
}

async function addUserBalance(data: AddBalanceRequest): Promise<UserBalance> {
  const response = await fetch(
    `${backendUrl}/api/v1/user-balance/add`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to add balance');
  }

  return response.json();
}

export function useAddUserBalance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUserBalance,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['userBalance']  // This will invalidate all userBalance queries
      });
    },
  });
}


interface Market {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  title: string;
  description: string;
  yes_amount: number;
  no_amount: number;
  price: number;
  price_no: number;
  vote_yes_amount: number;
  vote_no_amount: number;
  status: string;
  result: boolean;
  judgement_start_at: string;
  judgement_end_at: string;
}


async function fetchMarkets(): Promise<Market[]> {
  const response = await fetch(`${backendUrl}/api/v1/markets`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch markets');
  }
  
  return response.json();
}

export function useMarkets() {
  return useQuery({
    queryKey: ['markets'],
    queryFn: fetchMarkets,
    refetchInterval: 10000, // Refetch every 10 seconds
  });
}

interface TradeRequest {
  address: string;
  market_id: number;
  side: 'buy' | 'sell';
  tick: 'yes' | 'no';
  amount: number;
}

async function createTrade(data: TradeRequest): Promise<void> {
  const response = await fetch(
    `${backendUrl}/api/v1/trade`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to create trade');
  }

  return response.json();
}

export function useCreateTrade() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTrade,
    onSuccess: () => {
      // Invalidate and refetch markets and user balance
      queryClient.invalidateQueries({ queryKey: ['markets'] });
      queryClient.invalidateQueries({ queryKey: ['userBalance'] });
    },
  });
}