import type { ReactNode } from "react";
import Link from "next/link";
import { BookOpen, ChevronRight, Info, Mail, MapPin, Phone } from "lucide-react";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/all-books" },
  { label: "Add Book", href: "/add-book" },
  { label: "My Books", href: "/my-books" },
  { label: "My Borrows", href: "/my-borrows" },
];

const MORE_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const CONTACTS = [
  { icon: Mail, label: "info@booknook.com", href: "mailto:info@booknook.com" },
  { icon: Phone, label: "+880 1234 567890", href: "tel:+8801234567890" },
  { icon: MapPin, label: "Dhaka, Bangladesh" },
];

/* TODO(social): swap the "#" hrefs for the real profiles once they exist. */
function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M22.1 7.5a3 3 0 0 0-2.1-2.1C18.2 4.9 12 4.9 12 4.9s-6.2 0-8 .5A3 3 0 0 0 1.9 7.5 31 31 0 0 0 1.4 12c0 1.5.2 3 .5 4.5a3 3 0 0 0 2.1 2.1c1.8.5 8 .5 8 .5s6.2 0 8-.5a3 3 0 0 0 2.1-2.1c.3-1.5.5-3 .5-4.5s-.2-3-.5-4.5ZM9.8 15.4V8.6l5.9 3.4-5.9 3.4Z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.4 21.9v-8.4h2.8l.5-3.3h-3.3V8c0-.9.3-1.6 1.7-1.6h1.7V3.5c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.5H7.3v3.3h2.8v8.4h3.3Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M6.9 21.4H3.2V9h3.7v12.4ZM5 7.3a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4Zm16.4 14.1h-3.7v-6.1c0-1.4 0-3.3-2-3.3s-2.3 1.6-2.3 3.2v6.2H9.7V9h3.5v1.7h.1a3.9 3.9 0 0 1 3.5-1.9c3.7 0 4.6 2.4 4.6 5.6v7Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      className={className}
      aria-hidden
    >
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.1" cy="6.9" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const SOCIALS = [
  { name: "YouTube", href: "#", Icon: YouTubeIcon },
  { name: "Facebook", href: "#", Icon: FacebookIcon },
  { name: "LinkedIn", href: "#", Icon: LinkedInIcon },
  { name: "Instagram", href: "#", Icon: InstagramIcon },
];

const STACK_LEAVES = [
  { x: 48, y: 78, r: -25 },
  { x: 42, y: 118, r: 160 },
  { x: 58, y: 152, r: -40 },
  { x: 108, y: 96, r: 15 },
  { x: 96, y: 132, r: 195 },
  { x: 120, y: 160, r: -15 },
];

function BookStackArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 270" className={className} fill="none" aria-hidden>
      {/* stems */}
      <path
        d="M70 210C48 168 42 118 52 62M124 212C112 168 110 128 118 88"
        stroke="#6f7f50"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {STACK_LEAVES.map((leaf, i) => (
        <g key={i} transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.r})`}>
          <path
            d="M0 0C8 -17 27 -23 42 -19C38 -2 19 9 0 0Z"
            fill={i % 2 ? "#75855a" : "#66754b"}
          />
          <path
            d="M3 -2C13 -7 26 -11 38 -17"
            stroke="#4f5c38"
            strokeWidth="1.3"
            strokeLinecap="round"
            opacity="0.55"
          />
        </g>
      ))}
      {/* stacked books, slightly askew */}
      <g transform="rotate(-4 150 225)">
        <rect x="10" y="212" width="232" height="40" rx="8" fill="#7c4f2a" />
        <rect x="10" y="212" width="18" height="40" rx="8" fill="#63401f" />
        <rect x="36" y="221" width="196" height="22" rx="5" fill="#f2e5cd" />
        <rect x="26" y="172" width="212" height="38" rx="8" fill="#66754b" />
        <rect x="26" y="172" width="16" height="38" rx="8" fill="#55613e" />
        <rect x="50" y="181" width="178" height="20" rx="5" fill="#eee2c8" />
        <rect x="18" y="134" width="192" height="34" rx="8" fill="#d9c196" />
        <rect x="18" y="134" width="15" height="34" rx="8" fill="#b89a6c" />
        <rect x="40" y="142" width="160" height="18" rx="5" fill="#f7efdd" />
      </g>
    </svg>
  );
}

function OpenBookArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 340 240" className={className} fill="none" aria-hidden>
      {/* leaf sprig behind the book */}
      <path
        d="M300 150C296 116 288 86 272 58"
        stroke="#6f7f50"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <g transform="translate(272 58) rotate(-30)">
        <path d="M0 0C8 -17 27 -23 42 -19C38 -2 19 9 0 0Z" fill="#75855a" />
      </g>
      <g transform="translate(281 96) rotate(205)">
        <path d="M0 0C8 -17 27 -23 42 -19C38 -2 19 9 0 0Z" fill="#66754b" />
      </g>
      <g transform="translate(288 128) rotate(-15)">
        <path d="M0 0C8 -17 27 -23 42 -19C38 -2 19 9 0 0Z" fill="#75855a" />
      </g>
      {/* cover edge */}
      <path
        d="M18 52C64 42 128 44 172 66C216 44 280 42 326 52V190C280 180 216 182 172 204C128 182 64 180 18 190V52Z"
        fill="#8b5e34"
      />
      {/* pages */}
      <path
        d="M28 62C70 54 126 56 166 76V188C126 168 70 166 28 174V62Z"
        fill="#f7efdd"
        stroke="#c9a97c"
        strokeWidth="2.5"
      />
      <path
        d="M316 62C274 54 218 56 178 76V188C218 168 274 166 316 174V62Z"
        fill="#f7efdd"
        stroke="#c9a97c"
        strokeWidth="2.5"
      />
      {/* text lines on both pages */}
      <g stroke="#d9c3a0" strokeWidth="3" strokeLinecap="round">
        <path d="M46 92C82 86 122 88 148 100" />
        <path d="M46 116C82 110 122 112 148 124" />
        <path d="M46 140C82 134 118 136 142 146" />
        <path d="M298 92C262 86 222 88 196 100" />
        <path d="M298 116C262 110 222 112 196 124" />
        <path d="M298 140C262 134 226 136 202 146" />
      </g>
      {/* spine */}
      <path d="M172 66V204" stroke="#63401f" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

const SHELVES = [80, 175, 270, 365];

function ShelfWatermark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 420" className={className} fill="none" aria-hidden>
      <g stroke="#e4d2ae" strokeWidth="2.5" strokeLinecap="round">
        <path d="M20 8V412M240 8V412M20 8H240M20 412H240" />
        {SHELVES.map((y) => (
          <path key={y} d={`M20 ${y}H240`} />
        ))}
        {SHELVES.map((y, row) =>
          Array.from({ length: 9 }, (_, b) => {
            const w = 12 + ((b * 7 + row * 5) % 10);
            const h = 42 + ((b * 13 + row * 11) % 26);
            const x = 34 + b * 23;
            return <rect key={`${row}-${b}`} x={x} y={y - h} width={w} height={h} rx="2" />;
          })
        )}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */

function LinkList({ items }: { items: { label: string; href: string }[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="group inline-flex items-center gap-2 text-[0.95rem] text-ink/75 transition-colors hover:text-brand"
          >
            <ChevronRight className="size-4 shrink-0 text-brand/60 transition-transform group-hover:translate-x-0.5" />
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ColumnHeading({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <h2 className="flex items-center gap-2.5 font-heading text-xl font-bold text-ink">
      <span className="grid size-7 place-items-center rounded-full text-ink">{icon}</span>
      {children}
    </h2>
  );
}

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-[radial-gradient(120%_120%_at_0%_0%,#fdf9f1_0%,#faf3e5_45%,#f4e9d5_100%)] text-ink">
      {/* Decorations echoing the reference: arch, shelf silhouette, books + leaves */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 -top-48 size-136 rounded-full bg-[#f7edd9]" />
        <div className="absolute -bottom-48 left-1/3 size-112 rounded-full bg-[#f0e2c8]/60 blur-3xl" />
        <ShelfWatermark className="absolute -top-4 right-8 hidden h-[118%] w-auto opacity-60 lg:block" />
        <BookStackArt className="absolute bottom-0 -left-4 hidden w-64 xl:block" />
        <OpenBookArt className="absolute bottom-0 right-6 hidden w-72 xl:block" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.25fr_1fr_1fr_1.3fr] lg:gap-0 lg:px-8 lg:py-16">
        {/* Brand — same lockup as the Navbar */}
        <div className="lg:pr-10">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <BookOpen className="size-8 text-brand" strokeWidth={1.8} />
            <span className="font-heading text-2xl font-bold tracking-tight text-ink lg:text-[1.7rem]">
              BookNook
            </span>
          </Link>
          <p className="mt-4 flex items-center gap-3 font-heading-italic text-lg font-medium text-brand-deep">
            <span aria-hidden className="h-px w-7 bg-brand/40" />
            Read · Learn · Grow
            <span aria-hidden className="h-px w-7 bg-brand/40" />
          </p>
          <p className="mt-3 max-w-xs font-heading text-[1.05rem] leading-relaxed text-ink/80">
            Your personal library, anytime, anywhere.
          </p>
        </div>

        {/* Quick links */}
        <div className="lg:border-l lg:border-ink/10 lg:px-8">
          <ColumnHeading icon={<BookOpen className="size-5" strokeWidth={1.8} />}>
            Quick Links
          </ColumnHeading>
          <LinkList items={QUICK_LINKS} />
        </div>

        {/* More */}
        <div className="lg:border-l lg:border-ink/10 lg:px-8">
          <ColumnHeading icon={<Info className="size-5" strokeWidth={2} />}>
            More
          </ColumnHeading>
          <LinkList items={MORE_LINKS} />
        </div>

        {/* Contact */}
        <div className="lg:border-l lg:border-ink/10 lg:pl-8">
          <ColumnHeading icon={<Phone className="size-5" strokeWidth={1.8} />}>
            Contact Us
          </ColumnHeading>
          <ul className="mt-5 space-y-3.5">
            {CONTACTS.map((item) => {
              const content = (
                <>
                  <item.icon className="size-[1.15rem] shrink-0 text-brand" strokeWidth={1.8} />
                  {item.label}
                </>
              );
              const rowClass =
                "inline-flex items-center gap-3 text-[0.95rem] text-ink/75 transition-colors hover:text-brand";

              return (
                <li key={item.label}>
                  {item.href ? (
                    <a href={item.href} className={rowClass}>
                      {content}
                    </a>
                  ) : (
                    <p className={rowClass}>{content}</p>
                  )}
                </li>
              );
            })}
          </ul>

          <span aria-hidden className="mt-6 block h-px w-full bg-ink/10" />

          <h2 className="mt-6 font-heading text-lg font-bold text-ink">Follow Us</h2>
          <div className="mt-4 flex items-center gap-3">
            {SOCIALS.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                aria-label={name}
                className="grid size-10 place-items-center rounded-full bg-brand text-cream transition-colors hover:bg-brand-deep"
              >
                <Icon className="size-[1.15rem]" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative bg-[#5b3825] py-4">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-5 px-4 sm:px-6 lg:px-8">
          <span aria-hidden className="h-px flex-1 bg-cream/20" />
          <p className="flex items-center gap-2.5 font-heading text-sm text-cream/90">
            <span aria-hidden className="text-base leading-none">
              ©
            </span>
            2026 BookNook. All rights reserved.
          </p>
          <span aria-hidden className="h-px flex-1 bg-cream/20" />
        </div>
      </div>
    </footer>
  );
}
