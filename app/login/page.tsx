"use client"
import { login, signup } from './actions'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="bg-[#6A7FDB] min-h-screen p-8 flex items-center justify-center">
      <div className="bg-white bg-opacity-20 rounded-lg p-8 w-full max-w-md">
        <h1 className="text-white text-3xl font-bold mb-8 text-center">Login or Sign Up</h1>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-white text-sm font-medium mb-2">
              Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex space-x-4">
            <button
              formAction={login}
              className="flex-1 bg-white text-[#6A7FDB] font-bold py-2 px-4 rounded hover:bg-opacity-90 transition-colors"
            >
              Log in
            </button>
            <button
              formAction={signup}
              className="flex-1 bg-white bg-opacity-20 text-white font-bold py-2 px-4 rounded border border-white hover:bg-opacity-30 transition-colors"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}