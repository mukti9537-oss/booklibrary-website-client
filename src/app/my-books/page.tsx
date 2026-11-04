"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import EditMyBookDialog from "@/components/EditMyBookDialog";

interface Book {
    _id: string;
    bookTitle: string;
    authorName: string;
    category: string;
    bookImage: string;
    shortDescription: string;
}
const MyBooksPage = () => {

    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch Books
    const fetchBooks = useCallback(async (): Promise<Book[]> => {
        try {
            const res = await fetch("http://localhost:8000/allbooks");
            const data = await res.json();
            return data;
        } catch (error) {
            console.log("Failed to fetch books", error);
            return [];
        } finally {
        }
    }, []);

    useEffect(() => {
        let isActive = true;

        const loadBooks = async () => {
            const data = await fetchBooks();
            if (isActive) {
                setBooks(data);
                setLoading(false);
            }
        };

        void loadBooks();
        return () => {
            isActive = false;
        };
    }, [fetchBooks]);

    const refreshBooks = useCallback(async () => {
        setBooks(await fetchBooks());
    }, [fetchBooks]);

    if (loading) {
        return <p className="py-20 text-center">Loading books...</p>;
    }

    return (
        <main className="min-h-screen bg-[#fcf3e5] px-5 py-12 text-[#432b1d]">

            <section className="mx-auto max-w-7xl">

                {/* Heading */}
                <div className="mb-10">
                    <h1 className="font-serif text-5xl font-bold">
                        My Books
                    </h1>

                    <p className="mt-3 text-[#80674e]">
                        Manage the books you have added to BookNook.
                    </p>
                </div>

                {/* Total Books */}
                <div className="mb-8 flex items-center justify-between rounded-2xl bg-[#fffaf2] p-5 shadow-sm">

                    <h2 className="text-xl font-semibold">
                        Total Books: {books.length}
                    </h2>

                </div>

                {/* Empty State */}
                {books.length === 0 ? (

                    <div className="rounded-3xl border border-[#ead7bd] bg-[#fffaf2] py-24 text-center">

                        <h2 className="font-serif text-3xl font-bold">
                            No books added yet!
                        </h2>

                        <p className="mt-3 text-[#80674e]">
                            Start building your personal library.
                        </p>

                    </div>

                ) : (

                    /* Book Cards */
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {books.map((book) => (

                            <div
                                key={book._id}
                                className="overflow-hidden rounded-2xl border border-[#ead7bd] bg-[#fffaf2] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                            >

                                <div className="flex gap-5">

                                    {/* Book Image */}
                                    <div className="relative h-48 w-32 shrink-0 overflow-hidden rounded-xl">

                                        <Image
                                            src={book.bookImage}
                                            alt={book.bookTitle}
                                            fill
                                            sizes="128px"
                                            className="object-cover"
                                        />

                                    </div>

                                    {/* Book Information */}
                                    <div className="flex-1">

                                        <h2 className="font-serif text-xl font-bold">
                                            {book.bookTitle}
                                        </h2>

                                        <p className="mt-2 text-sm text-[#80674e]">
                                            By {book.authorName}
                                        </p>

                                        <span className="mt-3 inline-block rounded-full bg-[#ead8c0] px-3 py-1 text-xs font-semibold">
                                            {book.category}
                                        </span>

                                    </div>

                                </div>

                                <p className="mt-5 line-clamp-3 text-sm leading-6 text-[#80674e]">
                                    {book.shortDescription}
                                </p>
                                {/* Edit & Delete Buttons */}
                                <div className="mt-6 flex gap-3">

                                    <EditMyBookDialog
                                        book={book}
                                        onUpdate={refreshBooks}
                                        />

                                    <button

                                        className="flex-1 rounded-full bg-amber-900  font-semibold text-white transition hover:bg-red-700"
                                    >
                                        🗑️ Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </section>

        </main>
    );
};

export default MyBooksPage;