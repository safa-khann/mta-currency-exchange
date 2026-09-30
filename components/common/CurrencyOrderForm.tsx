// components/CurrencyOrderForm.tsx
"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowDownUp, CheckCircle2, Clock, IdCard, MapPin, Phone, ShieldCheck, Wallet } from 'lucide-react';
import { CurrencySelect } from './CurrencySelect';
import CurrencyCart, { CartItem } from './Cart';
import { CustomSelect } from './CustomSelect';
import { getFlagCountryCode } from '@/utils/flagMapping';
import { useCurrencyRates, useOrderEmail } from '@/lib/hooks/useCurrency';
import { site } from '@/lib/site';
import { EmptyOrder } from '../visuals/Illustrations';

interface CurrencyOrderFormProps {
  heading: string;
  showOption: 'buy' | 'sell' | 'both';
  showPersonalDetails?: boolean;
  showCart?: boolean;
  defaultCurrency?: string;
  isHomePage?: boolean;
}

const inputClass = (invalid?: boolean) =>
  `h-12 w-full rounded-xl border bg-white px-4 text-[0.9375rem] text-ink outline-none transition-[border-color,box-shadow] placeholder:text-subtle focus:border-navy-soft focus:ring-4 focus:ring-navy-soft/10 ${
    invalid ? 'border-danger' : 'border-line hover:border-ink/25'
  }`;

