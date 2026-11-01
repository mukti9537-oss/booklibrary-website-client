"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BookOpen, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  /** TODO(auth): hide these when the user is logged out once auth lands. */
  authOnly?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/allbooks" },
  { label: "Add Book", href: "/add-book", authOnly: true },
  { label: "My Books", href: "/my-books", authOnly: true },
  { label: "My Borrows", href: "/my-borrows", authOnly: true },
];

function NavLinks({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
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

function AuthButtons({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Button
        nativeButton={false}
        render={<Link href="/login" />}
        variant="outline"
        onClick={onNavigate}
        className="rounded-full border-ink/20 bg-transparent px-5 text-[0.9rem] font-semibold text-ink hover:border-brand/40 hover:bg-brand/5 hover:text-brand"
      >
        Login
      </Button>

      <Button
        nativeButton={false}
        render={<Link href="/register" />}
        onClick={onNavigate}
        className="rounded-full bg-brand px-5 text-[0.9rem] font-semibold text-cream shadow-sm hover:bg-brand-deep"
      >
        Register
      </Button>
    </div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/95 backdrop-blur supports-backdrop-filter:bg-cream/80">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6 lg:h-20 lg:gap-6 lg:px-8">
        {/* Logo + wordmark */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <BookOpen className="size-8 text-brand" strokeWidth={1.8} />
          <span className="font-heading text-2xl font-bold tracking-tight text-ink lg:text-[1.7rem]">
            BookNook
          </span>
        </Link>

        <span aria-hidden className="hidden h-7 w-px bg-ink/15 lg:block" />

        {/* Desktop navigation */}
        <NavLinks className="hidden lg:flex" />

        {/* Desktop auth */}
        <AuthButtons className="ml-auto hidden lg:flex" />

        {/* Mobile / tablet toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="ml-auto grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-ink/5 lg:hidden"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile / tablet menu */}
      {menuOpen && (
        <div className="border-t border-ink/10 bg-cream lg:hidden">
          <nav className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6">
            <NavLinks className="flex-col items-stretch gap-1" onNavigate={closeMenu} />
            <span aria-hidden className="my-3 block h-px w-full bg-ink/10" />
            <AuthButtons className="w-full *:flex-1" onNavigate={closeMenu} />
          </nav>
        </div>
      )}
    </header>
  );
}
