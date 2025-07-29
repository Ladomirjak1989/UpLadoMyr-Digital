// 'use client';

// import { useState } from 'react';
// import { supabase } from '@/app/(site)/lib/supabaseClient';
// import { useRouter } from 'next/navigation';
// import { FaUser, FaLock, FaLockOpen } from 'react-icons/fa';
// import { MdEmail } from 'react-icons/md';
// import Image from 'next/image';
// import Link from 'next/link';

// const SignUp = () => {
//   const router = useRouter();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [username, setUsername] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [agreed, setAgreed] = useState(false);
//   const [isPasswordShow, setPasswordShow] = useState(false);
//   const [isConfirmPasswordShow, setConfirmPasswordShow] = useState(false);

//   const handleSignUp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     if (!agreed) return setError('You must agree to the terms and conditions.');
//     if (!email || !password || !confirmPassword || !username) {
//       return setError('Please fill in all fields.');
//     }
//     if (password !== confirmPassword) {
//       return setError('Passwords do not match.');
//     }

//     setLoading(true);
//     const { error: signUpError } = await supabase.auth.signUp({
//       email,
//       password,
//       options: { data: { username } },
//     });

//     setLoading(false);

//     if (signUpError) {
//       setError(signUpError.message);
//     } else {
//       router.push('/verify-email');
//     }
//   };

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen p-16">
//       {/* Left Panel */}
//       <div className="space-y-6 hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-orange-200 to-blue-300 text-amber-900 w-full lg:w-1/2 p-6">
//         <p className="text-center text-lg italic mt-6 max-w-sm">
//           <span className="text-3xl text-yellow-700 font-semibold animate-pulse">
//             UpLadoMyr Digital
//           </span>
//           <br />
//           Turning ideas into scalable websites and smart digital solutions.
//           <br />
//           Let’s build your future — pixel by pixel, line by line.
//         </p>
//         <Image
//           src="/img/signup/welkom2.avif"
//           alt="Welcome Image"
//           width={300}
//           height={300}
//           className="rounded-md shadow-lg"
//         />
//       </div>

//       {/* Right Panel */}
//       <div className="w-full lg:w-1/2 flex justify-center items-center bg-white p-6 sm:p-10">
//         <form onSubmit={handleSignUp} className="w-full max-w-sm space-y-4">
//           <h2 className="pt-12 text-2xl text-yellow-900 font-bold text-center">Welcome</h2>
//           <p className="text-xl font-bold text-yellow-700 text-center">Create your account</p>

//           {/* Username */}
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full border px-4 py-2 rounded-lg"
//               required
//             />
//             <FaUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600" />
//           </div>

//           {/* Email */}
//           <div className="relative">
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border px-4 py-2 rounded-lg"
//               required
//             />
//             <MdEmail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600" />
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <input
//               type={isPasswordShow ? 'text' : 'password'}
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full border px-4 py-2 rounded-lg"
//               required
//             />
//             {isPasswordShow ? (
//               <FaLockOpen
//                 onClick={() => setPasswordShow(false)}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
//               />
//             ) : (
//               <FaLock
//                 onClick={() => setPasswordShow(true)}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
//               />
//             )}
//           </div>

//           {/* Confirm Password */}
//           <div className="relative">
//             <input
//               type={isConfirmPasswordShow ? 'text' : 'password'}
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="w-full border px-4 py-2 rounded-lg"
//               required
//             />
//             {isConfirmPasswordShow ? (
//               <FaLockOpen
//                 onClick={() => setConfirmPasswordShow(false)}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
//               />
//             ) : (
//               <FaLock
//                 onClick={() => setConfirmPasswordShow(true)}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
//               />
//             )}
//           </div>

//           {/* Terms */}
//           <label className="flex items-center text-sm gap-2">
//             <input
//               type="checkbox"
//               checked={agreed}
//               onChange={() => setAgreed(!agreed)}
//               className="accent-blue-600"
//             />
//             I agree to the
//             <Link href="/terms" className="text-blue-600 underline">
//               Terms & Conditions
//             </Link>
//           </label>

