// app/admin/components/TabContent.tsx
import { LogOut, RefreshCcw } from 'lucide-react'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export interface CurrencyRate {
  id: number
  currency_name: string
  currency_code: string
  country_name: string
  buy_rate: number
  sell_rate: number
  updated_at: string
}

export type TabType = 'view' | 'add' | 'update'

export interface Message {
  type: 'success' | 'error' | ''
  text: string
}

interface AddForm {
  currency_name: string
  currency_code: string
  country_name: string
  buy_rate: string
  sell_rate: string
}

interface UpdateForm {
  [key: number]: { buy_rate: string; sell_rate: string }
}

interface TabContentProps {
  activeTab: TabType
  setActiveTab: (tab: TabType) => void
  rates: CurrencyRate[]
  updatingId?: number | null
  loading: boolean
  message: Message
  addForm: AddForm
  updateForm: UpdateForm
  handleAddCurrency: (e: React.FormEvent) => Promise<void>
  handleUpdateCurrency: (id: number) => Promise<void>
  handleAddInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleUpdateInputChange: (id: number, field: 'buy_rate' | 'sell_rate', value: string) => void
  fetchRates: () => void
  onLogout?: () => Promise<void> 
  }

export default function TabContent({
  activeTab,
  setActiveTab,
  rates,
  updatingId,
  loading,
  message,
  addForm,
  updateForm,
  handleAddCurrency,
  handleUpdateCurrency,
  handleAddInputChange,
  handleUpdateInputChange,
  fetchRates,
  onLogout
}: TabContentProps) {
  return (
    <>
       <div className='p-2 flex justify-between items-center bg-blue-950'>
        <Link href="/" className='cursor-pointer'>
          <div className="flex gap-0 flex-shrink-0">
            <Image
              src="/images/logo-wid.png"
              alt="Logo"
              width={55}
              height={35}
              priority
              className='w-12 h-12'
            />
            <div className='pl-1.5 flex-row items-center gap-0 font-bold inline flex-shrink-0'>
              <p className='mb-0 leading-tight text-2xl sm:text-2xl text-center text-yellow-500 whitespace-nowrap'>MTA</p>
              <p className='leading-tight mb-0 sm:text-sm font-semibold text-[9px] sm:text-[11px] text-yellow-500 whitespace-nowrap' style={{lineHeight:'initial'}}>CURRENCY</p>
              <p className='leading-tight font-semibold text-[9px] sm:text-[11px] text-yellow-500 whitespace-nowrap'>EXCHANGE</p>
            </div>
          </div>
        </Link>
        <div className='flex justify-between gap-3 items-center'>
          <div className='hidden sm:d-block'>
          <h1 className="text-xl text-yellow-500 border-b border-white/50 text-white/80 font-bold mb-1 mr-2">MTA Admin</h1>
         <p className='text-white text-xs'>Email: mtaworldwidelimited@gmail.com</p> 
          </div>
       <button onClick={() => onLogout?.()} className='group bg-white/10 rounded-full px-5 py-2 hover:text-yellow-500 hover:bg-white/30 cursor-pointer text-white flex items-center gap-2 text-sm'>
        Logout 
        <LogOut className='text-white group-hover:text-yellow-500 w-4 transition-colors'/>
      </button>
        </div>
      </div>
    <div className='min-h-screen bg-white p-2 md:p-5'>
      <p className="text-gray-600 text-sm sm:text-md mt-1">Manage your currency exchange rates</p>
    <div className="bg-white rounded-lg shadow-md mt-5">
      {/* Tabs */}
      <div className="border-b rounded-t-lg bg-grayblue-ll">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('view')}
            className={`py-4 pl-2 pr-1 md:px-6 mr-2 text-xs sm:text-sm cursor-pointer font-medium ${
              activeTab === 'view'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-700 hover:text-black'
            }`}
          >
            View Rates ({rates.length})
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`py-4 px-1 md:px-6 mr-2 cursor-pointer text-xs sm:text-sm font-medium ${
              activeTab === 'add'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-700 hover:text-black'
            }`}
          >
            Add New Currency
          </button>
          <button
            onClick={() => setActiveTab('update')}
            className={`py-4 px-1 md:px-6 cursor-pointer text-xs sm:text-sm font-medium ${
              activeTab === 'update'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-700 hover:text-black'
            }`}
          >
            Update Rates
          </button>
        </nav>
      </div>

      {/* Message Alert */}
      {message.text && (
        <div className={`p-2 sm:p-4 ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
         {message.text}
        </div>
      )}

      {/* Tab Content */}
      <div className="px-2 pb-5 pt-2  md:p-6">
        {/* View Tab */}
        {activeTab === 'view' && (
          <div>
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-md sm:text-xl font-semibold">Current Exchange Rates</h2>
              <button
                onClick={fetchRates}
                disabled={loading}
                className="bg-yellow-500 flex items-center cursor-pointer text-black px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-yellow-400 border border-yellow-600 disabled:opacity-50"
              >
                {loading ? 'Refreshing...' : 'Refresh'}<RefreshCcw className='ml-2 w-4 sm:w-5'/>
              </button>
            </div>

            {loading && rates.length === 0 ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading rates...</p>
              </div>
            ) : rates.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No currency rates found. Add your first currency!
              </div>
            ) : (
              <div className="overflow-x-auto mb-10">
                <table className="min-w-full overflow-y-auto">
                  <thead>
                    <tr className="py-1 text-xs sm:text-md lg:text-lg sm:py-3 border-b">
                      <th className="text-left p-2 font-bold">Currency</th>
                      <th className="text-left p-2 font-bold">Code</th>
                      <th className="text-left p-2 font-bold">Country</th>
                      <th className="text-left p-2 font-bold">Buy Rate</th>
                      <th className="text-left p-2 font-bold">Sell Rate</th>
                      <th className="text-left p-2 font-bold w-[180px] min-w-[180px]">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rates.map((rate) => (
                      <tr key={rate.id} className="border-b text-xs sm:text-md lg:text-lg hover:bg-gray-50">
                        <td className="px-2 py-3">{rate.currency_name}</td>
                        <td className="p-2 text-blue-800">{rate.currency_code}</td>
                        <td className="p-2">{rate.country_name}</td>
                        <td className="p-2">{rate.buy_rate.toFixed(4)}</td>
                        <td className="p-2 ">{rate.sell_rate.toFixed(4)}</td>
                        
                        <td className="p-2 text-gray-600">
                          {new Date(rate.updated_at).toLocaleDateString('en-GB')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Add Tab */}
        {activeTab === 'add' && (
          <div>
            <h2 className="text-md sm:text-xl mt-1 font-semibold mb-6">Add New Currency</h2>
            
            <form onSubmit={handleAddCurrency} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Currency Name <span className='text-red-600'>*</span>
                  </label>
                  <input
                    type="text"
                    name="currency_name"
                    value={addForm.currency_name}
                    onChange={handleAddInputChange}
                    required
                    className="w-full border text-sm sm:text-md 2xl:text-lg border-gray-300 rounded-lg px-4 py-2 focus:ring-0 "
                    placeholder="e.g., US Dollar"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Currency Code <span className='text-red-600'>*</span>   <span className="text-xs text-gray-500 ml-3 mt-1">3 uppercase letters</span>
                  </label>
                  <input
                    type="text"
                    name="currency_code"
                    value={addForm.currency_code}
                    onChange={handleAddInputChange}
                    required
                    className="w-full border text-sm sm:text-md 2xl:text-lg border-gray-300 rounded-lg px-4 py-2 uppercase focus:ring-0"
                    placeholder="USD"
                    maxLength={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Country Name <span className='text-red-600'>*</span>
                  </label>
                  <input
                    type="text"
                    name="country_name"
                    value={addForm.country_name}
                    onChange={handleAddInputChange}
                    required
                    className="w-full border border-gray-300 text-sm sm:text-md 2xl:text-lg rounded-lg px-4 py-2 focus:ring-0"
                    placeholder="e.g., United States"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Buy Rate <span className='text-red-600'>*</span>
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    name="buy_rate"
                    value={addForm.buy_rate}
                    onChange={handleAddInputChange}
                    required
                    className="w-full border border-gray-300 text-sm sm:text-md 2xl:text-lg rounded-lg px-4 py-2 focus:ring-0"
                    placeholder="eg., 0.7491"
                  /></div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Sell Rate <span className='text-red-600'>*</span>
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    name="sell_rate"
                    value={addForm.sell_rate}
                    onChange={handleAddInputChange}
                    required
                    className="w-full border border-gray-300 text-sm sm:text-md 2xl:text-lg rounded-lg px-4 py-2 focus:ring-0"
                    placeholder="eg., 0.7591"
                  /></div>
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-950 text-sm sm:text-md 2xl:text-lg cursor-pointer text-white px-6 py-2 rounded-full font-medium hover:bg-blue-900 focus:outline-none focus:ring-0 disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add Currency'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('view')}
                  className="bg-gray-200 cursor-pointer text-sm sm:text-md 2xl:text-lg text-gray-800 px-6 py-2 rounded-full font-medium hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Update Tab */}
        {activeTab === 'update' && (
          <div>
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-md sm:text-xl font-semibold">Update Exchange Rates</h2>
              <button
                onClick={fetchRates}
                disabled={loading}
                className="bg-yellow-500 flex items-center cursor-pointer text-black px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-yellow-400 border border-yellow-600 disabled:opacity-50"
              >
                {loading ? 'Refreshing...' : 'Refresh'}<RefreshCcw className='ml-2 w-3 sm:w-5'/>
              </button>
            </div>

            {loading && rates.length === 0 ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading rates...</p>
              </div>
            ) : rates.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No currency rates found. Add some currencies first.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="text-xs sm:text-md lg:text-lg text border-b">
                      <th className="text-left p-2 font-bold">Currency</th>
                      <th className="text-left p-2 font-bold w-[130px] min-w-[100px] sm:w-auto sm:min-w-auto">Current Buy</th>
                      <th className="text-left p-2 font-bold">New Buy Rate</th>
                      <th className="text-left p-2 font-bold w-[130px] min-w-[100px] sm:w-auto sm:min-w-auto">Current Sell</th>
                      <th className="text-left p-2 font-bold ">New Sell Rate</th>
                      <th className="text-left p-2 font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rates.map((rate) => (
                      <tr key={rate.id} className="text-xs sm:text-md lg:text-lg border-b hover:bg-gray-50">
                        <td className="p-2 w-[100px] min-w-[150px] sm:min-w-auto sm:w-auto">
                          <div className="font-medium">{rate.currency_name}</div>
                          <div className="text-xs sm:text-sm text-blue-600">{rate.country_name}</div>
                        </td>
                        
                        <td className="p-2 font-mono">{rate.buy_rate.toFixed(4)}</td>
                        <td className="p-2">
                          <input
                            type="number"
                            step="0.0001"
                            value={updateForm[rate.id]?.buy_rate || ''}
                            onChange={(e) => handleUpdateInputChange(rate.id, 'buy_rate', e.target.value)}
                            className="w-32 border border-gray-300 rounded px-3 py-2 focus:ring-0"
                            placeholder={rate.buy_rate.toString()}
                          />
                        </td>
                        
                        <td className="p-2 font-mono">{rate.sell_rate.toFixed(4)}</td>
                        <td className="p-2">
                          <input
                            type="number"
                            step="0.0001"
                            value={updateForm[rate.id]?.sell_rate || ''}
                            onChange={(e) => handleUpdateInputChange(rate.id, 'sell_rate', e.target.value)}
                            className="w-32 border border-gray-300 rounded px-3 py-2 focus:ring-0"
                            placeholder={rate.sell_rate.toString()}
                          />
                        </td>
                        
                        <td className="p-2">
                          <button
                            onClick={() => handleUpdateCurrency(rate.id)}
                            disabled={updatingId === rate.id}
                            className="cursor-pointer bg-blue-950 text-white px-4 py-2 rounded-full text-xs sm:text-sm hover:bg-blue-950/90 disabled:opacity-50"
                          >
                            {updatingId === rate.id ? 'Updating...' : 'Update'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </div>
    </>
  )
}