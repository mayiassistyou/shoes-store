import { auth } from "@/server/auth";
import Link from "next/link";

import HamburgerMenu from "./hamburger-menu";
import LoginButton from "./login-button";
import Logo from "./logo";
import NavLink from "./navlink";
import ThemeToggle from "./theme-toggle";
import UserButton from "./user-button";

async function Navbar() {
  const session = await auth();

  return (
    <nav className="z-100 sticky inset-x-0 top-0 h-16 w-full backdrop-blur-lg transition-all">
      <div className="flex h-16 items-center gap-4">
        <HamburgerMenu />

        <Link href="/" aria-label="sprout and scribble logo">
          <Logo />
        </Link>

        <ul className="hidden gap-4 lg:flex">
          <NavLink href="/products" name="Sản phẩm" />
          <NavLink href="/about" name="Về chúng tôi" />
        </ul>

        <div className="flex flex-1 items-center justify-end gap-2 lg:gap-4">
          {session && session?.user.role === "admin" && (
            <ul className="hidden lg:block">
              <NavLink href="/admin" name="Quản lý" />
            </ul>
          )}
          <ThemeToggle />
          {session ? (
            <UserButton expires={session?.expires} user={session?.user} />
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