//           {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//           <button
//             type="submit"
//             className="btn w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto"
//           >
//             Sign Up
//           </button>

//           <p className="text-center text-sm">
//             Already have an account?
//             <Link href="/signin" className="text-blue-600 ml-1 hover:underline">
//               Sign In
//             </Link>
//           </p>

//           <div className="flex items-center justify-center gap-4 mt-4">
//             <button
//               type="button"
//               className="flex items-center gap-2 px-4 py-2 bg-gray-100 border rounded-xl hover:bg-gray-200 transition-transform hover:scale-105"
//             >
//               <Image src="/img/signup/search.png" alt="Google" width={20} height={20} /> Google
//             </button>
//             <button
//               type="button"
//               className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-transform hover:scale-105"
//             >
//               <Image
//                 src="/img/signup/icons8-facebook-50.png"
//                 alt="Facebook"
//                 width={20}
//                 height={20}
//               />{' '}
//               Facebook
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

// 'use client';

// import { useState, useEffect } from 'react';
// import { supabase } from '@/app/(site)/lib/supabaseClient';
// import { useRouter } from 'next/navigation';
// import { FaUser, FaLock, FaLockOpen } from 'react-icons/fa';
// import { MdEmail } from 'react-icons/md';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useAuth } from '@/context/AuthContext'; // 👈 додаємо
// import toast from 'react-hot-toast';


// const SignUp = () => {
//     const router = useRouter();
//     const { user } = useAuth(); // 👈 використовуємо

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [username, setUsername] = useState('');
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [agreed, setAgreed] = useState(false);
//     const [isPasswordShow, setPasswordShow] = useState(false);
//     const [isConfirmPasswordShow, setConfirmPasswordShow] = useState(false);

//     useEffect(() => {
//         if (user) {
//             router.push('/'); // або інша сторінка після реєстрації
//         }
//     }, [user, router]);

//     const handleSignUp = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError('');

//         if (!agreed) {
//             toast.error('You must agree to the terms and conditions.');
//             return setError('You must agree to the terms and conditions.');
//         }

//         if (!email || !password || !confirmPassword || !username) {
//             toast.error('Please fill in all fields.');
//             return setError('Please fill in all fields.');
//         }

//         if (password !== confirmPassword) {
//             toast.error('Passwords do not match.');
//             return setError('Passwords do not match.');
//         }

//         setLoading(true);

//         const { error: signUpError } = await supabase.auth.signUp({
//             email,
//             password,
//             options: { data: { username } },
//         });

//         setLoading(false);

//         if (signUpError) {
//             toast.error(`Sign up failed: ${signUpError.message}`);
//             setError(signUpError.message);
//         } else {
//             toast.success('Account created! Please check your email.');
//             router.push('/verify-email');
//         }
//     };


//     return (
//         <div className="flex flex-col lg:flex-row min-h-screen p-16">
//             {/* Left Panel */}
//             <div className="space-y-6 hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-orange-200 to-blue-300 text-amber-900 w-full lg:w-1/2 p-6">
//                 <p className="text-center text-lg italic mt-6 max-w-sm">
//                     <span className="text-3xl text-yellow-700 font-semibold animate-pulse">
//                         UpLadoMyr Digital
//                     </span>
//                     <br />
//                     Turning ideas into scalable websites and smart digital solutions.
//                     <br />
//                     Let’s build your future — pixel by pixel, line by line.
//                 </p>
//                 <Image
//                     src="/img/signup/welkom2.avif"
//                     alt="Welcome Image"
//                     width={300}
//                     height={300}
//                     className="rounded-md shadow-lg"
//                 />
//             </div>

//             {/* Right Panel */}
//             <div className="w-full lg:w-1/2 flex justify-center items-center bg-white p-6 sm:p-10">
//                 <form onSubmit={handleSignUp} className="w-full max-w-sm space-y-4">
//                     <h2 className="pt-12 text-2xl text-yellow-900 font-bold text-center">Welcome</h2>
//                     <p className="text-xl font-bold text-yellow-700 text-center">Create your account</p>

