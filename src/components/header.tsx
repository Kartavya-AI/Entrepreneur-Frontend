"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";

import logo from "../../public/images/7242a710-3055-4f90-acd8-738e65364450.png";

const Logo = () => (
    <Link
        href="/"
        className="flex items-center gap-2 h-14 font-bold text-2xl sm:text-3xl"
    >
        <Image
            src={logo}
            alt="Kartavya Logo"
            className={`h-14 w-14 animate-spin-slow`}
        />
        <span className="text-3xl">Kartavya</span>
    </Link>
);

function Header() {
    const [open, setOpen] = useState(false);
    return (
        <header className="z-20 fixed top-0 left-0 right-0 px-2  h-16 bg-zinc-200/30 backdrop-blur-sm">
            <div className="h-16 flex items-center justify-between lg:px-2 max-w-5xl mx-auto w-full">
                {/* Logo */}
                <Logo />

                {/* Desktop Nav */}
                <ul className="hidden md:flex h-14 items-center gap-10 text-xl">
                    <li>
                        <Link href={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link href={"/search"}>Search</Link>
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden flex items-center"
                    onClick={() => setOpen(!open)}
                >
                    {open ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button>

                {/* Login (Always Visible) */}
                <div className="hidden md:flex">
                    <SignedOut>
                      <div className="flex gap-3">
                         <div> <SignInButton /></div>
                        <div><SignUpButton>Sign Up</SignUpButton></div>
                      </div>
                    </SignedOut>
                </div>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
            </div>

            {/* Mobile Nav Dropdown */}
            {open && (
                <ul className="md:hidden mt-2 space-y-4 px-4 py-4 text-lg bg-zinc-100 rounded-xl shadow-md">
                    <li>
                        <Link href={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link href={"/search"}>Search</Link>
                    </li>
                    <SignedOut>
                       <div> <SignInButton /></div>
                        <div><SignUpButton>Sign Up</SignUpButton></div>
                    </SignedOut>
                </ul>
            )}
        </header>
    );
}

export default Header;
