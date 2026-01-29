'use client'

import { FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { InfoIcon } from 'lucide-react'

interface LoginProps {
  email: string
  password: string
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
  isLoading?: boolean
  error?: string | null
}

export default function Login({ 
  email,
  password,
  setEmail,
  setPassword,
  handleSubmit,
  isLoading = false,
  error = null
}: LoginProps) {
  return (
    <div className="fixed inset-0 flex px-5 items-center justify-center bg-yellow-500 backdrop-blur-sm z-50">
      <div className="bg-white px-5 sm:px-10 pt-10 pb-15 rounded-lg shadow-lg w-full max-w-md">
        <Link href="/" className='cursor-pointer'>
            <div className="mx-auto flex mb-7 justify-center gap-0">
              <Image
                src="/images/logo-wid.png"
                className=''
                alt="Logo"
                width={60}
                height={35}
                priority
              />
              <div className='pl-1.5 flex-row gap-0 font-bold inline flex-shrink-0'>
                <p className='mb-0 leading-tight text-2xl sm:text-2xl text-center text-yellow-500 whitespace-nowrap'>MTA</p>
                <p className='leading-tight mb-0 font-semibold logo-font text-yellow-500 whitespace-nowrap' style={{lineHeight:'initial'}}>CURRENCY</p>
                <p className='leading-tight font-semibold logo-font text-yellow-500 whitespace-nowrap'>EXCHANGE</p>
              </div>
            </div>
            </Link>
        <form onSubmit={handleSubmit} className=" space-y-4">
          <div className="text-left">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input 
              id="email"
              type="email" 
              className="w-full text-sm border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-blue-950 transition"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="text-left mb-5">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input 
              id="password"
              type="password" 
              className="w-full text-sm border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-blue-950 transition"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                    <InfoIcon className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 text-left">
                    {error}
                    {error.includes('CredentialsSignin') && (
                      <span className="block mt-1 text-red-600">
                        Please check your email and password.
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-blue-950 text-white py-3 px-4 rounded-full hover:bg-blue-900 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 font-medium shadow-md hover:shadow-lg"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                Authenticating...
              </span>
            ) : 'LOGIN'}
          </button>
        </form>
      </div>
    </div>
  )
}