function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
      {error && (
        <p className="mt-1.5 text-xs font-medium text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function Step({ index, title, description, children }: { index: number; title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[1.75rem] bg-white p-5 shadow-card ring-1 ring-line sm:p-9">
      <div className="mb-7 flex items-start gap-4">
        <span className="tabular flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-gold">
          0{index}
        </span>
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-ink">{title}</h2>
          {description && <p className="mt-1 text-sm text-muted">{description}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

const CurrencyOrderForm: React.FC<CurrencyOrderFormProps> = ({
  heading,
  showOption,
  showPersonalDetails = true,
  showCart,
  defaultCurrency = 'EUR',
  isHomePage = false,
}) => {
  const options = [
    { value: 'buy', label: 'Buy currency' },
    { value: 'sell', label: 'Sell currency' },
  ].filter((opt) => {
    if (showOption === 'both') return true;
    if (showOption === 'buy') return opt.value === 'buy';
    if (showOption === 'sell') return opt.value === 'sell';
    return true;
  });

  const sendOrderMutation = useOrderEmail();
  const titleOptions = ['Mr.', 'Mrs.', 'Ms.'];
  const branchOptions = ['Grays Branch 54-56 High Street RM17 6NA'];
  const paymentMethodOptions = ['Pay on branch (cash)'];
  const [selectedOption, setSelectedOption] = useState<'buy' | 'sell'>(() => (showOption === 'sell' ? 'sell' : 'buy'));
  const [buyCartItems, setBuyCartItems] = useState<CartItem[]>([]);
  const [sellCartItems, setSellCartItems] = useState<CartItem[]>([]);
  const currentCartItems = selectedOption === 'buy' ? buyCartItems : sellCartItems;
  const [selectedCurrency, setSelectedCurrency] = React.useState(defaultCurrency);
  const [gbpAmount, setGbpAmount] = React.useState('');
  const [foreignAmount, setForeignAmount] = React.useState('');
  const [calcError, setCalcError] = useState('');
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
  const { data: exchangeRates, isLoading, error } = useCurrencyRates();

  const getCurrentRate = () => {
    if (!exchangeRates || exchangeRates.length === 0) {
      return selectedOption === 'buy' ? 1.12 : 1.08;
    }
    const rateData = exchangeRates.find((r) => r.currency_code === selectedCurrency);
    if (!rateData) return selectedOption === 'buy' ? 1.12 : 1.08;
    return selectedOption === 'buy' ? rateData.sell_rate : rateData.buy_rate;
  };

  const [rate, setRate] = React.useState(1.12);

  useEffect(() => {
    const loadCart = () => {
      if (typeof window !== 'undefined') {
        try {
          const savedBuyCart = localStorage.getItem('buyCurrencyCart');
          setBuyCartItems(savedBuyCart ? JSON.parse(savedBuyCart) : []);

          const savedSellCart = localStorage.getItem('sellCurrencyCart');
          setSellCartItems(savedSellCart ? JSON.parse(savedSellCart) : []);
        } catch (error) {
          console.error('Error parsing carts from localStorage:', error);
          localStorage.removeItem('buyCurrencyCart');
          localStorage.removeItem('sellCurrencyCart');
        }
      }
    };

    loadCart();
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
      localStorage.setItem('buyCurrencyCart', JSON.stringify(buyCartItems));
    }
  }, [buyCartItems]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('sellCurrencyCart', JSON.stringify(sellCartItems));
    }
  }, [sellCartItems]);

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
    setCalcError('');
    setGbpAmount(value);
    if (value && !isNaN(parseFloat(value))) {
      const calculated = parseFloat(value) * rate;
      setForeignAmount(calculated.toFixed(2));
    } else {
      setForeignAmount('');
    }
  };

  const handleForeignChange = (value: string) => {
    setCalcError('');
    setForeignAmount(value);
    if (value && !isNaN(parseFloat(value))) {
      const calculated = parseFloat(value) / rate;
      setGbpAmount(calculated.toFixed(2));
    } else {
      setGbpAmount('');
    }
  };

  // Add to cart
  const handleAddToCart = () => {
    if (!gbpAmount || parseFloat(gbpAmount) <= 0) {
      setCalcError('Enter an amount to continue.');
      return;
    }

    if (!selectedCurrency) {
      setCalcError('Choose a currency to continue.');
      return;
    }
    if (!exchangeRates) return;

    const selectedCurrencyData = exchangeRates.find((r) => r.currency_code === selectedCurrency);
    if (!selectedCurrencyData) return;

    const countryCode = getFlagCountryCode(selectedCurrencyData.currency_code, selectedCurrencyData.country_name);

    const newItem: CartItem = {
      id: Date.now().toString(),
      fromCurrency: {
        code: 'GBP',
        name: 'United Kingdom',
        country: 'gb',
        flag: 'gb',
        amount: parseFloat(gbpAmount).toFixed(2),
      },
      toCurrency: {
        code: selectedCurrencyData.currency_code,
        name: selectedCurrencyData.currency_name,
        country: countryCode,
        countryName: selectedCurrencyData.country_name,
        flag: countryCode,
        amount: foreignAmount,
      },
      transactionType: selectedOption,
      rate: getCurrentRate(),
      type: 'collect',
    };

    if (isHomePage) {
      if (selectedOption === 'buy') {
        const existingBuyCart = JSON.parse(localStorage.getItem('buyCurrencyCart') || '[]');
        existingBuyCart.push(newItem);
        localStorage.setItem('buyCurrencyCart', JSON.stringify(existingBuyCart));
        router.push('/click-and-buy-currency');
      } else {
        const existingSellCart = JSON.parse(localStorage.getItem('sellCurrencyCart') || '[]');
        existingSellCart.push(newItem);
        localStorage.setItem('sellCurrencyCart', JSON.stringify(existingSellCart));
        router.push('/click-and-sell-currency');
      }
      return;
    }

    if (selectedOption === 'buy') {
      setBuyCartItems((prev) => [...prev, newItem]);
    } else {
      setSellCartItems((prev) => [...prev, newItem]);
    }

    setGbpAmount('');
    setForeignAmount('');
    if (formErrors.cart) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next.cart;
        return next;
      });
    }
  };

  const handleRemoveFromCart = (id: string, transactionType?: 'buy' | 'sell') => {
    const typeToRemove = transactionType || selectedOption;
    if (typeToRemove === 'buy') {
      setBuyCartItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setSellCartItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const filteredCartItems = useMemo(() => {
    if (showOption === 'both') {
      return [...buyCartItems, ...sellCartItems];
    }
    return currentCartItems;
  }, [buyCartItems, sellCartItems, currentCartItems, showOption]);

  const formattedExchangeRates = useMemo(() => {
    if (!exchangeRates) return [];
    return exchangeRates.map((rate) => ({
      currency: rate.currency_name,
      code: rate.currency_code,
      country: getFlagCountryCode(rate.currency_code, rate.country_name),
      countryName: rate.country_name,
      buyRate: rate.buy_rate,
      sellRate: rate.sell_rate,
    }));
  }, [exchangeRates]);

  const selectedCurrencyData = exchangeRates?.find((r) => r.currency_code === selectedCurrency);
  const foreignCode = selectedCurrencyData?.currency_code || selectedCurrency;
  const foreignFlag = getFlagCountryCode(foreignCode, selectedCurrencyData?.country_name);

  const validateField = (field: string, value: string) => {
    const newErrors = { ...formErrors };

    switch (field) {
      case 'email':
        if (!value) newErrors.email = 'Email is required';
        else delete newErrors.email;
        break;
      case 'mobile':
        if (!value) newErrors.mobile = 'Mobile number is required';
        else delete newErrors.mobile;
        break;
      case 'first_name':
        if (!value) newErrors.first_name = 'First name is required';
        else delete newErrors.first_name;
        break;
      case 'last_name':
        if (!value) newErrors.last_name = 'Last name is required';
        else delete newErrors.last_name;
        break;
      case 'branch_name':
        if (!value) newErrors.branch_name = 'Please select a branch';
        else delete newErrors.branch_name;
        break;
      case 'paymentMethod':
        if (!value) newErrors.paymentMethod = 'Please select a payment method';
        else delete newErrors.paymentMethod;
        break;
    }

    setFormErrors(newErrors);
  };

  const handleSubmitOrder = async () => {
    setFormErrors({});
    const newErrors: Record<string, string> = {};
    const allCartItems = showOption === 'both' ? [...buyCartItems, ...sellCartItems] : currentCartItems;

    if (allCartItems.length === 0) {
      newErrors.cart = 'Your order is empty. Add a currency above first.';
    }
    if (showPersonalDetails) {
      if (!first_name) newErrors.first_name = 'First name is required';
      if (!last_name) newErrors.last_name = 'Last name is required';
      if (!email) newErrors.email = 'Email is required';
      if (!mobile) {
        newErrors.mobile = 'Mobile number is required';
      } else if (!/^[\+]?[0-9\s\-\(\)]+$/.test(mobile)) {
        newErrors.mobile = 'Please enter a valid mobile number';
      }
      if (!branch_name) newErrors.branch_name = 'Please select a branch';
      if (!paymentMethod) newErrors.paymentMethod = 'Please select a payment method';
    }
    if (!termsAccepted) {
      newErrors.terms = 'Please accept the Terms and Conditions';
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      const firstErrorKey = Object.keys(newErrors)[0];
      const element = document.getElementById(firstErrorKey === 'cart' ? 'order-step' : firstErrorKey);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const orderItems = allCartItems.map((cartItem) => {
      const selectedCurrencyData = exchangeRates?.find((r) => r.currency_code === cartItem.toCurrency.code);

      return {
        currency_name: selectedCurrencyData?.currency_name || cartItem.toCurrency.code,
        currency_code: cartItem.toCurrency.code,
        transaction_type: cartItem.transactionType,
        gbp_amount: parseFloat(cartItem.fromCurrency.amount),
        foreign_amount: parseFloat(cartItem.toCurrency.amount),
        exchange_rate: cartItem.rate,
      };
    });

    const orderData = {
      customer_title,
      first_name,
      last_name,
      email,
      mobile,
      branch_name,
      notes,
      items: orderItems,
      payment_method: paymentMethod,
    };

    try {
      const result = await sendOrderMutation.mutateAsync(orderData);

      if (result.success) {
        if (selectedOption === 'buy') {
          localStorage.removeItem('buyCurrencyCart');
          setBuyCartItems([]);
        } else {
          localStorage.removeItem('sellCurrencyCart');
          setSellCartItems([]);
        }
        setGbpAmount('');
        setForeignAmount('');
        set_first_name('');
        set_last_name('');
        setEmail('');
        setMobile('');
        setNotes('');
        setTermsAccepted(false);
        setFormErrors({});
        setIsOrderSuccess(true);
        setTimeout(() => {
          successMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
  };

  // ---------------------------------------------------------------
  // Calculator (shared by the home page card and the order pages)
  // ---------------------------------------------------------------
  const isBuy = selectedOption === 'buy';
  const topCode = isBuy ? 'GBP' : foreignCode;
  const topFlag = isBuy ? 'gb' : foreignFlag;
  const bottomCode = isBuy ? foreignCode : 'GBP';
  const bottomFlag = isBuy ? foreignFlag : 'gb';

  const amountBox = (
    label: string,
    code: string,
    flag: string,
    value: string,
    onChange: (value: string) => void,
    id: string
  ) => (
    <div
      className={`rounded-xl border bg-white px-4 py-3 transition-[border-color,box-shadow] focus-within:border-navy-soft focus-within:ring-4 focus-within:ring-navy-soft/10 ${
        calcError ? 'border-danger' : 'border-line'
      }`}
    >
      <label htmlFor={id} className="block text-xs font-medium text-muted">
        {label}
      </label>
      <div className="mt-1 flex items-center gap-3">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min="0"
          step="0.01"
          placeholder="0.00"
          className="tabular w-full min-w-0 bg-transparent text-2xl font-semibold text-ink outline-none placeholder:text-line"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <span className="flex shrink-0 items-center gap-2 rounded-full bg-canvas px-3 py-1.5 text-sm font-semibold text-ink">
          <span className={`flag-icon flag-icon-${flag} rounded-[3px]`} aria-hidden="true" />
          {code}
        </span>
      </div>
    </div>
  );

  const calculator = (
    <div className="space-y-4">
      {options.length > 1 && (
        <div className="grid grid-cols-2 rounded-full bg-canvas p-1" role="tablist" aria-label="Transaction type">
          {options.map((opt) => {
            const active = selectedOption === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedOption(opt.value as 'buy' | 'sell')}
                className={`h-10 cursor-pointer rounded-full text-sm font-medium transition-all ${
                  active ? 'bg-white text-ink shadow-card' : 'text-muted hover:text-ink'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}

      <div>
        <label htmlFor="currency" className="mb-1.5 block text-xs font-medium text-muted">
          Currency
        </label>
        {isLoading ? (
          <div className="h-12 animate-pulse rounded-xl bg-canvas" />
        ) : error ? (
          <div className="flex h-12 items-center rounded-xl border border-danger/30 bg-danger/5 px-4 text-sm text-danger">
            Rates are unavailable right now. Please try again shortly.
          </div>
        ) : (
          <CurrencySelect id="currency" value={selectedCurrency} onChange={handleCurrencySelect} options={formattedExchangeRates} />
        )}
      </div>

      <div className={isHomePage ? 'space-y-2' : 'grid gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-3'}>
        {amountBox(
          isBuy ? 'You pay' : 'You sell',
          topCode,
          topFlag,
          isBuy ? gbpAmount : foreignAmount,
          isBuy ? handleGbpChange : handleForeignChange,
          'amount-from'
        )}

        <div className="flex items-center gap-3 px-1 sm:justify-center">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white text-muted">
            <ArrowDownUp className="h-4 w-4 sm:rotate-90" aria-hidden="true" />
          </span>
          {isHomePage && (
            <span className="text-sm text-muted">
              {isLoading ? (
                <span className="inline-block h-4 w-32 animate-pulse rounded bg-canvas align-middle" />
              ) : (
                <>
                  <span className="tabular font-medium text-ink">£1 = {rate.toFixed(4)} {foreignCode}</span>
                  <span className="text-subtle"> · 0% commission</span>
                </>
              )}
            </span>
          )}
        </div>

        {amountBox(
          'You receive',
          bottomCode,
          bottomFlag,
          isBuy ? foreignAmount : gbpAmount,
          isBuy ? handleForeignChange : handleGbpChange,
          'amount-to'
        )}
      </div>

      {!isHomePage && (
        <p className="text-sm text-muted">
          {isLoading ? (
            <span className="inline-block h-4 w-40 animate-pulse rounded bg-canvas align-middle" />
          ) : (
            <>
              Rate <span className="tabular font-medium text-ink">£1 = {rate.toFixed(4)} {foreignCode}</span>
              <span className="text-subtle"> · 0% commission</span>
            </>
          )}
        </p>
      )}

      {calcError && (
        <p className="text-sm font-medium text-danger" role="alert">
          {calcError}
        </p>
      )}

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isLoading || !!error}
        className={`flex h-12 w-full cursor-pointer items-center justify-center rounded-full text-[0.9375rem] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
          isHomePage ? 'bg-gold text-ink hover:bg-gold-deep' : 'bg-navy text-white hover:bg-navy-soft'
        }`}
      >
        {isHomePage ? 'Order now' : 'Add to order'}
      </button>
    </div>
  );

  // ---------------------------------------------------------------
  // Home page: calculator card only
  // ---------------------------------------------------------------
  if (!showPersonalDetails) {
    return (
      <div className="rounded-[2rem] bg-white p-6 shadow-float ring-1 ring-white/60 sm:p-8">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-ink">{heading}</h2>
          <span className="flex items-center gap-2 text-xs font-medium text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-positive opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-positive" />
            </span>
            Today&apos;s rates
          </span>
        </div>
        {calculator}
      </div>
    );
  }

  // ---------------------------------------------------------------
  // Order pages: step-by-step checkout with a summary sidebar
  // ---------------------------------------------------------------
  const totalGbp = filteredCartItems.reduce((sum, item) => sum + parseFloat(item.fromCurrency.amount), 0);
  let step = 0;

  return (
    <section className="section bg-paper pt-12 sm:pt-16">
      <div className="container-page grid gap-8 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-10">
        <div className="min-w-0 space-y-6">
          <Step index={++step} title={heading} description="Choose a currency and enter either amount — we'll calculate the other.">
            {calculator}
          </Step>

          {showCart && (
            <div id="order-step">
              <Step index={++step} title="Your order" description="Add as many currencies as you need.">
                {filteredCartItems.length > 0 ? (
                  <CurrencyCart items={filteredCartItems} onRemoveItem={handleRemoveFromCart} />
                ) : (
                  <div
                    className={`rounded-xl border border-dashed px-4 py-8 text-center text-sm ${
                      formErrors.cart ? 'border-danger text-danger' : 'border-line text-muted'
                    }`}
                  >
                    <EmptyOrder className="mx-auto mb-3 h-20 w-auto" />
                    {formErrors.cart || 'No currencies added yet — add one above.'}
                  </div>
                )}
              </Step>
            </div>
          )}

          <Step index={++step} title="Your details" description="We'll email your confirmation and have your order ready to collect.">
            {isOrderSuccess && (
              <div
                ref={successMessageRef}
                className="mb-6 flex gap-4 rounded-xl border border-positive/20 bg-positive/5 p-4 animate-fade-up"
                role="status"
                id="success-message"
              >
                <CheckCircle2 className="h-6 w-6 shrink-0 text-positive" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-ink">Order confirmed</p>
                  <p className="mt-1 text-sm text-muted">We&apos;ve sent you a confirmation email and will be in touch shortly.</p>
                </div>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-[7rem_1fr_1fr]">
              <Field label="Title" htmlFor="customer_title">
                <CustomSelect
                  id="customer_title"
                  value={customer_title}
                  onChange={(e) => setTitle(e)}
                  options={titleOptions.map((t) => ({ value: t, label: t }))}
                />
              </Field>
              <Field label="First name" htmlFor="first_name" error={formErrors.first_name}>
                <input
                  id="first_name"
                  type="text"
                  autoComplete="given-name"
                  className={inputClass(!!formErrors.first_name)}
                  value={first_name}
                  onChange={(e) => {
                    set_first_name(e.target.value);
                    validateField('first_name', e.target.value);
                  }}
                />
              </Field>
              <Field label="Last name" htmlFor="last_name" error={formErrors.last_name}>
                <input
                  id="last_name"
                  type="text"
                  autoComplete="family-name"
                  className={inputClass(!!formErrors.last_name)}
                  value={last_name}
                  onChange={(e) => {
                    set_last_name(e.target.value);
                    validateField('last_name', e.target.value);
                  }}
                />
              </Field>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Email address" htmlFor="email" error={formErrors.email}>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={inputClass(!!formErrors.email)}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateField('email', e.target.value);
                  }}
                />
              </Field>
              <Field label="Mobile number" htmlFor="mobile" error={formErrors.mobile}>
                <input
                  id="mobile"
                  type="tel"
                  autoComplete="tel"
                  className={inputClass(!!formErrors.mobile)}
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value);
                    validateField('mobile', e.target.value);
                  }}
                />
              </Field>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field
                label="Collection branch"
                htmlFor="branch_name"
                error={formErrors.branch_name}
                hint="Collect any time during opening hours."
              >
                <CustomSelect
                  id="branch_name"
                  value={branch_name}
                  onChange={(e) => {
                    setBranch(e);
                    validateField('branch_name', e);
                  }}
                  options={branchOptions.map((t) => ({ value: t, label: t }))}
                  placeholder="Select branch"
                  invalid={!!formErrors.branch_name}
                />
              </Field>
              <Field label="Payment method" htmlFor="paymentMethod" error={formErrors.paymentMethod}>
                <CustomSelect
                  id="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => {
                    setPaymentMethod(e);
                    validateField('paymentMethod', e);
                  }}
                  options={paymentMethodOptions.map((t) => ({ value: t, label: t }))}
                  placeholder="Select payment method"
                  invalid={!!formErrors.paymentMethod}
                />
              </Field>
            </div>

            <div className="mt-4">
              <Field label="Special instructions (optional)" htmlFor="notes">
                <textarea
                  id="notes"
                  rows={4}
                  className={`${inputClass()} h-auto py-3`}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </Field>
            </div>

            <div className="mt-6 space-y-4 border-t border-line pt-6">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-navy"
                  checked={mailingList}
                  onChange={(e) => setMailingList(e.target.checked)}
                />
                <span className="text-sm leading-relaxed text-muted">
                  Never miss a travel money deal — sign up to our mailing list. To learn how we handle your data or how to
                  unsubscribe, see our{' '}
                  <Link href="/terms-and-conditions" className="font-medium text-ink underline underline-offset-2">
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy-policy" className="font-medium text-ink underline underline-offset-2">
                    Privacy Policy
                  </Link>
                  . To send you email updates, we securely share your data with a third-party email software provider who we
                  allow to place additional cookies on your device.
                </span>
              </label>

              <label id="terms" className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-navy"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <span className="text-sm leading-relaxed text-ink">
                  I have read and accept the{' '}
                  <Link href="/terms-and-conditions" className="font-medium underline underline-offset-2">
                    Terms and Conditions
                  </Link>
                  .
                </span>
              </label>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-xl bg-gold-tint px-4 py-3 text-sm text-ink">
              <IdCard className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <p>Please bring valid photo ID when you visit the branch to collect your order.</p>
            </div>

            <button
              type="button"
              onClick={handleSubmitOrder}
              className="mt-6 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-navy text-[0.9375rem] font-medium text-white transition-colors hover:bg-navy-soft disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!termsAccepted || sendOrderMutation.isPending}
            >
              {sendOrderMutation.isPending ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />
                  Sending order…
                </>
              ) : (
                'Confirm order'
              )}
            </button>
            {formErrors.submit && (
              <p className="mt-3 text-sm font-medium text-danger" role="alert">
                {formErrors.submit}
              </p>
            )}
            {formErrors.cart && !showCart && (
              <p className="mt-3 text-sm font-medium text-danger" role="alert">
                {formErrors.cart}
              </p>
            )}
          </Step>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-ink p-7 text-frost shadow-float">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/25 blur-3xl" aria-hidden="true" />
            <h2 className="relative text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-frost/60">Order summary</h2>
            <dl className="relative mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-frost/60">Currencies</dt>
                <dd className="tabular font-medium">{filteredCartItems.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-frost/60">Commission</dt>
                <dd className="font-medium text-gold">£0.00</dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-frost/10 pt-4">
                <dt className="font-medium">Total (GBP)</dt>
                <dd className="tabular text-3xl font-semibold tracking-tight text-gold">
                  £{totalGbp.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-4 rounded-[1.75rem] bg-white p-7 ring-1 ring-line">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">Good to know</h2>
            <ul className="mt-4 space-y-4 text-sm">
              {[
                { icon: MapPin, text: `${site.address.line1}, ${site.address.city} ${site.address.postcode}` },
                { icon: Clock, text: `${site.hours.days}, ${site.hours.time}` },
                { icon: Wallet, text: 'Pay in branch when you collect' },
                { icon: IdCard, text: 'Bring valid photo ID' },
                { icon: ShieldCheck, text: 'Your rate is confirmed by email' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-ink">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-tint">
                    <Icon className="h-4 w-4 text-ink" aria-hidden="true" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
            <a
              href={site.phoneHref}
              className="mt-6 flex items-center gap-2 border-t border-line pt-4 text-sm font-medium text-ink hover:text-navy-soft"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Questions? <span className="tabular">{site.phone}</span>
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default CurrencyOrderForm;
