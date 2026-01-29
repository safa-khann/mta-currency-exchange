'use client'

import TabContent, { CurrencyRate, Message, TabType } from '@/components/TabsComponent'
import { currencyService } from '@/lib/services/currency-service'
import { useState, useEffect, useRef } from 'react'
import { signOut } from 'next-auth/react'
import { useAddCurrencyRate, useCurrencyRates, useUpdateCurrencyRate } from '@/lib/hooks/useCurrency'

export default function CurrencyRatesManager() {
  const [activeTab, setActiveTab] = useState<TabType>('view')
  // const [rates, setRates] = useState<CurrencyRate[]>([])
  const [loading, setLoading] = useState(false)
  const [updatingId, setUpdatingId] = useState<number | null>(null)
  const [message, setMessage] = useState<Message>({ type: '', text: '' })
   const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { 
    data: rates = [], 
    isLoading: ratesLoading, 
    refetch: refetchRates 
  } = useCurrencyRates()

  const addCurrencyMutation = useAddCurrencyRate()
  const updateCurrencyMutation = useUpdateCurrencyRate()
  useEffect(() => {
    clearMessage()
    setActiveTab('view')
  }, [])

  // Auto-dismiss messages after 5 seconds
  useEffect(() => {
    if (message.text) {
      // Clear any existing timeout
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current)
      }
      
      // Set new timeout
      messageTimeoutRef.current = setTimeout(() => {
        clearMessage()
      }, 5000)
    }
    
    // Cleanup
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current)
      }
    }
  }, [message.text])

  // Helper to clear message
  const clearMessage = () => {
    setMessage({ type: '', text: '' })
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current)
      messageTimeoutRef.current = null
    }
  }


  // Add form state
  const [addForm, setAddForm] = useState({
    currency_name: '',
    currency_code: '',
    country_name: '',
    buy_rate: '',
    sell_rate: ''
  })

  // Update form state
  const [updateForm, setUpdateForm] = useState<{
    [key: number]: { buy_rate: string; sell_rate: string }
  }>({})

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/admin/login' })
  }
  // Fetch rates on component mount and when activeTab changes
  // useEffect(() => {
  //   if (activeTab === 'view') {
  //     // fetchRates()
  //   }
  // }, [activeTab])

  // Fetch all currency rates using service
  // const fetchRates = async () => {
  //   setLoading(true)
  //   setMessage({ type: '', text: '' })
    
  //   try {
  //     const ratesData = await currencyService.getAll()
  //     setRates(ratesData)
  //   } catch (error: any) {
  //     setMessage({ type: 'error', text: error.message })
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // Add new currency rate using service
  const handleAddCurrency = async (e: React.FormEvent) => {
    e.preventDefault()
    // setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      await addCurrencyMutation.mutateAsync({
        currency_name: addForm.currency_name,
        currency_code: addForm.currency_code,
        country_name: addForm.country_name,
        buy_rate: addForm.buy_rate,
        sell_rate: addForm.sell_rate
      })

      setMessage({ type: 'success', text: 'Currency added successfully!' })
      
      // Reset form
      setAddForm({
        currency_name: '',
        currency_code: '',
        country_name: '',
        buy_rate: '',
        sell_rate: ''
      })
      
      setActiveTab('view')
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message })
    }}

  // Update currency rate using service
  const handleUpdateCurrency = async (id: number) => {
    if (!updateForm[id]?.buy_rate && !updateForm[id]?.sell_rate) {
      setMessage({ type: 'error', text: 'Enter new rates to update' })
      return
    }
    setUpdatingId(id)
    // setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      await updateCurrencyMutation.mutateAsync({
        id,
        buy_rate: updateForm[id]?.buy_rate || undefined,
        sell_rate: updateForm[id]?.sell_rate || undefined
      })

      setMessage({ type: 'success', text: 'Rate updated successfully!' })
      
      // Clear update form for this currency
      setUpdateForm({
        ...updateForm,
        [id]: { buy_rate: '', sell_rate: '' }
      })
      
      // Refresh rates
      // fetchRates()
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setUpdatingId(null)
    }
  }

  // Handle input changes for add form
  const handleAddInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddForm({
      ...addForm,
      [e.target.name]: e.target.value
    })
  }

  // Handle input changes for update form
  const handleUpdateInputChange = (id: number, field: 'buy_rate' | 'sell_rate', value: string) => {
    setUpdateForm({
      ...updateForm,
      [id]: {
        ...updateForm[id],
        [field]: value
      }
    })
  }
  const handleManualRefresh = () => {
    refetchRates()
    // setMessage({ type: 'info', text: 'Refreshing rates...' })
  }

  return (
   <TabContent
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      rates={rates}
      updatingId={updatingId}
      loading={ratesLoading || addCurrencyMutation.isPending || updateCurrencyMutation.isPending}
      message={message}
      addForm={addForm}
      updateForm={updateForm}
      handleAddCurrency={handleAddCurrency}
      handleUpdateCurrency={handleUpdateCurrency}
      handleAddInputChange={handleAddInputChange}
      handleUpdateInputChange={handleUpdateInputChange}
      fetchRates={handleManualRefresh}
      onLogout={handleLogout}
      />
  )
}