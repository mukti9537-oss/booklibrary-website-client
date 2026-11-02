"use client"
import React from 'react';
import Link from 'next/link';

const LogInpage = () => {
    const handleEmailLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const user = Object.fromEntries(formData.entries())

        console.log(user)

    }
    return (
        <div className="min-h-screen bg-[#fff9ee] text-[#4b2e1c]">

            {/* Login Section */}
            <section className="relative flex min-h-[calc(100vh-90px)] items-center justify-center overflow-hidden px-4 py-12">

                {/* Background Decoration */}
                <div className="absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-[#f5dfbd]/40 blur-3xl"></div>
                <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#f5dfbd]/40 blur-3xl"></div>

                {/* Login Card */}
                <div className="relative z-10 w-full max-w-152.5 rounded-[28px] border border-[#efd7b9] bg-[#fffdf8]/90 px-6 py-10 shadow-[0_12px_35px_rgba(120,75,35,0.10)] sm:px-12 sm:py-12">

                    {/* Heading */}
                    <div className="mb-8 text-center">

                        <div className="mb-4 flex items-center justify-center gap-5">
                            <span className="h-px w-20 bg-[#a46b36]"></span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="55"
                                height="55"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#925b2e"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 7v14" />
                                <path d="M3 18V5a2 2 0 0 1 2-2h4a3 3 0 0 1 3 3 3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-4a3 3 0 0 0-3 3 3 3 0 0 0-3-3H5a2 2 0 0 1-2-2Z" />
                            </svg>

                            <span className="h-px w-20 bg-[#a46b36]"></span>
                        </div>

                        <h1 className="font-serif text-4xl font-bold sm:text-5xl">
                            Welcome Back!
                        </h1>

                        <p className="mt-3 text-base text-[#80654e] sm:text-lg">
                            Log in to your BookNook account and
                            <br className="hidden sm:block" />
                            continue your reading journey.
                        </p>
                    </div>

                    {/* Form Heading */}
                    <div className="mb-8 text-center">
                        <h2 className="font-serif text-3xl font-bold sm:text-4xl">
                            User Login
                        </h2>

                        <div className="mx-auto mt-3 h-0.75 w-20 bg-[#925b2e]"></div>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleEmailLogIn}
                     className="space-y-6">

                        {/* Email */}
                        <div>
                            <label className="mb-2 flex items-center gap-2 text-base font-semibold">
                                <span className="flex h-10 items-center gap-2 rounded-t-xl bg-[#f9e9d0] px-4">
                                    <span className="text-lg">✉</span>
                                    Email
                                </span>
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                className="w-full rounded-2xl border border-[#efd5b5] bg-transparent px-6 py-4 text-base outline-none transition-all placeholder:text-[#a28e79] focus:border-[#925b2e] focus:ring-2 focus:ring-[#925b2e]/10"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-2 flex items-center gap-2 text-base font-semibold">
                                <span className="flex h-10 items-center gap-2 rounded-t-xl bg-[#f9e9d0] px-4">
                                    <span className="text-lg">🔒</span>
                                    Password
                                </span>
                            </label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="w-full rounded-2xl border border-[#efd5b5] bg-transparent px-6 py-4 text-base outline-none transition-all placeholder:text-[#a28e79] focus:border-[#925b2e] focus:ring-2 focus:ring-[#925b2e]/10"
                            />
                        </div>

                        {/* Remember & Forgot Password */}
                        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">

                            <label className="flex cursor-pointer items-center gap-2 font-medium">
                                <input
                                    type="checkbox"
                                    className="h-5 w-5 accent-[#925b2e]"
                                />
                                Remember Me
                            </label>

                            <Link
                                href="/forgot-password"
                                className="font-semibold text-[#925b2e] underline underline-offset-4 hover:text-[#633d20]"
                            >
                                Forgot Password?
                            </Link>

                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full rounded-full bg-linear-to-r from-[#a46b36] to-[#8b5528] py-4 text-lg font-bold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                        >
                            ↪ &nbsp; Login
                        </button>

                        {/* Divider */}
                        <div className="flex items-center gap-3">
                            <span className="h-px flex-1 bg-[#ead7bd]"></span>
                            <span className="text-sm text-[#80654e]">
                                or continue with
                            </span>
                            <span className="h-px flex-1 bg-[#ead7bd]"></span>
                        </div>

                        {/* Google Login */}
                        <button
                            type="button"
                            className="flex w-full items-center justify-center gap-3 rounded-full border border-[#efd5b5] bg-transparent py-4 font-semibold transition-all duration-300 hover:bg-[#f9ead6]"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 48 48"
                            >
                                <path fill="#FFC107" d="M43.6 24.5c0-1.4-.1-2.7-.4-4H24v7.6h11a9.4 9.4 0 0 1-4.1 6.2v5h6.6c3.9-3.6 6.1-8.8 6.1-14.8Z" />
                                <path fill="#FF3D00" d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.5H5.8v5.2A20 20 0 0 0 24 44Z" />
                                <path fill="#4CAF50" d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.2H5.8a20 20 0 0 0 0 17.6l6.8-5.2Z" />
                                <path fill="#1976D2" d="M24 12.9c3 0 5.7 1 7.8 3.1l5.9-5.9C34.1 6.9 29.5 5 24 5A20 20 0 0 0 5.8 15.2l6.8 5.2c1.6-4.9 6.1-7.5 11.4-7.5Z" />
                            </svg>

                            Continue with Google
                        </button>

                        {/* Register Link */}
                        <p className="pt-2 text-center text-base text-[#80654e]">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/register"
                                className="ml-1 font-bold text-[#925b2e] underline underline-offset-4 hover:text-[#633d20]"
                            >
                                Register
                            </Link>
                        </p>

                    </form>
                </div>
            </section>
        </div>
    );
};

export default LogInpage;