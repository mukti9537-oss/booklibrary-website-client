"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Borrow {
    _id: string;
    bookId: string;
    bookTitle: string;
    bookImage: string;
    borrowedAt: string;
    returnDate?: string;
}

const MyBorrowPage = () => {
    const [borrows, setBorrows] = useState<Borrow[]>([]);
    const [loading, setLoading] = useState(true);
    const [returningId, setReturningId] = useState<string | null>(null);

    // Date formatting
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    // Calculate return date
    const getReturnDate = (borrow: Borrow) => {
        if (borrow.returnDate) {
            return borrow.returnDate;
        }

        const date = new Date(borrow.borrowedAt);
        date.setDate(date.getDate() + 14);

        return date.toISOString();
    };

    //Fetch borrowed books

    useEffect(() => {
        const fetchBorrows = async () => {
            try {
                const sessionRes = await fetch("/api/auth/get-session", {
                    credentials: "include",
                });
                const session = await sessionRes.json();
                const userEmail = session?.user?.email;

                if (!userEmail) return;

                const res = await fetch(`http://localhost:8000/my-borrows/${userEmail}`, {
                    credentials: "include",
                });

                const data = await res.json();

                if (res.ok) {
                    setBorrows(Array.isArray(data) ? data : data.borrows || []);
                }

            } catch (error) {
                console.error("Failed to fetch borrows:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBorrows();
    }, []);

    // Return book
    const handleReturnBook = async (id: string) => {
        try {
            setReturningId(id);

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-borrows/${id}`, {
                method: "DELETE",
                credentials: "include",
            });


            if (res.ok) {
                setBorrows(prev => prev.filter(borrow => borrow._id !== id));
                toast.success("Book returned successfully!");
            } else {
                toast.error("Failed to return book!");
            }
        } catch {
            toast.error("Something went wrong!");
        } finally {
            setReturningId(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-[#fffaf0]">
                <p className="text-xl text-[#8b674b]">Loading your books...</p>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-[#fffaf0] px-5 py-12 md:px-10">

            {/* Heading */}
            <div className="max-w-6xl mx-auto text-center mb-10">

                <div className="flex items-center justify-center gap-6 mb-3">
                    <span className="hidden md:block h-px w-40 bg-[#d9b58b]"></span>

                    <span className="text-5xl text-[#a3652e]">♧</span>

                    <span className="hidden md:block h-px w-40 bg-[#d9b58b]"></span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-[#4b2e1c]">
                    My Borrows
                </h1>

                <p className="text-lg md:text-xl text-[#8b674b] mt-3">
                    Here are the books you have borrowed
                </p>

            </div>

            {/* Borrow Table */}
            <div className="max-w-7xl mx-auto">

                {borrows.length === 0 ? (

                    <div className="bg-[#f7ead5] rounded-2xl py-16 text-center">
                        <p className="text-2xl font-semibold text-[#4b2e1c]">
                            No borrowed books yet!
                        </p>

                        <p className="text-[#8b674b] mt-2">
                            Your borrowed books will appear here.
                        </p>
                    </div>

                ) : (

                    <div className="overflow-x-auto rounded-2xl border border-[#f0dfc5] shadow-md">

                        <table className="w-full min-w-[900] text-left">

                            <thead className="bg-[#f5e5cb] text-[#4b2e1c]">

                                <tr>
                                    <th className="px-6 py-5 text-lg font-bold text-center">
                                        Book Image
                                    </th>

                                    <th className="px-6 py-5 text-lg font-bold">
                                        Title
                                    </th>

                                    <th className="px-6 py-5 text-lg font-bold">
                                        Borrow Date
                                    </th>

                                    <th className="px-6 py-5 text-lg font-bold">
                                        Return Date
                                    </th>

                                    <th className="px-6 py-5 text-lg font-bold text-center">
                                        Action
                                    </th>
                                </tr>

                            </thead>

                            <tbody>

                                {borrows.map((borrow) => (

                                    <tr
                                        key={borrow._id}
                                        className="border-t border-[#f0dfc5] hover:bg-[#fcf3e5] transition"
                                    >

                                        {/* Book Image */}
                                        <td className="px-6 py-3 text-center">
                                            {borrow.bookImage && (
                                                <Image
                                                    width={20}
                                                    height={20}
                                                    src={borrow.bookImage}
                                                    alt={borrow.bookTitle}
                                                    unoptimized
                                                    className="w-24 h-28 object-cover rounded-lg mx-auto shadow-sm"
                                                />
                                            )}
                                        </td>

                                        {/* Book Title */}
                                        <td className="px-6 py-5">
                                            <p className="text-lg font-semibold text-[#4b2e1c]">
                                                {borrow.bookTitle}
                                            </p>
                                        </td>

                                        {/* Borrow Date */}
                                        <td className="px-6 py-5">
                                            <p className="text-lg text-[#5e4635] whitespace-nowrap">
                                                📅 {formatDate(borrow.borrowedAt)}
                                            </p>
                                        </td>

                                        {/* Return Date */}
                                        <td className="px-6 py-5">
                                            <p className="text-lg text-[#5e4635] whitespace-nowrap">
                                                📅 {formatDate(getReturnDate(borrow))}
                                            </p>
                                        </td>

                                        {/* Return Button */}
                                        <td className="px-6 py-5 text-center">

                                            <button
                                                onClick={() => handleReturnBook(borrow._id)}
                                                disabled={returningId === borrow._id}
                                                className="bg-[#a3652e] hover:bg-[#854c20] disabled:opacity-60 text-white font-semibold px-6 py-4 rounded-xl shadow-md transition whitespace-nowrap"
                                            >
                                                {returningId === borrow._id
                                                    ? "Returning..."
                                                    : "↪ Return Book"}
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </section>
    );
};

export default MyBorrowPage;