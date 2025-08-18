'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaLock, FaLockOpen } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import axios from '@/lib/axios';

interface User {
  userId: number;
  username: string;
  email: string;
  role: 'admin' | 'user' | null;
}

const SignUp = () => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isPasswordShow, setPasswordShow] = useState(false);
  const [isConfirmPasswordShow, setConfirmPasswordShow] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      toast.error('You must agree to the terms and conditions.');
      return;
    }

    if (!email || !password || !confirmPassword || !username) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post<User>(`/api/auth/signup`, { email, password, username });

      setUser(response.data);
      toast.success('Account created successfully!');
      router.push('/');
    } catch (error: any) {
      console.error('Sign up error:', error);
      const message = error?.response?.data?.message || 'Sign up failed.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen p-16">
      {/* Left Panel */}
      <div className="space-y-6 hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-orange-200 to-blue-300 text-amber-900 w-full lg:w-1/2 p-6">
        <p className="text-center text-lg italic mt-6 max-w-sm">
          <span className="text-3xl text-yellow-700 font-semibold animate-pulse">
            UpLadoMyr Digital
          </span>
          <br />
          Turning ideas into scalable websites and smart digital solutions.
          <br />
          Let’s build your future — pixel by pixel, line by line.
        </p>
        <Image
          src="/img/signup/welkom2.avif"
          alt="Welcome Image"
          width={300}
          height={300}
          className="rounded-md shadow-lg"
        />
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-white p-6 sm:p-10">
        <form onSubmit={handleSignUp} className="w-full max-w-sm space-y-4">
          <h2 className="pt-12 text-2xl text-yellow-900 font-bold text-center">Welcome</h2>
          <p className="text-xl font-bold text-yellow-700 text-center">Create your account</p>

          {/* Username */}
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
            <FaUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600" />
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
            <MdEmail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600" />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={isPasswordShow ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
            {isPasswordShow ? (
              <FaLockOpen
                onClick={() => setPasswordShow(false)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
              />
            ) : (
              <FaLock
                onClick={() => setPasswordShow(true)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
              />
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={isConfirmPasswordShow ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
            {isConfirmPasswordShow ? (
              <FaLockOpen
                onClick={() => setConfirmPasswordShow(false)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
              />
            ) : (
              <FaLock
                onClick={() => setConfirmPasswordShow(true)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
              />
            )}
          </div>

          {/* Terms checkbox */}
          <label className="flex items-center text-sm gap-2">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              required
              className="accent-blue-600"
            />
            I agree to the
            <Link href="/terms" className="text-blue-600 underline">
              Terms & Conditions
            </Link>
          </label>

          {/* Optional error message */}
          {!agreed && (
            <p className="text-xs text-red-600 -mt-2">
              You must agree to the Terms & Conditions before signing up.
            </p>
          )}

          <button
            type="submit"
            className="btn w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto"
            disabled={loading || !agreed}
          >
            {loading ? 'Creating...' : 'Sign Up'}
          </button>

          <p className="text-center text-sm">
            Already have an account?
            <Link href="/signin" className="text-blue-600 ml-1 hover:underline">
              Sign In
            </Link>
          </p>

          {/* OAuth buttons */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 border rounded-xl hover:bg-gray-200 transition-transform hover:scale-105"
            >
              <Image src="/img/signup/search.png" alt="Google" width={20} height={20} /> Google
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-transform hover:scale-105"
            >
              <Image
                src="/img/signup/icons8-facebook-50.png"
                alt="Facebook"
                width={20}
                height={20}
              />{' '}
              Facebook
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
