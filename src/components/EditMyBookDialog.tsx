"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
    FaBookOpen,
    FaUser,
    FaEnvelope,
    FaImage,
    FaLayerGroup,
    FaPen,
    FaPlus,
    FaArrowRight,
} from "react-icons/fa";
import Image from "next/image";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { getTokenFromClient } from "@/lib/getTokenFromCilent";

const EditMyBookDialog = ({
    user = {},
    book,
    onUpdate,
}: {
    user?: { name?: string; email?: string };
    onUpdate: () => void;
    book: {
        _id: string;
        bookTitle: string;
        authorName: string;
        category: string;
        bookImage: string;
        shortDescription: string;
    };
}) => {
    const [formData, setFormData] = useState<{
        _id: string;
        bookTitle: string;
        authorName: string;
        category: string;
        bookImage: File | null;
        shortDescription: string;
    }>({
        _id: book._id || "",
        bookTitle: book.bookTitle || "",
        authorName: book.authorName || "",
        category: book.category || "",
        bookImage: null,
        shortDescription: book.shortDescription || "",
    });

    const [preview, setPreview] = useState(book.bookImage || "");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        const files = "files" in e.target ? e.target.files : null;

        if (name === "bookImage" && files?.[0]) {
            const file = files[0];

            setFormData((prev) => ({
                ...prev,
                bookImage: file,
            }));

            setPreview(URL.createObjectURL(file));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { bookTitle, authorName, category, bookImage, shortDescription } = formData;
        const updateData = { bookTitle, authorName, category, bookImage, shortDescription };
        const token = await getTokenFromClient()

        try {
            setLoading(true);

            let imageUrl = book.bookImage;

            // Image upload (Optional)
            if (formData.bookImage) {
                const imageData = new FormData();
                imageData.append("bookImage", formData.bookImage);

                const imageResponse = await fetch(
                    "http://localhost:8000/upload-image",
                    {
                        method: "POST",
                        body: imageData,
                    }
                );

                const imageResult = await imageResponse.json();

                if (!imageResponse.ok) {
                    throw new Error(imageResult.message || "Image upload failed");
                }

                imageUrl = imageResult.imageUrl;
            }

            // Save book data to MongoDB
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/addbook/${book._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    authorization :  `Bearer ${token}`
                },
                body: JSON.stringify({ ...updateData, bookImage: imageUrl }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error("Book could not be saved");
            }

            console.log(data);

            // Success message
            toast.success("Book is successfully added");

            onUpdate();
            setOpen(false);

            // Reset form
            setFormData({
                _id: book._id,
                bookTitle: book.bookTitle,
                authorName: book.authorName,
                category: book.category,
                bookImage: null,
                shortDescription: book.shortDescription,
            });

            setPreview(book.bookImage);

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    const inputStyle =
        "w-full rounded-xl border border-[#e6d2b8] bg-[#fffaf3] px-4 py-3 text-[#432b1d] outline-none transition focus:border-[#96602f] focus:ring-2 focus:ring-[#96602f]/20 placeholder:text-[#a18b76]";

    const labelStyle =
        "mb-2 flex items-center gap-2 font-semibold text-[#432b1d]";

    return (
        <div>
            <Dialog
                open={open}
                onOpenChange={(value) => {
                    setOpen(value);

                    if (value) {
                        setFormData({
                            _id: book._id,
                            bookTitle: book.bookTitle,
                            authorName: book.authorName,
                            category: book.category,
                            bookImage: null,
                            shortDescription: book.shortDescription,
                        });

                        setPreview(book.bookImage);
                    }
                }}
            >
                <DialogTrigger
                    className="flex-1 min-w-0 inline-flex items-center justify-center gap-2 rounded-full border border-[#925b2e] px-4 py-3 font-semibold text-[#925b2e] transition duration-300 hover:bg-[#925b2e] hover:text-white"
                >

                    ✏️ Edit
                </DialogTrigger>

                <DialogContent className="w-[calc(100%-2rem)] max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#e6d2b8] bg-white p-0">
                    <DialogHeader className="border-b border-[#eee1d2] px-6 py-5 md:px-8">
                        <DialogTitle className="text-2xl font-bold text-[#432b1d]">
                            Edit Book Details
                        </DialogTitle>

                        <DialogDescription className="text-sm text-[#80674e]">
                            Update your book information.
                        </DialogDescription>
                    </DialogHeader>

                    <div className=" p-6 md:p-8">
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-5">

                                {/* Book Title */}
                                <div>
                                    <label className={labelStyle}>
                                        <FaBookOpen />
                                        Book Title
                                        <span className="text-red-500">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="bookTitle"
                                        value={formData.bookTitle}
                                        onChange={handleChange}
                                        placeholder="Enter book title"
                                        required
                                        className={`${inputStyle} w-full min-w-0`}
                                    />
                                </div>

                                {/* Author Name */}
                                <div>
                                    <label className={labelStyle}>
                                        <FaUser />
                                        Author Name
                                        <span className="text-red-500">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="authorName"
                                        value={formData.authorName}
                                        onChange={handleChange}
                                        placeholder="Enter author name"
                                        required
                                        className={inputStyle}
                                    />
                                </div>

                                {/* Category */}
                                <div>
                                    <label className={labelStyle}>
                                        <FaLayerGroup />
                                        Category
                                        <span className="text-red-500">*</span>
                                    </label>

                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                        className={inputStyle}
                                    >
                                        <option value="">Select a category</option>
                                        <option value="Fiction">Fiction</option>
                                        <option value="Science">Science</option>
                                        <option value="History">History</option>
                                        <option value="Kids">Kids</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>

                                {/* Book Image */}
                                <div>
                                    <label className={labelStyle}>
                                        <FaImage />
                                        Book Image
                                        <span className="text-red-500">(Optional)</span>
                                    </label>

                                    <input
                                        type="file"
                                        name="bookImage"
                                        accept="image/*"
                                        onChange={handleChange}

                                        className="w-full cursor-pointer rounded-xl border border-[#e6d2b8] bg-[#fffaf3] text-sm text-[#80674e] file:mr-3 file:cursor-pointer file:border-0 file:bg-[#ead8c0] file:px-3 file:py-3 file:text-[#432b1d] hover:file:bg-[#dfc6a5]"
                                    />

                                    <p className="mt-2 text-xs text-[#91785e]">
                                        Upload image to imgbb / postimage
                                    </p>
                                </div>

                                {/* Image Preview */}
                                {preview && (
                                    <div className="md:col-span-2">
                                        <Image
                                            width={20}
                                            height={20}
                                            src={preview}
                                            alt="Book preview"
                                            className="h-36 w-28 rounded-xl border border-[#e6d2b8] object-cover shadow-sm"
                                        />
                                    </div>
                                )}

                                {/* Description */}
                                <div className="md:col-span-2">
                                    <label className={labelStyle}>
                                        <FaPen />
                                        Short Description
                                        <span className="text-red-500">*</span>
                                    </label>

                                    <textarea
                                        name="shortDescription"
                                        value={formData.shortDescription}
                                        onChange={handleChange}
                                        placeholder="Write a short description about the book..."
                                        rows={3}
                                        required
                                        className={`${inputStyle} w-full resize-none`}
                                    />
                                </div>

                                {/* User Name */}
                                <div>
                                    <label className={labelStyle}>
                                        <FaUser />
                                        User Name
                                    </label>

                                    <input
                                        type="text"
                                        value={user.name || ""}
                                        readOnly
                                        className="w-full cursor-not-allowed rounded-xl border border-[#e6d2b8] bg-[#eee7df] px-4 py-3 text-[#806d5c] outline-none"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className={labelStyle}>
                                        <FaEnvelope />
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        value={user.email || ""}
                                        readOnly
                                        className="w-full cursor-not-allowed rounded-xl border border-[#e6d2b8] bg-[#eee7df] px-4 py-3 text-[#806d5c] outline-none"
                                    />
                                </div>

                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-6 flex items-center justify-center gap-3 rounded-full bg-[#925b2e] px-9 py-3.5 font-semibold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:bg-[#70421f] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <FaPlus />

                                {loading ? "Uploading..." : "Update Book"}

                                <FaArrowRight />
                            </button>

                        </form>
                    </div>


                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EditMyBookDialog;