//                     <div className="relative">
//                         <input
//                             type="text"
//                             placeholder="Username"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             className="w-full border px-4 py-2 rounded-lg"
//                             required
//                         />
//                         <FaUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600" />
//                     </div>

//                     <div className="relative">
//                         <input
//                             type="email"
//                             placeholder="Email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="w-full border px-4 py-2 rounded-lg"
//                             required
//                         />
//                         <MdEmail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600" />
//                     </div>

//                     <div className="relative">
//                         <input
//                             type={isPasswordShow ? 'text' : 'password'}
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="w-full border px-4 py-2 rounded-lg"
//                             required
//                         />
//                         {isPasswordShow ? (
//                             <FaLockOpen
//                                 onClick={() => setPasswordShow(false)}
//                                 className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
//                             />
//                         ) : (
//                             <FaLock
//                                 onClick={() => setPasswordShow(true)}
//                                 className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
//                             />
//                         )}
//                     </div>

//                     <div className="relative">
//                         <input
//                             type={isConfirmPasswordShow ? 'text' : 'password'}
//                             placeholder="Confirm Password"
//                             value={confirmPassword}
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                             className="w-full border px-4 py-2 rounded-lg"
//                             required
//                         />
//                         {isConfirmPasswordShow ? (
//                             <FaLockOpen
//                                 onClick={() => setConfirmPasswordShow(false)}
//                                 className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
//                             />
//                         ) : (
//                             <FaLock
//                                 onClick={() => setConfirmPasswordShow(true)}
//                                 className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
//                             />
//                         )}
//                     </div>

//                     <label className="flex items-center text-sm gap-2">
//                         <input
//                             type="checkbox"
//                             checked={agreed}
//                             onChange={() => setAgreed(!agreed)}
//                             className="accent-blue-600"
//                         />
//                         I agree to the
//                         <Link href="/terms" className="text-blue-600 underline">
//                             Terms & Conditions
//                         </Link>
//                     </label>

//                     {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//                     <button
//                         type="submit"
//                         className="btn w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto"
//                         disabled={loading}
//                     >
//                         {loading ? 'Creating...' : 'Sign Up'}
//                     </button>

//                     <p className="text-center text-sm">
//                         Already have an account?
//                         <Link href="/signin" className="text-blue-600 ml-1 hover:underline">
//                             Sign In
//                         </Link>
//                     </p>

//                     <div className="flex items-center justify-center gap-4 mt-4">
//                         <button
//                             type="button"
//                             className="flex items-center gap-2 px-4 py-2 bg-gray-100 border rounded-xl hover:bg-gray-200 transition-transform hover:scale-105"
//                         >
//                             <Image src="/img/signup/search.png" alt="Google" width={20} height={20} /> Google
//                         </button>
//                         <button
//                             type="button"
//                             className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-transform hover:scale-105"
//                         >
//                             <Image
//                                 src="/img/signup/icons8-facebook-50.png"
//                                 alt="Facebook"
//                                 width={20}
//                                 height={20}
//                             />{' '}
//                             Facebook
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default SignUp;



'use client';

import React from 'react'; 
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaLock, FaLockOpen } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const SignUp = () => {
    const router = useRouter();
    const { user, signUp } = useAuth(); // ⬅️ використовуємо контекст

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [isPasswordShow, setPasswordShow] = useState(false);
    const [isConfirmPasswordShow, setConfirmPasswordShow] = useState(false);

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user, router]);

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
            await signUp(email, password, username);
            toast.success('Account created! Please check your email.');
            router.push('/verify-email');
        } catch (err) {
            console.error('Sign up error:', err);
            // помилка вже обробляється в `signUp()`
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
                            className="accent-blue-600"
                        />
                        I agree to the
                        <Link href="/terms" className="text-blue-600 underline">
                            Terms & Conditions
                        </Link>
                    </label>

                    <button
                        type="submit"
                        className="btn w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto"
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Sign Up'}
                    </button>

                    <p className="text-center text-sm">
                        Already have an account?
                        <Link href="/signin" className="text-blue-600 ml-1 hover:underline">
                            Sign In
                        </Link>
                    </p>

                    {/* OAuth buttons (optional) */}
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



