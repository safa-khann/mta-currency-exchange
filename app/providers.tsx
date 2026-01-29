// app/providers.tsx
'use client'

import { currencyService } from '@/lib/services/currency-service';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        gcTime: 30 * 60 * 1000, // 30 minutes 
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  }))

  // ADD THIS - Prefetch exchange rates when app starts
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['currencyRates'], // Must match useCurrencyRates key
      queryFn: () => currencyService.getAll(),
    });
  }, [queryClient]); // Only runs once


  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}