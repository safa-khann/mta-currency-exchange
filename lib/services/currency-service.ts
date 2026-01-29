// lib/services/currencyService.ts
import { apiClient } from '@/lib/api-client'

export interface CurrencyRate {
  id: number
  currency_name: string
  currency_code: string
  country_name: string
  buy_rate: number
  sell_rate: number
  updated_at: string
}

class CurrencyService {
  /**
   * Get all currency rates
   */
  async getAll(): Promise<CurrencyRate[]> {
    const data = await apiClient.get<{ rates: CurrencyRate[] }>('/api/currency-rates')
    return data.rates || []
  }

  /**
   * Add new currency rate
   */
  async add(currency: {
    currency_name: string
    currency_code: string
    country_name: string
    buy_rate: string | number
    sell_rate: string | number
  }): Promise<{ success: boolean; data: any }> {
    return await apiClient.post('/api/currency-rates', {
      ...currency,
      currency_code: currency.currency_code.toUpperCase()
    })
  }

  /**
   * Update currency rate
   */
  async update(updateData: {
    id: number
    buy_rate?: string | number
    sell_rate?: string | number
  }): Promise<{ message: string }> {
    return await apiClient.patch('/api/currency-rates', updateData)
  }
}

// Create a single instance
export const currencyService = new CurrencyService()