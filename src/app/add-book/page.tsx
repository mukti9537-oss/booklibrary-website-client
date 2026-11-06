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
import { getTokenFromClient } from "@/lib/getTokenFromCilent";

const AddBookpage = ({
  user = {},
}: {
  user?: { name?: string; email?: string };
}) => {
  const [formData, setFormData] = useState<{
    bookTitle: string;
    authorName: string;
    category: string;
    bookImage: File | null;
    shortDescription: string;
  }>({
    bookTitle: "",
    authorName: "",
    category: "",
    bookImage: null,
    shortDescription: "",
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

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
   const token = await getTokenFromClient()
 
    try {
      setLoading(true);

      // Step 1: Check image
      if (!formData.bookImage) {
        toast.error("Please select a book image");
        return;
      }

      // Step 2: Prepare image for upload
      const imageData = new FormData();

      imageData.append("bookImage", formData.bookImage);

      // Step 3: Upload image to ImgBB
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

      // Step 4: Get image URL
      const imageUrl = imageResult.imageUrl;

      // Step 5: Prepare book data
      const bookData = {
        bookTitle: formData.bookTitle,
        authorName: formData.authorName,
        category: formData.category,
        bookImage: imageUrl,
        shortDescription: formData.shortDescription,
      };

      // Step 6: Save book data to MongoDB
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/addbook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify(bookData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error("Book could not be saved");
      }

      console.log(data);

      // Step 7: Success message
      toast.success("Book is successfully added");

      // Step 8: Reset form
      setFormData({
        bookTitle: "",
        authorName: "",
        category: "",
        bookImage: null,
        shortDescription: "",
      });

      setPreview("");

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
    <main className="min-h-screen overflow-hidden bg-[#fcf3e5] text-[#432b1d]">

      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8 lg:py-12">

        {/* Heading Section */}
        <div className="relative mb-8">

          <span className="inline-flex items-center gap-2 rounded-full bg-[#dce99b] px-4 py-2 text-sm font-semibold text-[#49351e]">
            <FaPen />
            Add a New Book
          </span>

          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight tracking-tight text-[#432b1d] md:text-5xl lg:text-6xl">
            Add Your Book to Our Library
          </h1>

          <p className="mt-3 text-base text-[#80674e] md:text-lg">
            Every book holds a story. Let yours inspire someone new.
          </p>

          <div className="mt-5 h-0.5 w-28 bg-linear-to-r from-[#98612f] to-transparent"></div>

        </div>

        {/* Main Form Card */}
        <div className="overflow-hidden rounded-3xl border border-[#ead7bd] bg-[#fffaf2] shadow-lg">

          {/* Form Section */}
          <div className="w-full p-6 md:p-9 lg:p-10">

            <form onSubmit={handleSubmit}>

              <div className="grid gap-x-7 gap-y-7 md:grid-cols-2">

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
                    className={inputStyle}
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
                    <span className="text-red-500">*</span>
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
                    className={`${inputStyle} resize-none`}
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

                {loading ? "Uploading..." : "Add Book"}

                <FaArrowRight />
              </button>

            </form>
          </div>


        </div>

      </section>

    </main>
  );
};

export default AddBookpage;