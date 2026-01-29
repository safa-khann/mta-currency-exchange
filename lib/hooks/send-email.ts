// lib/hooks/useOrderEmail.ts
import { useMutation } from '@tanstack/react-query'
import { sendOrderEmail, SendOrderResponse } from '../services/email-service'

export const useOrderEmail = () => {
  return useMutation<SendOrderResponse, Error, any>({
    mutationFn: sendOrderEmail,
    onSuccess: (data) => {
      console.log('Order email sent:', data.message)
    },
    onError: (error) => {
      console.error('Failed to send order email:', error)
    }
  })
}