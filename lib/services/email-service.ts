// lib/email-service.ts
import { apiClient } from "../api-client"

interface OrderItem {
  currency_name: string;
  currency_code: string;
  transaction_type: 'buy' | 'sell';
  gbp_amount: number;
  foreign_amount: number;
  exchange_rate: number;
}
interface OrderData {
  customer_title: string
  first_name: string
  last_name: string
  email: string
  mobile: string
  branch_name: string
  payment_method:string;
  notes?: string
  items: OrderItem[]
}

export interface SendOrderResponse {
  success: boolean
  message: string
}

export async function sendOrderEmail(orderData: OrderData): Promise<SendOrderResponse> {
  try {
    const response = await apiClient.post<SendOrderResponse>('/api/send-order', orderData)
    return response
  } catch (error: any) {
    console.error('Failed to send order email:', error)
    throw new Error(error.message || 'Failed to send order confirmation')
  }
}