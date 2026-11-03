import React from 'react';
import Link from 'next/link';

const Registerpage = () => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#fff8eb] text-[#604326]">

            {/* Registration Section */}
            <main className="relative z-10 flex min-h-[calc(100vh-70px)] items-center justify-center px-8 py-10">

                <div className="w-full max-w-[500] rounded-[22px] border border-[#f3dfc1] bg-[#fffaf1]/90 px-6 py-6 shadow-[0_8px_30px_rgba(135,91,43,0.12)] sm:max-w-[500] sm:px-10">

                    {/* Book Icon */}
                    <div className="mb-1 flex items-center justify-center gap-5">
                        <div className="h-px w-16 bg-linear-to-r from-transparent to-[#a46b36]"></div>

                        <svg
                            width="48"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#925b2e"
                            strokeWidth="1.5"
                        >
                            <path d="M12 7v14M12 7C8 3 3 4 2 5v15c4-1 7-1 10 2M12 7c4-3 9-3 10-2v15c-4-1-7-1-10 2" />
                        </svg>

                        <div className="h-px w-16 bg-linear-to-l from-transparent to-[#a46b36]"></div>
                    </div>

                    {/* Heading */}
                    <div className="mb-5 text-center">
                        <h1 className="font-serif text-[27px] font-bold text-[#58391f]">
                            Create Your Account!
                        </h1>

                        <p className="mt-1 text-xs text-[#765b40]">
                            Join BookNook and start your reading journey today.
                        </p>
                    </div>


                    {/* Registration Form */}
                    <form className="space-y-3">

                        {/* Name */}
                        <div>
                            <label className="-mb-px inline-flex items-center gap-2 rounded-t-xl bg-[#f8e9d2] px-3 py-1 text-xs font-bold">
                                <span className="text-base">👤</span>
                                Name
                            </label>

                            <input
                                type="text"
                                name="text"
                                placeholder="Enter your full name"
                                className="w-full rounded-xl border border-[#f2dfc1] bg-transparent px-4 py-2.5 text-sm outline-none transition placeholder:text-[#a18e78] focus:border-[#a46b36] focus:ring-2 focus:ring-[#a46b36]/10"
                            />
                        </div>


                        {/* Email */}
                        <div>
                            <label className="-mb-px inline-flex items-center gap-2 rounded-t-xl bg-[#f8e9d2] px-3 py-1 text-xs font-bold">
                                <span className="text-base">✉</span>
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                className="w-full rounded-xl border border-[#f2dfc1] bg-transparent px-4 py-2.5 text-sm outline-none transition placeholder:text-[#a18e78] focus:border-[#a46b36] focus:ring-2 focus:ring-[#a46b36]/10"
                            />
                        </div>


                        {/* Photo URL */}
                        <div>
                            <label className="-mb-px inline-flex items-center gap-2 rounded-t-xl bg-[#f8e9d2] px-3 py-1 text-xs font-bold">
                                <span className="text-base">▣</span>
                                Photo URL
                            </label>

                            <input
                                type="url"
                                name="url"
                                placeholder="Enter photo URL (e.g. https://...)"
                                className="w-full rounded-xl border border-[#f2dfc1] bg-transparent px-4 py-2.5 text-sm outline-none transition placeholder:text-[#a18e78] focus:border-[#a46b36] focus:ring-2 focus:ring-[#a46b36]/10"
                            />
                        </div>


                        {/* Password */}
                        <div>
                            <label className="-mb-px inline-flex items-center gap-2 rounded-t-xl bg-[#f8e9d2] px-3 py-1 text-xs font-bold">
                                <span className="text-base">🔒</span>
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    className="w-full rounded-xl border border-[#f2dfc1] bg-transparent px-4 py-2.5 pr-10 text-sm outline-none transition placeholder:text-[#a18e78] focus:border-[#a46b36] focus:ring-2 focus:ring-[#a46b36]/10"
                                />

                                <span className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-base">
                                    👁
                                </span>
                            </div>
                        </div>


                        {/* Register Button */}
                        <button
                            type="submit"
                            className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#a46b36] to-[#8b5528] py-2.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                        >
                            <span className="text-lg">♟</span>
                            Register
                        </button>

                    </form>


                    {/* Login Redirect */}
                    <p className="mt-4 text-center text-[11px] text-[#765b40]">
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            className="ml-1 font-bold text-[#8b5528] underline underline-offset-2 hover:text-[#a46b36]"
                        >
                            Login
                        </Link>
                    </p>

                </div>
            </main>
        </div>
    );
};

export default Registerpage;