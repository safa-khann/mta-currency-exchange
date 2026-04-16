// lib/hooks/useCurrency.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { currencyService } from '../services/currency-service';
import { sendOrderEmail, SendOrderResponse } from '../services/email-service';

// Query Keys - Keep them consistent
export const currencyKeys = {
  all: ['currencyRates'] as const,
  details: () => [...currencyKeys.all, 'detail'] as const,
  detail: (id: number) => [...currencyKeys.details(), id] as const,
};

// Fetch all currency rates
export const useCurrencyRates = () => {
  return useQuery({
    queryKey: currencyKeys.all, // ['currencyRates']
    queryFn: () => currencyService.getAll(),
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Cache persists for 10 minutes
  });
};

// Add a new currency rate
export const useAddCurrencyRate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: currencyService.add,
    onSuccess: () => {
      // Invalidate the rates query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: currencyKeys.all });
    },
  });
};

// Update an existing currency rate
export const useUpdateCurrencyRate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: currencyService.update,
    onSuccess: (data, variables) => {
      // Invalidate all rates and specific rate
      queryClient.invalidateQueries({ queryKey: currencyKeys.all });
      queryClient.invalidateQueries({ 
        queryKey: currencyKeys.detail(variables.id) 
      });
    },
  });
};

export const useOrderEmail = () => {
  return useMutation<SendOrderResponse, Error, any>({
    mutationFn: sendOrderEmail,
    onSuccess: (data) => {
      // console.log('Order email sent:', data.message)
    },
    onError: (error) => {
      console.error('Failed to send order email:', error)
    }
  })
}