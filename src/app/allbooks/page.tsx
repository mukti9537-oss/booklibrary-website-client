"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

interface Book {
    _id: string;
    bookTitle: string;
    authorName: string;
    category: string;
    bookImage: string;
    createdAt?: string;
}

const AllBookspage = () => {

    const [books, setBooks] = useState<Book[]>([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [sortBy, setSortBy] = useState("latest");
    const [loading, setLoading] = useState(true);


    // Fetch All Books
    useEffect(() => {

        const fetchBooks = async () => {
            try {
                const res = await fetch("http://localhost:8000/allbooks");

                if (!res.ok) {
                    throw new Error("Failed to fetch books");
                }

                const data = await res.json();

                const allBooks = Array.isArray(data)
                    ? data
                    : data.books || data.data || [];

                setBooks(allBooks);

            } catch (error) {
                console.error("Error fetching books:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();

    }, []);


    // Get Unique Categories
    const categories = [
        "All Categories",
        ...new Set(
            books
                .map((book) => book.category)
                .filter(Boolean)
        ),
    ];


    // Get Book Creation Date
    const getBookDate = (book: Book) => {

        if (book.createdAt) {
            return new Date(book.createdAt).getTime();
        }

        // MongoDB ObjectId timestamp fallback
        return parseInt(book._id.substring(0, 8), 16) * 1000;

    };


    // Search, Filter and Sort
    const filteredBooks = useMemo(() => {

        let result = [...books];

        // Search Functionality
        if (search.trim()) {

            const searchText = search.toLowerCase().trim();

            result = result.filter((book) =>
                book.bookTitle?.toLowerCase().includes(searchText) ||
                book.authorName?.toLowerCase().includes(searchText) ||
                book.category?.toLowerCase().includes(searchText)
            );

        }


        // Category Filter
        if (selectedCategory !== "All Categories") {

            result = result.filter(
                (book) => book.category === selectedCategory
            );

        }


        // Sorting Functionality
        result.sort((a, b) => {

            if (sortBy === "latest") {
                return getBookDate(b) - getBookDate(a);
            }

            if (sortBy === "oldest") {
                return getBookDate(a) - getBookDate(b);
            }

            return 0;

        });

        return result;

    }, [books, search, selectedCategory, sortBy]);


    return (

        <div className="min-h-screen bg-[#fcf3e5] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

            <div className="max-w-7xl mx-auto">


                {/* Heading Section */}
                <div className="mb-7 sm:mb-8">

                    <span className="inline-flex items-center gap-2 rounded-full bg-[#e7efa5] px-4 sm:px-5 py-2.5 sm:py-3 text-sm font-semibold text-[#432b1d]">

                        📖 Explore Our Collection

                    </span>

                    <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#432b1d] font-serif leading-tight">

                        Discover Your Next Favorite Book

                    </h1>

                    <p className="mt-3 text-base sm:text-lg text-[#896b50]">

                        Explore stories, ideas, and knowledge from our community.

                    </p>

                    <div className="mt-5 h-0.5 w-32 bg-linear-to-r from-[#925b2e] to-transparent"></div>

                </div>


                {/* Search and Filter Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 mb-6">


                    {/* Search Input */}
                    <div className="lg:col-span-6 flex items-center gap-3 rounded-2xl border border-[#e8d2b8] bg-[#fffaf2] px-4 sm:px-5 py-3">

                        <span className="text-2xl text-[#432b1d]">
                            ⌕
                        </span>

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by book title or author..."
                            className="w-full min-w-0 bg-transparent outline-none text-sm sm:text-base text-[#432b1d] placeholder:text-[#a58c75]"
                        />

                        {search && (

                            <button
                                onClick={() => setSearch("")}
                                className="text-[#896b50] hover:text-[#432b1d]"
                            >
                                ✕
                            </button>

                        )}

                    </div>


                    {/* Category Filter */}
                    <div className="lg:col-span-3">

                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full rounded-2xl border border-[#e8d2b8] bg-[#fffaf2] px-4 sm:px-5 py-3 text-sm sm:text-base text-[#432b1d] outline-none cursor-pointer"
                        >

                            {categories.map((category) => (

                                <option key={category} value={category}>
                                    {category}
                                </option>

                            ))}

                        </select>

                    </div>


                    {/* Sort Options */}
                    <div className="lg:col-span-3">

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full rounded-2xl border border-[#e8d2b8] bg-[#fffaf2] px-4 sm:px-5 py-3 text-sm sm:text-base text-[#432b1d] outline-none cursor-pointer"
                        >

                            <option value="latest">
                                Latest First
                            </option>

                            <option value="oldest">
                                Oldest First
                            </option>

                        </select>

                    </div>

                </div>


                {/* Book Count */}
                <div className="mb-5 text-sm text-[#896b50]">

                    Showing{" "}

                    <span className="font-bold text-[#432b1d]">
                        {filteredBooks.length}
                    </span>

                    {" "}books

                </div>


                {/* Loading State */}
                {loading ? (

                    <div className="text-center py-20 text-lg text-[#896b50]">
                        Loading books...
                    </div>

                ) : (

                    <>

                        {/* Books Grid */}
                        {filteredBooks.length > 0 ? (

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">

                                {filteredBooks.map((book) => (

                                    <div
                                        key={book._id}
                                        className="group overflow-hidden rounded-[22px] border border-[#ead8c1] bg-[#fffaf2] p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                    >

                                        {/* Book Image */}

                                        <div className="h-64 sm:h-60 md:h-64 w-full overflow-hidden rounded-xl bg-[#f1e5d4] flex items-center justify-center">

                                            {book.bookImage ? (

                                                <Image
                                                    width={500}
                                                    height={700}
                                                    src={book.bookImage}
                                                    alt={book.bookTitle || "Book Cover"}
                                                    className="h-full w-full object-contain"
                                                    unoptimized
                                                />

                                            ) : (

                                                <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-[#896b50]">

                                                    <span className="text-5xl">📚</span>

                                                    <p className="text-sm font-medium">
                                                        No Image Available
                                                    </p>

                                                </div>

                                            )}

                                        </div>



                                        {/* Book Information */}
                                        <div className="px-1 pt-3 pb-1">

                                            <h2 className="text-lg sm:text-xl font-bold font-serif text-[#432b1d] line-clamp-1">

                                                {book.bookTitle}

                                            </h2>

                                            <p className="mt-1 text-sm text-[#896b50]">

                                                {book.authorName}

                                            </p>


                                            {/* Category and Button */}
                                            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">

                                                <span className="rounded-full bg-[#e9f0ae] px-3 py-1.5 text-xs font-semibold text-[#51451d]">

                                                    📚 {book.category}

                                                </span>

                                                <button className="whitespace-nowrap rounded-full border border-[#925b2e] px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-[#70431f] transition-all duration-300 hover:bg-[#925b2e] hover:text-white">

                                                    View Details →

                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        ) : (

                            /* Empty State */
                            <div className="py-16 sm:py-20 text-center">

                                <div className="text-5xl sm:text-6xl mb-4">
                                    📚
                                </div>

                                <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#432b1d]">

                                    No Books Found

                                </h2>

                                <p className="mt-2 text-sm sm:text-base text-[#896b50]">

                                    Try searching with a different title or category.

                                </p>

                                <button
                                    onClick={() => {
                                        setSearch("");
                                        setSelectedCategory("All Categories");
                                        setSortBy("latest");
                                    }}
                                    className="mt-5 rounded-full bg-[#925b2e] px-6 py-2.5 text-white hover:bg-[#70431f] transition"
                                >

                                    Reset Filters

                                </button>

                            </div>

                        )}

                    </>

                )}

            </div>

        </div>

    );

};

export default AllBookspage;
