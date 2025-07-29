// 'use client';

// import { useState } from 'react';
// import { supabase } from '@/app/(site)/lib/supabaseClient';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import { MdEmail } from 'react-icons/md';
// import { FaLock, FaLockOpen } from 'react-icons/fa';
// import Link from 'next/link';

// const SignIn = () => {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     const { data, error } = await supabase.auth.signInWithPassword({ email, password });

//     if (error) setError(error.message);
//     else {
//       const role = data?.user?.user_metadata?.role;
//       router.push(role === 'admin' ? '/admin' : '/');
//     }

//     setLoading(false);
//   };

//   const handleOAuthLogin = async (provider: 'google' | 'facebook') => {
//     const { error } = await supabase.auth.signInWithOAuth({ provider });
//     if (error) setError(error.message);
//   };

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen p-16">
//       {/* LEFT SIDE */}
//       <div className="space-y-6 hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-orange-200 to-blue-300 text-amber-900 w-full lg:w-1/2 p-6">
//         <h2 className="text-3xl text-yellow-700 font-semibold animate-pulse">UpLadoMyr Digital</h2>
//         <p className="text-lg text-center max-w-sm italic">
//           Empowering businesses with elegant, scalable, and user-friendly digital solutions. Build
//           your future with us.
//         </p>
//         <Image
//           src="/img/signup/loginimg.avif"
//           alt="Login Illustration"
//           width={300}
//           height={300}
//           className="rounded-md shadow-lg "
//         />
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="flex flex-col pt-10 justify-center items-center w-full lg:w-1/2 bg-white p-10 sm:p-12">
//         <h2 className="text-2xl pt-10 font-bold mb-4 text-yellow-900">Welcome Back!</h2>

//         <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
//           {/* Email */}
//           <div className="relative">
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full py-3 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-yellow-600 text-gray-700"
//               required
//             />
//             <MdEmail className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl" />
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <input
//               type={showPassword ? 'text' : 'password'}
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full py-3 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-yellow-600 text-gray-700"
//               required
//             />
//             {showPassword ? (
//               <FaLockOpen
//                 className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl cursor-pointer"
//                 onClick={() => setShowPassword(false)}
//               />
//             ) : (
//               <FaLock
//                 className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl cursor-pointer"
//                 onClick={() => setShowPassword(true)}
//               />
//             )}
//           </div>

//           {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//           <button
//             type="submit"
//             className="btn w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto"
//           >
//             Sign In
//           </button>

//           {/* Divider */}
//           <div className="flex items-center my-4">
//             <div className="flex-grow h-[1px] bg-gray-300" />
//             <span className="mx-4 text-gray-500 text-sm font-medium">or sign in with</span>
//             <div className="flex-grow h-[1px] bg-gray-300" />
//           </div>

//           {/* OAuth */}
//           <div className="flex gap-4">
//             <button
//               type="button"
//               onClick={() => handleOAuthLogin('google')}
//               className="p-5 flex items-center justify-center gap-2 w-full py-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition-transform hover:scale-105"
//             >
//               <Image src="/img/signup/search.png" alt="Google" width={20} height={20} />
//               Google
//             </button>

//             <button
//               type="button"
//               onClick={() => handleOAuthLogin('facebook')}
//               className="p-5 flex items-center justify-center gap-2 w-full py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-transform hover:scale-105"
//             >
//               <Image
//                 src="/img/signup/icons8-facebook-50.png"
//                 alt="Facebook"
//                 width={20}
//                 height={20}
//               />
//               Facebook
//             </button>
//           </div>
//         </form>

//         <p className="mt-6 text-sm text-gray-600">
//           Don&apos;t have an account?{' '}
//           <Link href="/signup" className="text-blue-500 font-medium hover:underline">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignIn;



'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MdEmail } from 'react-icons/md';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../app/(site)/lib/supabaseClient';

const SignIn = () => {
  const router = useRouter();
  const { user, signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ⏪ Автовхід якщо вже є сесія
  useEffect(() => {
    if (user) {
      const role = user.user_metadata?.role || 'user';
      router.push(role === 'admin' ? '/admin' : '/');
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn(email, password, remember);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }

    setLoading(false);
  };

  const handleOAuthLogin = async (provider: 'google' | 'facebook') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) setError(error.message);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen p-16">
      {/* LEFT PANEL */}
      <div className="space-y-6 hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-orange-200 to-blue-300 text-amber-900 w-full lg:w-1/2 p-6">
        <h2 className="text-3xl text-yellow-700 font-semibold animate-pulse">UpLadoMyr Digital</h2>
        <p className="text-lg text-center max-w-sm italic">
          Empowering businesses with elegant, scalable, and user-friendly digital solutions.
        </p>
        <Image
          src="/img/signup/loginimg.avif"
          alt="Login Illustration"
          width={300}
          height={300}
          className="rounded-md shadow-lg"
        />
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-col pt-10 justify-center items-center w-full lg:w-1/2 bg-white p-10 sm:p-12">
        <h2 className="text-2xl pt-10 font-bold mb-4 text-yellow-900">Welcome Back!</h2>

        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-3 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-yellow-600 text-gray-700"
              required
            />
            <MdEmail className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl" />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-3 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-yellow-600 text-gray-700"
              required
            />
            {showPassword ? (
              <FaLockOpen
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaLock
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-600 text-xl cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          {/* Remember Me */}
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
              className="accent-yellow-600"
            />
            Remember me
          </label>

          {/* Error */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="btn w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-[1px] bg-gray-300" />
            <span className="mx-4 text-gray-500 text-sm font-medium">or</span>
            <div className="flex-grow h-[1px] bg-gray-300" />
          </div>

          {/* OAuth */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleOAuthLogin('google')}
              className="p-5 flex items-center justify-center gap-2 w-full py-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition-transform hover:scale-105"
            >
              <Image src="/img/signup/search.png" alt="Google" width={20} height={20} />
              Google
            </button>

            <button
              type="button"
              onClick={() => handleOAuthLogin('facebook')}
              className="p-5 flex items-center justify-center gap-2 w-full py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-transform hover:scale-105"
            >
              <Image
                src="/img/signup/icons8-facebook-50.png"
                alt="Facebook"
                width={20}
                height={20}
              />
              Facebook
            </button>
          </div>
        </form>

        <p className="mt-6 text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-blue-500 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;





