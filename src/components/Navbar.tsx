"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";

import {
    BookOpen,
    Menu,
    X,
    ChevronDown,
} from "lucide-react";

import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItem = {
    label: string;
    href: string;
    authOnly?: boolean;
};

const NAV_ITEMS: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "All Books", href: "/allbooks", authOnly: false },
    { label: "Add Book", href: "/add-book", authOnly: false },
    { label: "My Books", href: "/my-books", authOnly: false },
    { label: "My Borrows", href: "/my-borrows", authOnly: false },
];

// Navigation Links
function NavLinks({
    className,
    onNavigate,
}: {
    className?: string;
    onNavigate?: () => void;
}) {
    const pathname = usePathname();

    return (
        <ul className={cn("flex items-center gap-7", className)}>
            {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;

                return (
                    <li key={item.href}>
                        <Link
                            href={item.href}
                            onClick={onNavigate}
                            aria-current={isActive ? "page" : undefined}
                            className={cn(
                                "relative block py-1 text-[0.95rem] font-medium text-ink/70 transition-colors hover:text-brand",
                                "after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:bg-brand after:transition-transform after:content-['']",
                                isActive
                                    ? "text-ink after:scale-x-100"
                                    : "after:scale-x-0 hover:after:scale-x-100"
                            )}
                        >
                            {item.label}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}

// Authentication Buttons
function AuthButtons({
    className,
    onNavigate,
}: {
    className?: string;
    onNavigate?: () => void;
}) {
    const router = useRouter();

    const [openDropdown, setOpenDropdown] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data: session, isPending } = authClient.useSession();

    // Logout
    const handleLogout = async () => {
        try {
            const result = await authClient.signOut();

            if (result.error) {
                toast.error("Logout failed!");
                return;
            }

            toast.success("Logged out successfully!");

            setOpenDropdown(false);
            onNavigate?.();

            router.push("/");
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        }
    };

    if (isPending) return null;

    // Logged Out
    if (!session) {
        return (
            <div className={cn("flex items-center gap-2.5", className)}>
                <Button
                    variant="outline"
                    className="rounded-full border-brand/30 text-ink hover:bg-brand/10"
                    onClick={() => {
                        onNavigate?.();
                        router.push("/login");
                    }}
                >
                    Login
                </Button>

                <Button
                    className="rounded-full bg-brand text-white hover:bg-brand/90"
                    onClick={() => {
                        onNavigate?.();
                        router.push("/register");
                    }}
                >
                    Register
                </Button>
            </div>
        );
    }

    // Logged In
    const user = session.user;

    const avatarSrc =
        avatarPreview || user.image?.trim() || null;

    // Select Profile Picture
    const handleAvatarChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select a valid image!");
            return;
        }

        const previewUrl = URL.createObjectURL(file);

        setAvatarPreview(previewUrl);
    };

    return (
        <div className={cn("relative flex items-center", className)}>

            {/* Profile Button */}
            <button
                type="button"
                onClick={() => setOpenDropdown(!openDropdown)}
                className="flex items-center gap-2 rounded-full border border-brand/20 p-1.5 transition hover:bg-brand/10"
                aria-expanded={openDropdown}
            >
                {avatarSrc ? (
                    <Image
                        width={36}
                        height={36}
                        src={avatarSrc}
                        alt={user.name || "User"}
                        unoptimized
                        className="size-9 rounded-full border border-brand/30 object-cover"
                    />
                ) : (
                    <div className="grid size-9 place-items-center rounded-full bg-brand font-bold text-white">
                        {user.name?.charAt(0).toUpperCase()}
                    </div>
                )}

                <ChevronDown
                    className={cn(
                        "mr-1 size-4 transition-transform",
                        openDropdown && "rotate-180"
                    )}
                />
            </button>

            {/* User Dropdown */}
            {openDropdown && (
                <div className="absolute right-0 top-12 z-60 w-56 rounded-xl border border-ink/10 bg-cream p-3 shadow-xl">

                    {/* User Information */}
                    <div className="border-b border-ink/10 px-2 pb-3">
                        <p className="truncate font-semibold text-ink">
                            {user.name}
                        </p>

                        <p className="truncate text-xs text-ink/60">
                            {user.email}
                        </p>
                    </div>

                    {/* Image Upload */}
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleAvatarChange}
                    />

                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full rounded-lg px-3 py-2 text-left text-sm text-ink transition hover:bg-brand/10"
                    >
                        Change Profile Picture
                    </button>

                    {/* My Profile */}
                    <Link
                        href="/profile"
                        onClick={() => {
                            setOpenDropdown(false);
                            onNavigate?.();
                        }}
                        className="mt-1 block rounded-lg px-3 py-2 text-sm text-ink transition hover:bg-brand/10"
                    >
                        My Profile
                    </Link>

                    {/* Logout */}
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

// Main Navbar
export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/95 backdrop-blur supports-backdrop-filter:bg-cream/80">

            <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6 lg:h-20 lg:gap-6 lg:px-8">

                {/* Logo */}
                <Link
                    href="/"
                    className="flex shrink-0 items-center gap-2.5"
                >
                    <BookOpen
                        className="size-8 text-brand"
                        strokeWidth={1.8}
                    />

                    <span className="font-heading text-2xl font-bold tracking-tight text-ink lg:text-[1.7rem]">
                        BookNook
                    </span>
                </Link>

                <span
                    aria-hidden
                    className="hidden h-7 w-px bg-ink/15 lg:block"
                />

                {/* Desktop Navigation */}
                <NavLinks className="hidden lg:flex" />

                {/* Desktop Authentication */}
                <AuthButtons className="ml-auto hidden lg:flex" />

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    className="ml-auto grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-ink/5 lg:hidden"
                >
                    {menuOpen ? (
                        <X className="size-5" />
                    ) : (
                        <Menu className="size-5" />
                    )}
                </button>
            </div>

            {/* Mobile / Tablet Menu */}
            {menuOpen && (
                <div className="border-t border-ink/10 bg-cream lg:hidden">

                    <nav className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6">

                        <NavLinks
                            className="flex-col items-stretch gap-1"
                            onNavigate={closeMenu}
                        />

                        <span
                            aria-hidden
                            className="my-3 block h-px w-full bg-ink/10"
                        />

                        <AuthButtons
                            className="w-full *:flex-1"
                            onNavigate={closeMenu}
                        />
                    </nav>
                </div>
            )}
        </header>
    );
}
