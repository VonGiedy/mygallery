'use client';

import { useState } from 'react';
import { signIn, signUp } from '../../utils/supabase/auth-client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Only needed for Sign Up
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        // Handle Login
        const { error } = await signIn.email({ email, password });
        if (error) throw error;
      } else {
        // Handle Sign Up
        const { error } = await signUp.email({ email, password, name });
        if (error) throw error;
      }
      
      // If successful, redirect to homepage!
      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto mt-20">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4">
        <h1 className="text-2xl font-medium text-center text-gray-900 mb-6">
          {isLogin ? 'Welcome Back' : 'Create an Account'}
        </h1>
        
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col w-full justify-center gap-4 text-gray-900">
          
          {/* Only show Name input if signing up */}
          {!isLogin && (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600" htmlFor="name">Name</label>
              <input
                className="rounded-xl border border-gray-200 px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Von Giedy"
                required={!isLogin}
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600" htmlFor="email">Email</label>
            <input
              className="rounded-xl border border-gray-200 px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600" htmlFor="password">Password</label>
            <input
              className="rounded-xl border border-gray-200 px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2.5 font-medium transition-colors mt-4"
          >
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>

          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-gray-500 hover:text-gray-900 mt-2 transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </button>

          {error && (
            <p className="mt-4 p-3 bg-red-50 text-red-600 text-center text-sm rounded-xl">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}