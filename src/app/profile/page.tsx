"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    User,
    Mail,
    CalendarDays,
    Pencil,
    Save,
    X,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const MyProfilePage = () => {
    const { data: session, isPending } = authClient.useSession();

    const user = session?.user;

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
    });
    // Handle name change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    // Open edit mode
    const handleEdit = () => {
        setFormData({
            name: user?.name || "",
        });

     
        setIsEditing(true);
    };

    // Update profile
    const handleUpdateProfile = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        try {
            setLoading(true);

            // Update name using Better Auth
            const result = await authClient.updateUser({
                name: formData.name,
            });

            if (result.error) {
                toast.error(
                    result.error.message || "Profile update failed!"
                );
                return;
            }

            toast.success("Profile updated successfully!");
            setIsEditing(false);

        } catch (error) {
            console.error("Profile update error:", error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    // Cancel editing
    const handleCancel = () => {
        setFormData({
            name: user?.name || "",
        });
        setIsEditing(false);
    };

    // Loading state
    if (isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#fffaf0]">
                <span className="loading loading-spinner loading-lg text-[#a3652e]"></span>
            </div>
        );
    }

    // Login check
    if (!user) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#fffaf0]">
                <h2 className="text-2xl font-bold text-[#382719]">
                    Please Login First
                </h2>

                <Link
                    href="/login"
                    className="rounded-full bg-[#a3652e] px-8 py-3 font-semibold text-white"
                >
                    Login
                </Link>
            </div>
        );
    }

    // Member date
    const memberSince = user.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        })
        : "Not available";

    return (
        <div className="min-h-screen bg-[#fffaf0] text-[#382719]">

            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-[#f0dfc9] bg-linear-to-r from-[#fff4e3] via-[#fffaf0] to-[#fce8cc] px-6 py-12 md:px-16">

                <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-[#f5dfc1]/50 blur-3xl"></div>

                <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-6">

                    <div>
                        <h1 className="flex items-center gap-4 font-serif text-4xl font-bold text-[#382719] md:text-6xl">
                            <User className="h-10 w-10 text-[#a3652e] md:h-14 md:w-14" />
                            My Profile
                        </h1>

                        <p className="mt-4 text-base text-[#79563a] md:text-lg">
                            Manage your account and view your details here.
                        </p>

                        <div className="mt-5 h-[2] w-40 bg-linear-to-r from-[#a3652e] to-transparent"></div>
                    </div>

                </div>
            </section>

            {/* Main Profile Section */}
            <main className="mx-auto max-w-7xl px-5 py-10 md:px-10">

                <div className="w-full overflow-hidden rounded-[25px] border border-[#f2dfc5] bg-[#fffaf1] shadow-[0_8px_30px_rgba(135,91,43,0.10)]">

                    <section className="w-full min-w-0 p-5 md:p-8">

                        {/* Profile Header */}
                        <div className="flex flex-col justify-between gap-6 border-b border-[#eadbc6] pb-7 md:flex-row md:items-center">

                            <div className="flex items-center gap-6">

                              

                                <div>
                                    <h2 className="font-serif text-2xl font-bold text-[#382719] md:text-3xl">
                                        {user.name}
                                    </h2>

                                    <p className="mt-2 flex items-center gap-2 text-sm text-[#79563a] md:text-base">
                                        <Mail size={18} />
                                        {user.email}
                                    </p>
                                </div>

                            </div>

                            {!isEditing && (
                                <button
                                    onClick={handleEdit}
                                    className="flex items-center justify-center gap-2 rounded-full bg-[#a3652e] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[#824b20]"
                                >
                                    <Pencil size={18} />
                                    Edit Profile
                                </button>
                            )}

                        </div>

                        {/* Profile Information */}
                        {!isEditing ? (

                            <>

                                <div className="mt-7 grid grid-cols-1 gap-6 rounded-2xl bg-[#f9ecd8] p-6 md:grid-cols-2">

                                    <div className="flex gap-4">
                                        <User className="mt-1 shrink-0" size={21} />

                                        <div>
                                            <h3 className="font-bold">
                                                Full Name
                                            </h3>

                                            <p className="mt-1 text-[#79563a]">
                                                {user.name}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <Mail className="mt-1 shrink-0" size={21} />

                                        <div>
                                            <h3 className="font-bold">
                                                Email Address
                                            </h3>

                                            <p className="mt-1 break-all text-[#79563a]">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>

                                  

                                    <div className="flex gap-4">
                                        <CalendarDays className="mt-1 shrink-0" size={21} />

                                        <div>
                                            <h3 className="font-bold">
                                                Member Since
                                            </h3>

                                            <p className="mt-1 text-[#79563a]">
                                                {memberSince}
                                            </p>
                                        </div>
                                    </div>

                                </div>

                             

                            </>

                        ) : (

                            /* Edit Profile Form */
                            <form
                                onSubmit={handleUpdateProfile}
                                className="mt-7 space-y-6"
                            >

                                <div>
                                    <h2 className="font-serif text-2xl font-bold text-[#382719]">
                                        Edit Profile
                                    </h2>

                                    <p className="mt-1 text-sm text-[#79563a]">
                                        Update your information anytime.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                                    {/* Name */}
                                    <div>
                                        <label className="mb-2 flex items-center gap-2 font-semibold">
                                            <User size={18} />
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-xl border border-[#ead0b1] bg-[#fffaf1] px-4 py-3 outline-none transition focus:border-[#a3652e]"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="mb-2 flex items-center gap-2 font-semibold">
                                            <Mail size={18} />
                                            Email Address
                                        </label>

                                        <input
                                            type="email"
                                            value={user.email}
                                            readOnly
                                            className="w-full cursor-not-allowed rounded-xl border border-[#ead0b1] bg-[#f1e9df] px-4 py-3 text-gray-500 outline-none"
                                        />
                                    </div>

                                 

                                    {/* Member Since */}
                                    <div>
                                        <label className="mb-2 flex items-center gap-2 font-semibold">
                                            <CalendarDays size={18} />
                                            Member Since
                                        </label>

                                        <input
                                            type="text"
                                            value={memberSince}
                                            readOnly
                                            className="w-full cursor-not-allowed rounded-xl border border-[#ead0b1] bg-[#f1e9df] px-4 py-3 text-gray-500 outline-none"
                                        />
                                    </div>

                                </div>

                                {/* Buttons */}
                                <div className="flex flex-wrap gap-4">

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex items-center gap-3 rounded-full bg-[#a3652e] px-8 py-4 font-bold text-white shadow-md transition hover:bg-[#824b20] disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        <Save size={19} />

                                        {loading ? "Saving..." : "Save Changes"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        disabled={loading}
                                        className="flex items-center gap-2 rounded-full border border-[#a3652e] px-8 py-4 font-bold text-[#70421f] transition hover:bg-[#f9ecd8]"
                                    >
                                        <X size={19} />
                                        Cancel
                                    </button>

                                </div>

                            </form>

                        )}

                    </section>

                </div>

            </main>

        </div>
    );


};

export default MyProfilePage;
