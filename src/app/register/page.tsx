"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const Registerpage = () => {

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");

    // Registration Handler
    const handleRegister = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const name = formData.get("text") as string;
        const email = formData.get("email") as string;
        const image = formData.get("url") as string;
        const password = formData.get("password") as string;


        // Password Validation

        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters.");
            return;
        }

        if (!/[A-Z]/.test(password)) {
            setPasswordError("Password must contain an uppercase letter.");
            return;
        }

        if (!/[a-z]/.test(password)) {
            setPasswordError("Password must contain a lowercase letter.");
            return;
        }

        setPasswordError("");


        try {

            setLoading(true);

            const result = await authClient.signUp.email({
                name,
                email,
                password,
                image: image || undefined,
            });

            if (result.error) {
                toast.error(result.error.message || "Registration failed!");
                return;
            }

            toast.success("Registration successful!");

            form.reset();

            router.push("/login");

        } catch (error) {

            console.error(error);
            toast.error("Something went wrong. Please try again.");

        } finally {

            setLoading(false);

        }

    };


    // Google Registration

    const handleGoogleRegister = async () => {

        try {

            setGoogleLoading(true);

            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });

        } catch (error) {

            console.error(error);
            toast.error("Google registration failed!");
            setGoogleLoading(false);

        }

    };


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

                    <form onSubmit={handleRegister} className="space-y-3">

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
                                required
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
                                required
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
                                type="file"
                                name="file"
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
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    required
                                    onChange={() => setPasswordError("")}
                                    className="w-full rounded-xl border border-[#f2dfc1] bg-transparent px-4 py-2.5 pr-10 text-sm outline-none transition placeholder:text-[#a18e78] focus:border-[#a46b36] focus:ring-2 focus:ring-[#a46b36]/10"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-base"
                                >
                                    {showPassword ? "🙈" : "👁"}
                                </button>

                            </div>

                            {/* Password Error */}

                            {passwordError && (

                                <p className="mt-1 text-xs text-red-600">
                                    {passwordError}
                                </p>

                            )}

                        </div>


                        {/* Register Button */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#a46b36] to-[#8b5528] py-2.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-60"
                        >

                            <span className="text-lg">♟</span>

                            {loading ? "Registering..." : "Register"}

                        </button>

                    </form>


                    {/* Google Login */}

                    <div className="my-4 flex items-center gap-3">

                        <div className="h-px flex-1 bg-[#ead8bd]"></div>

                        <span className="text-xs text-[#9b8062]">
                            OR
                        </span>

                        <div className="h-px flex-1 bg-[#ead8bd]"></div>

                    </div>


                    <button
                        type="button"
                        onClick={handleGoogleRegister}
                        disabled={googleLoading}
                        className="flex w-full items-center justify-center gap-3 rounded-full border border-[#ead8bd] bg-white py-2.5 text-sm font-semibold text-[#604326] transition hover:bg-[#f8ead7] disabled:opacity-60"
                    >

                        <span className="text-lg font-bold text-blue-600">
                            G
                        </span>

                        {googleLoading ? "Connecting..." : "Continue with Google"}

                    </button>


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
