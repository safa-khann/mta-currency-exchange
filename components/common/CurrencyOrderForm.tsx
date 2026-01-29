// components/CurrencyOrderForm.tsx
"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronRight, ChevronLeft, ArrowDownAZ, ArrowRightIcon, ArrowRightLeft, CrossIcon, CheckCircle } from 'lucide-react';
import { CurrencySelect } from './CurrencySelect';
import Image from 'next/image';
import CurrencyCart, { CartItem } from './Cart';
import { CustomSelect } from './CustomSelect';
import { useRouter } from 'next/navigation';
import { CurrencyRate, currencyService } from '@/lib/services/currency-service';
import { getFlagCountryCode } from '@/utils/flagMapping';
import { useCurrencyRates, useOrderEmail } from '@/lib/hooks/useCurrency';

interface CurrencyOrderFormProps {
  heading: string;
  showOption: 'buy' | 'sell' | 'both';
  showPersonalDetails?: boolean;
  showCart?:boolean;
  defaultCurrency?: string;
  isHomePage?: boolean;
}
const CurrencyOrderForm: React.FC<CurrencyOrderFormProps> = ({
  heading,
  showOption,
  showPersonalDetails = true,
//   offeredCurrencies,
  showCart,
  defaultCurrency = 'EUR',
  isHomePage = false 
}) => {
  // const [selectedOption, setSelectedOption] = useState<'buy' | 'sell'>('buy');
   const options = [
    { value: 'buy', label: 'Click and Buy' },
    { value: 'sell', label: 'Click and Sell' },
  ].filter(opt => {
    if (showOption === 'both') return true; // Show both options
    if (showOption === 'buy') return opt.value === 'buy'; // Show only buy
    if (showOption === 'sell') return opt.value === 'sell'; // Show only sell
    return true;
  }); 

  const sendOrderMutation = useOrderEmail()
  const titleOptions = ['Mr.', 'Mrs.', 'Ms.'];
  const branchOptions = ['Branch 1 - London', 'Branch 2 - Manchester', 'Branch 3 - Birmingham'];
  const paymentMethodOptions = ['Pay on branch (card)', 'Pay on branch (cash)'];
  const [selectedOption, setSelectedOption] = useState<'buy' | 'sell'>(() => {
    // If showOption is 'sell', default to 'sell'
    if (showOption === 'sell') {
      return 'sell';
    }
    // If showOption is 'buy', default to 'buy'
    if (showOption === 'buy') {
      return 'buy';
    }
    // For 'both' or any other case, default to 'buy'
    return 'buy';
  });
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [selectedCurrency, setSelectedCurrency] = React.useState(defaultCurrency);
  const [gbpAmount, setGbpAmount] = React.useState('');
  const [foreignAmount, setForeignAmount] = React.useState('');
  const successMessageRef = useRef<HTMLDivElement>(null);
  const [customer_title, setTitle] = React.useState('Mr.');
  const [first_name, set_first_name] = React.useState('');
  const [last_name, set_last_name] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [branch_name, setBranch] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [mailingList, setMailingList] = React.useState(false);
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const router = useRouter(); 
  const { data: exchangeRates, isLoading, error, refetch } = useCurrencyRates();
 
     const getCurrentRate = () => {
       if (!exchangeRates || exchangeRates.length === 0) {
         return selectedOption === 'buy' ? 1.12 : 1.08;
       }
      const rateData = exchangeRates.find(r => r.currency_code === selectedCurrency);
      if (!rateData) return selectedOption === 'buy' ? 1.12 : 1.08;
      return selectedOption === 'buy' ? rateData.sell_rate : rateData.buy_rate;
  };

 const [rate, setRate] = React.useState(1.12);

    useEffect(() => {
    const loadCart = () => {
      if (typeof window !== 'undefined') {
        const savedCart = localStorage.getItem('currencyCart');
        if (savedCart) {
          try {
            const parsedCart = JSON.parse(savedCart);
            setCartItems(parsedCart);
          } catch (error) {
            console.error('Error parsing cart from localStorage:', error);
            localStorage.removeItem('currencyCart');
          }
        }
      }
    };
    
    loadCart();
    
    // Also listen for storage events (if cart is updated from another tab/window)
    window.addEventListener('storage', loadCart);
    return () => window.removeEventListener('storage', loadCart);
  }, []);
  
  // Save cart items to localStorage whenever they change (but not on initial load)
  const isInitialMount = React.useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('currencyCart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    if (exchangeRates && exchangeRates.length > 0) {
      const newRate = getCurrentRate();
      setRate(newRate);
      
      // Recalculate foreign amount if GBP amount exists
      if (gbpAmount && !isNaN(parseFloat(gbpAmount))) {
        const calculated = parseFloat(gbpAmount) * newRate;
        setForeignAmount(calculated.toFixed(2));
      }
    }
  }, [selectedCurrency, selectedOption, exchangeRates]);


  const handleCurrencySelect = (currencyCode: string) => {
    setSelectedCurrency(currencyCode);
  };

  const handleGbpChange = (value: string) => {
    setGbpAmount(value);
    if (value && !isNaN(parseFloat(value))) {
      const calculated = parseFloat(value) * rate;
      setForeignAmount(calculated.toFixed(2));
    } else {
      setForeignAmount('');
    }
  };

  const handleForeignChange = (value: string) => {
    setForeignAmount(value);
    if (value && !isNaN(parseFloat(value))) {
      const calculated = parseFloat(value) / rate;
      setGbpAmount(calculated.toFixed(2));
    } else {
      setGbpAmount('');
    }
  };
  //Add to Cart
  const handleAddToCart = () => {
    if (!gbpAmount || parseFloat(gbpAmount) <= 0) {
      alert('Please enter a valid GBP amount');
      return;
    }

    if (!selectedCurrency) {
      alert('Please select a currency');
      return;
    }
    if (!exchangeRates)
      return;

    // const selectedCurrencyData = exchangeRates.find(r => r.code === selectedCurrency);
    const selectedCurrencyData = exchangeRates.find(r => r.currency_code === selectedCurrency);
    if (!selectedCurrencyData) return;

    const countryCode = getFlagCountryCode(
      selectedCurrencyData.currency_code,
      selectedCurrencyData.country_name
    );
    
    const newItem: CartItem = {
      id: Date.now().toString(),
      fromCurrency: {
        code: 'GBP',
        name: 'United Kingdom',
        country: 'gb',
        flag: 'gb',
        amount: parseFloat(gbpAmount).toFixed(2)
      },
      toCurrency: {
        code: selectedCurrencyData.currency_code,
        name: selectedCurrencyData.currency_name,
        country: countryCode,
        countryName: selectedCurrencyData.country_name,
        flag: countryCode,
        amount: foreignAmount
      },
      transactionType: selectedOption,
      rate: getCurrentRate(),
      type: 'collect'
    };
    console.log('Adding item with transactionType:', selectedOption); 
    if (isHomePage) {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('currencyCart') || '[]');
    existingCart.push(newItem);
    localStorage.setItem('currencyCart', JSON.stringify(existingCart));
    
    // Redirect
    router.push(selectedOption === 'buy' ? '/click-and-buy-currency' : '/click-and-sell-currency');
    return;
  }
    setCartItems(prev => [...prev, newItem]);
    
    setGbpAmount('');
    setForeignAmount('');
  };

  // Remove from cart function
  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => {
      const updatedCart = prev.filter(item => item.id !== id);
      // Update localStorage immediately when removing
      if (typeof window !== 'undefined') {
        localStorage.setItem('currencyCart', JSON.stringify(updatedCart));
      }
      return updatedCart;
    });
  };

  const filteredCartItems = useMemo(() => {
    if (showOption === 'both') {
      return cartItems;
    }
    return cartItems.filter(item => item.transactionType === showOption);
  }, [cartItems, showOption]);

  const formattedExchangeRates = useMemo(() => {
    if (!exchangeRates) return [];
    return exchangeRates.map(rate => ({
      currency: rate.currency_name,
      code: rate.currency_code,
      country: getFlagCountryCode(rate.currency_code, rate.country_name),
      countryName: rate.country_name,
      buyRate: rate.buy_rate,
      sellRate: rate.sell_rate
    }));
  }, [exchangeRates]);

  const selectedCurrencyData = exchangeRates?.find(r => r.currency_code === selectedCurrency);

  const validateField = (field: string, value: string) => {
  const newErrors = { ...formErrors };
  
  switch (field) {
    case 'email':
      if (!value) {
        newErrors.email = 'Email is required';
      } else {
        delete newErrors.email;
      }
      break;
      
    case 'mobile':
      if (!value) {
        newErrors.mobile = 'Mobile number is required';
      } else {
        delete newErrors.mobile;
      }
      break;
      
    case 'first_name':
      if (!value) {
        newErrors.first_name = 'First name is required';
      } else {
        delete newErrors.first_name;
      }
      break;
      
    case 'last_name':
      if (!value) {
        newErrors.last_name = 'Last name is required';
      } else {
        delete newErrors.last_name;
      }
      break;
      
    case 'branch_name':
      if (!value) {
        newErrors.branch_name = 'Please select a branch';
      } else {
        delete newErrors.branch_name;
      }
      break;
      
    case 'paymentMethod':
      if (!value) {
        newErrors.paymentMethod = 'Please select a payment method';
      } else {
        delete newErrors.paymentMethod;
      }
      break;
  }
  
  setFormErrors(newErrors);
};
const handleSubmitOrder = async () => {
  setFormErrors({});
  const newErrors: Record<string, string> = {};
  // Validation
  if (!termsAccepted) {
    newErrors.terms = 'Please accept the Terms and Conditions';
  }
  // Personal details validation (only if showPersonalDetails is true)
  if (showPersonalDetails) {
    if (!first_name) newErrors.first_name = 'First name is required';
    if (!last_name) newErrors.last_name = 'Last name is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } 
    
    if (!mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[\+]?[0-9\s\-\(\)]+$/.test(mobile)) {
      newErrors.mobile = 'Please enter a valid mobile number';
    }
    
    if (!branch_name) newErrors.branch_name = 'Please select a branch';
    if (!paymentMethod) newErrors.paymentMethod = 'Please select a payment method';
  }

  if (cartItems.length === 0) {
    newErrors.cart = 'Your cart is empty. Please add items first.';
  }

  // If there are errors, set them and stop submission
  if (Object.keys(newErrors).length > 0) {
    setFormErrors(newErrors);
    
    // Scroll to first error
    const firstErrorKey = Object.keys(newErrors)[0];
    const element = document.getElementById(firstErrorKey);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    return;
  }
  // Use the first cart item (or loop through all if multiple)
  const cartItem = cartItems[0]
  
  // Find currency data
  const selectedCurrencyData = exchangeRates?.find(
    r => r.currency_code === cartItem.toCurrency.code
  )

  if (!selectedCurrencyData) {
    alert('Currency data not found')
    return
  }
  const orderItems = cartItems.map(cartItem => {
      const selectedCurrencyData = exchangeRates?.find(
        r => r.currency_code === cartItem.toCurrency.code
      );

      return {
        currency_name: selectedCurrencyData?.currency_name || cartItem.toCurrency.code,
        currency_code: cartItem.toCurrency.code,
        transaction_type: cartItem.transactionType,
        gbp_amount: parseFloat(cartItem.fromCurrency.amount),
        foreign_amount: parseFloat(cartItem.toCurrency.amount),
        exchange_rate: cartItem.rate
      };
    });

  // Prepare order data
  const orderData = {
    customer_title,
    first_name,
    last_name,
    email,
    mobile,
    branch_name,
    notes,
    items:orderItems,
    payment_method:paymentMethod
  }

  try {
    const result = await sendOrderMutation.mutateAsync(orderData)
    
    if (result.success) {
      localStorage.removeItem('currencyCart')
      setCartItems([])
      // Reset form
      setGbpAmount('')
      setForeignAmount('')
      set_first_name('')
      set_last_name('')
      setEmail('')
      setMobile('')
      setNotes('')
      setTermsAccepted(false)
      setFormErrors({})
      setIsOrderSuccess(true);
      setTimeout(() => {
        if (successMessageRef.current) {
          successMessageRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }, 100);
      setTimeout(() => {
        setIsOrderSuccess(false);
      }, 10000);
    } else {
      setFormErrors({ submit: 'Failed to send order confirmation. Please try again.' });
    }
  } catch (error: any) {
    setFormErrors({ submit: `Error: ${error.message || 'Failed to submit order'}` });
  }
}


  return (
    <div className="w-full relative mx-auto ">
       
      {/* 80% width box */}     
      <div className=" w-[95%] sm:w-[90%] 2xl:w-[70%] p-4 pt-4 pb-6 md:p-5 lg:px-6 lg:pt-5 lg:pb-3 absolute top-[-120px] left-1/2 transform -translate-x-1/2 z-20 mx-auto bg-white shadow-equal-sm" style={{borderRadius:'50px'}}>
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-5 md:mb-8">{heading}</h2>          
           <div className="flex flex-col flex-wrap sm:flex-row justify-center gap-2 md:gap-3 md:mb-4 lg:mb-6">
        {/* Buy/Sell Option Select */}
        <div className="p-2 flex font-medium border h-9.5 bg-grayblue-l">
          <Image
          height={10}
          width={20}
          src='/images/location.png'
          alt='Buy or sell currency now'
          className='w-auto h-5'/>
          <CustomSelect
            value={selectedOption}
            onChange={(value) => setSelectedOption(value as 'buy' | 'sell')}
            options={options}
            buttonstyling='text-xs sm:text-sm'
            className='w-full sm:w-50 md:w-30 text-xs sm:text-sm'
          />
        </div>

        {/* Currency Select with Flag */}
        {isLoading ? (  
            <div className="animate-pulse h-9.5 w-12 bg-gray-200 rounded"></div>
          ) : error ? (
            <div className="flex w-full sm:w-auto h-9.5 items-center border bg-grayblue-l px-2 overflow-hidden justify-center">
              <span className="text-xs text-red-500">Error </span>
            </div>
          ) : (
            <CurrencySelect
              value={selectedCurrency}
              onChange={handleCurrencySelect}
              options={formattedExchangeRates}
            />
          )}

        {/* GBP Input */}
        <div className="flex w-full sm:w-auto gap-1 sm:gap-3">
            <div className="flex w-full md:w-35 h-9.5 items-center border bg-grayblue-l overflow-hidden">
            <p className="pl-2 py-1 text-xs sm:text-sm font-medium">
                {selectedOption === 'buy' ? 'GBP' : (selectedCurrencyData?.currency_code || selectedCurrency)}
              </p>
              <input
                type="number"
                placeholder="0.00"
                className="p-1 text-xs sm:text-sm w-full font-medium outline-none"
                value={selectedOption === 'buy' ? gbpAmount : foreignAmount}
                onChange={(e) => selectedOption === 'buy' ? handleGbpChange(e.target.value) : handleForeignChange(e.target.value)}
              />
            </div>

        {/* Arrows & Rate */}
        <div className='flex items-center gap-1'>
            <ArrowRightLeft className="color-grayblue" size={33}/>
        {/* Rate Display */}
        <div className="text-start w-auto">
            <span className="text-xs sm:text-sm font-semibold mb-0 mr-2 leading-tight">Rate:</span>
            {isLoading ? (
                  <div className="animate-pulse h-4 w-12 bg-gray-200 rounded"></div>
                ) : error ? (
                  <span className="text-xs text-red-500">Error</span>
                ) : (
                  <p className="text-xs sm:text-sm font-medium mb-0 font-bold leading-tight">
                    {rate.toFixed(4)}
                  </p>
                )}
        </div>
        </div>

            {/* Foreign Currency Input */}       
            <div className="flex items-center h-9.5 bg-grayblue-l border w-full md:w-35 overflow-hidden">
            <div className="pl-2 text-xs sm:text-sm font-medium">
                {selectedOption === 'buy' ? (selectedCurrencyData?.currency_code || selectedCurrency) : 'GBP'}
              </div>
              <input
                type="number"
                placeholder="0.00"
                className="p-2 w-full outline-none text-xs sm:text-sm font-medium"
                value={selectedOption === 'buy' ? foreignAmount : gbpAmount}
                onChange={(e) => selectedOption === 'buy' ? handleForeignChange(e.target.value) : handleGbpChange(e.target.value)}
              />
            </div>
        </div>

        {/* Order Now Button */}
        <div className="text-center">
            <button className="w-40 py-2 border border-yellow-600/50 bg-yellow-500/30 hover:bg-yellow-500 cursor-pointer text-sm text-black font-semibold  transition"
            onClick={handleAddToCart}>
            Order Now
            </button>
        </div>
           </div>               
      </div>
       {/* Cart Component */}
      <div className="relative z-10 pt-30 sm:pt-30 md:pt-28 lg:pt-25">
    {/* Cart Section */}
     {showCart && cartItems.length > 0 && (
      <div className="pt-15 sm:pt-0 mb-8 px-3 sm:px-10 ">
        <CurrencyCart 
          items={filteredCartItems}
          onRemoveItem={handleRemoveFromCart}
        />
      </div>
    )}
     </div>
      
        {/* Personal Details Section - Hidden if prop is false */}
        {showPersonalDetails && (    
          <div className="pt-5 px-3 sm:px-10">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">Your Personal Details</h3>
             {isOrderSuccess && (
             <div 
                ref={successMessageRef}
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg shadow-md animate-fade-in"
                role="alert"
                id="success-message"
              >
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className='text-green-500'/>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-md font-bold text-black mb-1">
                        Order Confirmed!
                  </h3>
                  <div className="text-black text-sm">
                    <p>
                      We've sent a confirmation email. We will reach you out soon.
                    </p>
                  </div>
                </div>
              
              </div>
            </div>)}
            {/* Title and Name */}
            <div className="flex flex-wrap gap-1 sm:gap-3 mb-3">
              <CustomSelect
              value={customer_title}
              onChange={(e) => setTitle(e)}
              options={titleOptions.map(t => ({ value: t, label: t }))}
              buttonstyling='text-sm w-full px-2 py-1 text-sm h-10 border border-gray-400 bg-gray-100/70'
              className='flex sm:flex-1'
             />
             <div className='flex-1'>
              <input
                type="text"
                placeholder="First Name"
                className={`w-full px-4 text-sm h-10 border ${formErrors.first_name ? 'border-red-500' : 'border-gray-400'} bg-gray-100/70`}
                // className="flex-1 px-4 text-sm h-10 border border-gray-400 bg-gray-100/70"
                value={first_name}
                // onChange={(e) => set_first_name(e.target.value)}
                onChange={(e) => {
                  set_first_name(e.target.value);
                  validateField('first_name', e.target.value);
                }}
              />
              {formErrors.first_name && (
                <p className="text-red-500 text-xs mt-1">{formErrors.first_name}</p>
              )}</div>
              <div className='flex-1 '>
              <input
                type="text"
                placeholder="Last Name"
                className={`px-2 w-full text-sm h-10 border  ${formErrors.last_name ? 'border-red-500' : 'border-gray-400'} bg-gray-100/70`}
                value={last_name}
                onChange={(e) => {set_last_name(e.target.value); validateField('last_name', e.target.value);}}
              />
              {formErrors.last_name && (
                <p className="text-red-500 text-xs mt-1">{formErrors.last_name}</p>
              )}</div>
            </div>

            {/* Email and Mobile */}
            <div className="flex gap-1 sm:gap-3 mb-4 sm:mb-2">
              <div className='w-full sm:w-97'>
              <input
                type="email"
                placeholder="Email Address"
                className={`px-4 w-full text-sm h-10 border  ${formErrors.email ? 'border-red-500' : 'border-gray-400'} bg-gray-100/70`}
                value={email}
                onChange={(e) => {setEmail(e.target.value); validateField('email', e.target.value);}}
              />
              {formErrors.email && (
                <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
              )}
              </div>
              <div className='w-full sm:w-97'>
              <input
                type="tel"
                placeholder="Mobile"
                className={`px-4 w-full text-sm h-10 border  ${formErrors.mobile ? 'border-red-500' : 'border-gray-400'} bg-gray-100/70`}
                value={mobile}
                onChange={(e) => {setMobile(e.target.value); validateField('mobile', e.target.value);}}
              />
              {formErrors.mobile && (
                <p className="text-red-500 text-xs mt-1">{formErrors.mobile}</p>
              )}
              </div>
            </div>

            {/* Collection Info */}
            <div className="mb-3 sm:mb-6">
              <p className="font-bold text-sm text-gray-900 mb-2">
                For collection, you can visit any time between Working Hours
              </p>
              <div>
              <CustomSelect
              value={branch_name}
              onChange={(e) => {setBranch(e); validateField('branch_name', e);}}
              options={branchOptions.map(t => ({ value: t, label: t }))}
              buttonstyling={`w-full text-sm px-4 py-1 text-sm h-10 border  ${formErrors.branch_name ? 'border-red-500' : 'border-gray-400'} bg-gray-100/70`}
              className='w-full '
              placeholder='Select Branch'
             />
             {formErrors.branch_name && (
                <p className="text-red-500 text-xs mt-1">{formErrors.branch_name}</p>
              )}
             </div>
             
              <textarea
                placeholder="Special Instructions"
                className="w-full pl-5 pb-3 pr-4 py-2 text-sm border border-gray-400 bg-gray-100/70 mt-3"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* Mailing List Checkbox */}
            <div className="mb-6">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={mailingList}
                  onChange={(e) => setMailingList(e.target.checked)}
                />
                <span className="text-gray-800 text-sm">
                  Never miss a travel money deal. Sign up to our mailing list to stay up to date. 
                  If you would like more information on how we handle your data or on how to unsubscribe 
                  from our mailing list, check our <a href='/terms-and-conditions' className='text-blue-500 hover:text-blue-700'>Terms and Conditions</a> and <a href='/privacy-policy' className='text-blue-500 hover:text-blue-700'>Privacy Policy</a>. 
                  In order to send you email updates, we securely share your data with a third party 
                  email software provider who we allow to place additional cookies on your device.
                </span>
              </label>
            </div>

            {/* Terms Reminder */}
            <p className="text-gray-800 text-sm mb-4">
              Please visit branch with your valid photo identity proof. To know more read <a href='/terms-and-conditions' className='text-blue-500 hover:text-blue-700'>Terms and Conditions</a>
            </p>

            {/* Terms Checkbox */}
            <div className="mb-4 sm:mb-6">
              <label className="cursor-pointer flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <span className='text-sm'>Yes, I have read Terms and Conditions</span>
              </label>
            </div>

            {/* Payment Method */}
             <CustomSelect
              value={paymentMethod}
              onChange={(e) => {setPaymentMethod(e); validateField('paymentMethod', e);}}
              options={paymentMethodOptions.map(t => ({ value: t, label: t }))}
              buttonstyling={`w-full text-sm px-4 py-1 text-sm h-10 border  ${formErrors.paymentMethod ? 'border-red-500' : 'border-gray-400'} bg-gray-100/70`}
              className='w-full '
              placeholder='Select Payment Method'
             />
             {formErrors.paymentMethod && (
                <p className="text-red-500 text-xs mt-1">{formErrors.paymentMethod}</p>
              )}
            {/* Confirm Order Button */}
            <button 
              onClick={handleSubmitOrder}
              className="w-auto mt-4 bg-blue-950 text-white py-2 px-5 font-light hover:bg-blue-950/90 cursor-pointer transition disabled:bg-opacity-50 disabled:cursor-not-allowed"
              disabled={!termsAccepted || sendOrderMutation.isPending }
            >
              {sendOrderMutation.isPending ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending Order...
                </span>
              ) : (
                'Confirm Order'
              )}
            </button>
            {formErrors.cart && cartItems.length === 0 && (
                <p className="pt-3 text-red-500 text-xs mt-1">{formErrors.cart}</p>
              )}
          </div>
        )}
      
    </div>
  );
};

export default CurrencyOrderForm;