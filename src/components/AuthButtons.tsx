"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Image from "next/image";

const AuthButtons = () => {

    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();

    const [openDropdown, setOpenDropdown] = useState(false);

    const handleLogout = async () => {

        try {

            const result = await authClient.signOut();

            if (result.error) {
                toast.error("Logout failed!");
                return;
            }

            toast.success("Logged out successfully!");

            setOpenDropdown(false);

            router.push("/");
            router.refresh();

        } catch (error) {

            console.error(error);
            toast.error("Something went wrong!");

        }

    };


    if (isPending) {
        return null;
    }


    // Logged Out
    if (!session) {

        return (
            <div className="flex items-center gap-2">

                <Link href="/login">
                    Login
                </Link>

                <Link href="/register">
                    Register
                </Link>

            </div>
        );

    }


    // Logged In
    const user = session.user;

    return (

        <div className="relative">

            <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className="flex items-center gap-2"
            >

                <Image
                    width={20}
                    height={30}
                    src={user.image || "/default-avatar.png"}
                    alt="User"
                    className="h-10 w-10 rounded-full border-2 border-[#a46b36] object-cover"
                />

                <span className="text-sm font-semibold">
                    ▼
                </span>

            </button>


            {/* Dropdown */}
            {openDropdown && (

                <div className="absolute right-0 top-12 z-50 w-52 rounded-xl border border-[#ead8bd] bg-[#fffaf1] p-3 shadow-xl">

                    <div className="border-b border-[#ead8bd] pb-3">

                        <p className="font-bold text-[#604326]">
                            {user.name}
                        </p>

                        <p className="truncate text-xs text-gray-500">
                            {user.email}
                        </p>

                    </div>


                    <Link
                        href="/profile"
                        onClick={() => setOpenDropdown(false)}
                        className="block rounded-lg px-3 py-2 text-sm hover:bg-[#f5e6d1]"
                    >
                        My Profile
                    </Link>


                    <button
                        onClick={handleLogout}
                        className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                        Logout
                    </button>

                </div>

            )}

        </div>

    );

};

export default AuthButtons;