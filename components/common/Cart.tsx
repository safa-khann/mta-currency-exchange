// components/CurrencyCart.tsx
"use client"
import React from 'react';
import { X } from 'lucide-react';

export interface CartItem {
  id: string;
  fromCurrency: {
    code: string;
    name: string;
    country: string;
    flag: string;
    amount: string;
  };
  toCurrency: {
    code: string;
    name: string;
    country: string;
    countryName:string;
    flag: string;
    amount: string;
  };
  transactionType: 'buy' | 'sell';
  rate: number;
  type: string;
}

interface CurrencyCartProps {
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateItem?: (id: string, updates: Partial<CartItem>) => void;
  className?: string;
}

const CurrencyCart: React.FC<CurrencyCartProps> = ({ 
  items, 
  onRemoveItem, 
  onUpdateItem,
  className = '' 
}) => {
  const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode.toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  if (items.length === 0) {
    return (
      <div className={`p-0 text-center text-gray-500 ${className}`}>
        
      </div>
    );
  }

  return (
    <div className={`w-full transition-all duration-300 ${className}`}>
      <h3 className="text-2xl sm:text-3xl font-bold mb-4">Your Order <span className='text-sm sm:text-lg font-normal'>(Add More Currencies)</span></h3>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse [table-layout:fixed] sm:[table-layout:auto]">
          <thead>
            <tr className="bg-gray-100 text-sm">
              <th className="border-b border-gray-300 px-4 py-2 text-left w-[190px] md:w-auto">From</th>
              <th className="border-b border-gray-300 px-4 py-2 text-left w-[190px] md:w-auto">To</th>
              <th className="border-b border-gray-300 px-4 py-2 text-left w-[80px] md:w-auto">Buy/Sell</th>
              <th className="border-b border-gray-300 px-4 py-2 text-left w-[90px] md:w-auto">Rate</th>
              <th className="border-b border-gray-300 px-4 py-2 text-left w-[90px] md:w-auto">Type</th>
              <th className="border-b border-gray-300 px-4 py-2 text-left w-[50px] md:w-auto"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                {/* From Column */}
                <td className="border-b border-gray-200 px-4 py-2 w-[180px] md:w-auto">
                  <div className="flex flex-row items-center gap-2">
                    {/* <span className="text-xl">{getFlagEmoji('gb')}</span> */}
                    {item.transactionType === 'buy' ?(
                      <>
                      <span className={`flag-icon flag-icon-gb text-md`}></span>
                    <div className="text-sm font-medium">{item.fromCurrency.amount} GBP - UK</div>
                    </>):(
                      <> 
                       <span className={`flag-icon flag-icon-${item.toCurrency.country.toLowerCase()} text-md`}></span>
                    <div>
                      <p className="text-sm font-medium">{item.toCurrency.amount} {item.toCurrency.code} - {item.toCurrency.countryName}</p>
                    </div> 
                      </>
                    )}
                    
                  </div>
                </td>
                
                {/* To Column */}
                <td className="border-b border-gray-200 px-4 py-2 w-[180px] md:w-auto">
                  <div className="flex items-center gap-2">
                     {item.transactionType === 'buy' ?(
                      <>
                      <span className={`flag-icon flag-icon-${item.toCurrency.country.toLowerCase()} text-md`}></span>
                    <div>
                      <p className="text-sm font-medium">{item.toCurrency.amount} {item.toCurrency.code} - {item.toCurrency.countryName}</p>
                    </div> 
                      </>):(
                      <> 
                      <span className={`flag-icon flag-icon-gb text-md`}></span>
                    <div className="text-sm font-medium">{item.fromCurrency.amount} GBP - UK</div>
                     
                      </>
                    )}
                    {/* <span className={`flag-icon flag-icon-${item.toCurrency.country.toLowerCase()} text-md`}></span>
                    <div>
                      <p className="text-sm font-medium">{item.toCurrency.amount} {item.toCurrency.code} - {item.toCurrency.countryName}</p>
                    </div> */}
                  </div>
                </td>
                
                {/* Buy/Sell Column */}
                <td className="border-b border-gray-200 px-4 py-2">
                  <span className={` text-sm font-medium ${
                    item.transactionType === 'buy' 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {item.transactionType.toUpperCase()}
                  </span>
                </td>
                
                {/* Rate Column */}
                <td className="border-b border-gray-200 px-4 text-sm py-2 font-medium">
                  {item.rate.toFixed(4)}
                </td>
                
                {/* Type Column */}
                <td className="border-b border-gray-200 px-4 py-2">
                  <span className="bg-yellow-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                    {item.type}
                  </span>
                </td>
                
                {/* Remove Button Column */}
                <td className="border-b border-gray-200 px-4 py-2">
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="bg-gray-100 cursor-pointer text-black hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors"
                    title="Remove from cart"
                  >
                    <X size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Cart Summary */}
      <div className="border-b bg-gray-100 border-gray-200 py-2 ps-4 text-sm text-gray-600">
        Total GBP: <span className='text-black font-bold'>{items.reduce((sum, item) => sum + parseFloat(item.fromCurrency.amount), 0).toFixed(2)}</span>
       
      </div>
    </div>
  );
};

export default CurrencyCart;