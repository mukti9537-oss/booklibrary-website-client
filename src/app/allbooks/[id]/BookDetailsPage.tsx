import BorrowCard from '@/components/Borrow/BorrowCard';
import Image from 'next/image';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import React from 'react';
import { getTokenFromServer } from '@/lib/getTokenFromServer';

const AllBooksDetailspage = async ({ id }: { id: string }) => {

  const token = await getTokenFromServer();
  
    const res = await fetch(`http://localhost:8000/allbooks/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        },
    });
    const data = await res.json();

    console.log(data);

    return (
        <div className="min-h-screen bg-[#fffaf0] px-5 py-10 md:px-10 lg:px-16">

            {/* Breadcrumb */}
            <div className="mb-10 flex items-center gap-3 text-sm text-[#8b603c]">
                <span>⌂</span>
                <span>/</span>
                <span>All Books</span>
                <span>/</span>
                <span className="font-medium text-[#382719]">
                    {data.bookTitle}
                </span>
            </div>

            {/* Book Details */}
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 md:grid-cols-2 lg:gap-14">

                {/* Book Image */}
                <div className="flex justify-center">
                    <div className="overflow-hidden rounded-[22px] border-[8] border-white shadow-xl">
                        <Image
                            width={20}
                            height={20}
                            src={data.bookImage}
                            alt={data.bookTitle}
                            unoptimized
                            className="h-[450] w-[310] object-cover sm:h-[580] sm:w-[400]"
                        />
                    </div>
                </div>

                {/* Book Information */}
                <div className="pt-2">

                    {/* Title */}
                    <h1 className="mb-7 font-serif text-4xl font-bold leading-tight text-[#382719] sm:text-5xl lg:text-6xl">
                        {data.bookTitle}
                    </h1>

                    {/* Author & Category */}
                    <div className="mb-8 flex flex-wrap gap-4">

                        <div className="flex items-center gap-3 rounded-full bg-[#f4e6d1] px-6 py-3 text-[#74451f]">
                            <span className="text-xl">♟</span>
                            <span className="font-medium">
                                {data.authorName}
                            </span>
                        </div>

                        <div className="flex items-center gap-3 rounded-full bg-[#f4e6d1] px-6 py-3 text-[#74451f]">
                            <span className="text-xl">📁</span>
                            <span className="font-medium">
                                {data.category}
                            </span>
                        </div>

                    </div>

                    {/* Description */}
                    <div className="mb-7">
                        <h2 className="mb-3 flex items-center gap-3 text-xl font-bold text-[#57371f]">
                            <span>▤</span>
                            Description
                        </h2>

                        <p className="text-base leading-8 text-[#49372c] sm:text-lg">
                            {data.shortDescription}
                        </p>
                    </div>

                    <div className="mb-7 border-t border-[#eadbc6]"></div>

                    {/* Added By */}
                    <div className="mb-8">

                        <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-[#57371f]">
                            <span>♟</span>
                            Added by
                        </h2>

                        <div className="flex max-w-xl items-center gap-5 rounded-3xl bg-[#f7ecd9] p-5">

                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#ead6b8] text-3xl text-[#89582e]">
                                👤
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-[#382719]">
                                    {data.addedBy?.name || data.addedBy || "BookNook Member"}
                                </h3>

                                <p className="mt-1 text-sm text-gray-600">
                                    {data.addedBy?.email || data.addedByEmail || ""}
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Borrow Button */}

                    <BorrowCard data = {data}/>
                </div>
            </div>
        </div>
    );

};

export default AllBooksDetailspage;
