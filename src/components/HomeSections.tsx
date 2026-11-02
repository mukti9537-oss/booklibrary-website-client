"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Book {
    _id: string;
    bookTitle: string;
    authorName: string;
    category: string;
    bookImage: string;
}

const categories = [
    { name: "Fiction", icon: "📖" },
    { name: "Education", icon: "🎓" },
    { name: "Self-Help", icon: "♡" },
    { name: "Technology", icon: "💻" },
    { name: "Classics", icon: "🖋️" },
    { name: "Science", icon: "⚛" },
];

export default function HomeSections() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8000/homebooks")
            .then((res) => res.json())
            .then((data) => {
                setBooks(data);
            })
            .catch((error) => {
                console.error("Failed to load books:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <main className="bg-[#fff8ed] px-4 py-12 md:px-8">

            {/* NEW ARRIVALS */}

            <section className="mx-auto max-w-7xl">

                <div className="mb-8 text-center">
                    <div className="mb-2 text-3xl text-[#95602f]">♧</div>

                    <div className="flex items-center justify-center gap-5">
                        <span className="hidden h-px w-24 bg-[#95602f] md:block"></span>

                        <h2 className="text-3xl font-bold text-[#422d1d] md:text-4xl">
                            New Arrivals
                        </h2>

                        <span className="hidden h-px w-24 bg-[#95602f] md:block"></span>
                    </div>

                    <p className="mt-2 text-[#806e5c]">
                        Discover the latest additions to our library
                    </p>
                </div>

                {loading ? (
                    <div className="py-16 text-center text-[#95602f]">
                        Loading latest books...
                    </div>
                ) : books.length === 0 ? (
                    <div className="py-16 text-center text-[#806e5c]">
                        No books available yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">

                        {books.map((book) => (
                            <div
                                key={book._id}
                                className="group overflow-hidden rounded-xl border border-[#eadcc8] bg-[#fffaf2] p-3 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg"
                            >

                                <div className="flex h-44 items-center justify-center overflow-hidden rounded-lg bg-[#f5ead8]">
                                    <Image
                                        width={2}
                                        height={2}
                                        src={book.bookImage}
                                        alt={book.bookTitle}
                                        unoptimized
                                        className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                                    />
                                </div>

                                <div className="pt-3 text-center">

                                    <h3 className="truncate font-bold text-[#422d1d]">
                                        {book.bookTitle}
                                    </h3>

                                    <p className="mt-1 truncate text-sm text-[#806e5c]">
                                        {book.authorName}
                                    </p>

                                    <span className="mt-3 inline-block rounded-full bg-[#f3e5ce] px-4 py-1 text-xs font-medium text-[#674526]">
                                        {book.category}
                                    </span>

                                    <Link
                                        href={`/allbooks/${book._id}`}
                                        className="mt-4 block rounded-lg bg-[#95602f] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#75451f]"
                                    >
                                        View Details →
                                    </Link>

                                </div>
                            </div>
                        ))}

                    </div>
                )}

                <div className="mt-8 text-center">
                    <Link
                        href="/allbooks"
                        className="inline-flex items-center gap-2 rounded-full bg-[#95602f] px-7 py-3 font-semibold text-white shadow-md transition hover:bg-[#75451f]"
                    >
                        See All Books →
                    </Link>
                </div>

            </section>


            {/* HOW BORROWING WORKS */}

            <section className="mx-auto mt-12 max-w-7xl rounded-3xl border border-[#eadcc8] bg-[#f8eddb] px-6 py-10">

                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#422d1d] md:text-3xl">
                        ♧ How Borrowing Works
                    </h2>

                    <p className="mt-2 text-[#806e5c]">
                        Get your favorite books in just a few simple steps
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-1 items-center gap-8 md:grid-cols-3">

                    <div className="text-center">
                        <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#674526] font-bold text-white">
                            1
                        </span>

                        <div className="my-3 text-4xl">🔍</div>

                        <h3 className="text-lg font-bold text-[#422d1d]">
                            Search & Find
                        </h3>

                        <p className="mx-auto mt-2 max-w-52 text-sm text-[#806e5c]">
                            Browse our vast collection and find the book you love.
                        </p>
                    </div>

                    <div className="text-center">
                        <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#674526] font-bold text-white">
                            2
                        </span>

                        <div className="my-3 text-4xl">📖</div>

                        <h3 className="text-lg font-bold text-[#422d1d]">
                            Borrow It
                        </h3>

                        <p className="mx-auto mt-2 max-w-52 text-sm text-[#806e5c]">
                            Click borrow and enjoy reading for a limited time.
                        </p>
                    </div>

                    <div className="text-center">
                        <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#674526] font-bold text-white">
                            3
                        </span>

                        <div className="my-3 text-4xl">📚</div>

                        <h3 className="text-lg font-bold text-[#422d1d]">
                            Return
                        </h3>

                        <p className="mx-auto mt-2 max-w-52 text-sm text-[#806e5c]">
                            Return the book easily and keep reading!
                        </p>
                    </div>

                </div>
            </section>


            {/* TOP CATEGORIES */}

            <section className="mx-auto mt-12 max-w-7xl">

                <div className="mb-8 text-center">

                    <div className="flex items-center justify-center gap-5">

                        <span className="hidden h-px w-24 bg-[#95602f] md:block"></span>

                        <h2 className="text-3xl font-bold text-[#422d1d] md:text-4xl">
                            ♧ Top Categories
                        </h2>

                        <span className="hidden h-px w-24 bg-[#95602f] md:block"></span>

                    </div>

                    <p className="mt-2 text-[#806e5c]">
                        Explore books by your favorite category
                    </p>

                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">

                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href={`/all-books?category=${encodeURIComponent(category.name)}`}
                            className="group flex flex-col items-center justify-center rounded-xl border border-[#eadcc8] bg-[#fffaf2] px-3 py-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#95602f] hover:shadow-md"
                        >

                            <span className="text-4xl text-[#68784c] transition group-hover:scale-110">
                                {category.icon}
                            </span>

                            <h3 className="mt-3 font-semibold text-[#422d1d]">
                                {category.name}
                            </h3>

                        </Link>
                    ))}

                </div>

            </section>

        </main>
    );
}