"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { toast } from "react-toastify";

const BorrowCard = ({
    data,
}: {
    data: {
        _id: string;
        bookImage: string;
        bookTitle: string;
    };
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const { data: session } = authClient.useSession();

    const user = session?.user;

    const borrowDate = new Date();
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 14);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const handleBorrow = async () => {
        if (!user) {
            router.push("/login");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch("http://localhost:8000/borrowbook", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    bookId: data._id,
                    bookTitle: data.bookTitle,
                    bookImage: data.bookImage,
                    userEmail: user.email,
                    borrowDate: borrowDate.toISOString(),
                    returnDate: returnDate.toISOString(),
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to borrow book");
            }

            toast.success("Book borrowed successfully!");
            setIsOpen(false);

        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to borrow book");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                className="flex w-full max-w-md items-center justify-center gap-4 rounded-full bg-[#a3652e] px-8 py-5 text-lg font-bold text-white shadow-lg transition duration-300 hover:bg-[#824b20] hover:shadow-xl"
            >
                <span className="text-2xl">♧</span>
                Borrow This Book
                <span className="text-2xl">→</span>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">

                    <div className="relative w-full max-w-2xl rounded-[30px] bg-[#fffaf1] p-6 shadow-2xl md:p-9">

                        {/* Header */}
                        <div className="mb-6 flex items-center justify-between border-b border-[#eadbc7] pb-5">

                            <div>
                                <h2 className="text-3xl font-bold text-[#49321e]">
                                    Borrow Book
                                </h2>

                                <p className="mt-2 text-[#78614b]">
                                    Fill in the details to borrow this book
                                </p>
                            </div>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f4e6d2] text-2xl text-[#824b20] hover:bg-[#ead5b9]"
                            >
                                ×
                            </button>
                        </div>

                        {/* Form */}
                        <div className="grid gap-6 md:grid-cols-2">

                            {/* Book Image */}
                            <div className="flex items-center justify-center rounded-2xl bg-[#f5e8d5] p-4">
                                <Image
                                    width={20}
                                    height={20}
                                    src={data?.bookImage}
                                    alt={data?.bookTitle}
                                    unoptimized
                                    className="h-72 w-full rounded-xl object-contain"
                                />
                            </div>

                            {/* User Information */}
                            <div className="space-y-5">

                                <div>
                                    <label className="mb-2 block font-semibold text-[#49321e]">
                                        ♟ User Name
                                    </label>

                                    <input
                                        type="text"
                                        value={user?.name || ""}
                                        readOnly
                                        className="w-full rounded-xl border border-[#eadbc7] bg-[#f5eadd] px-4 py-4 text-[#49321e] outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block font-semibold text-[#49321e]">
                                        ✉ Email Address
                                    </label>

                                    <input
                                        type="email"
                                        value={user?.email || ""}
                                        readOnly
                                        className="w-full rounded-xl border border-[#eadbc7] bg-[#f5eadd] px-4 py-4 text-[#49321e] outline-none"
                                    />
                                </div>

                            </div>
                        </div>

                        {/* Borrow and Return Date */}
                        <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl bg-[#f5e8d5] p-5">

                            <div>
                                <p className="mb-2 font-medium text-[#98602e]">
                                    📅 Borrow Date
                                </p>

                                <p className="font-bold text-[#49321e]">
                                    {formatDate(borrowDate)}
                                </p>
                            </div>

                            <div className="border-l border-[#dfc9aa] pl-4">
                                <p className="mb-2 font-medium text-[#98602e]">
                                    🔄 Return Date
                                </p>

                                <p className="font-bold text-[#49321e]">
                                    {formatDate(returnDate)}
                                </p>

                                <span className="text-sm text-[#98602e]">
                                    (14 days)
                                </span>
                            </div>

                        </div>

                        {/* Confirm Button */}
                        <button
                            onClick={handleBorrow}
                            disabled={loading || !user}
                            className="mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-[#a3652e] px-6 py-5 text-lg font-bold text-white shadow-lg transition duration-300 hover:bg-[#824b20] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Processing..." : "♧ Confirm Borrow →"}
                        </button>

                        {/* Cancel */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="mt-4 w-full font-medium text-[#824b20] underline"
                        >
                            Cancel
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
};

export default BorrowCard;
