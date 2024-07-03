import { auth } from "@/server/auth";
import { LogIn } from "lucide-react";
import Link from "next/link";

import { Button } from "../ui/button";
import LoginButton from "./login-button";
import Logo from "./logo";
import NavLink from "./navlink";
import ThemeToggle from "./theme-toggle";
import UserButton from "./user-button";

async function Navbar() {
  const session = await auth();

  return (
    <nav className="z-100 sticky inset-x-0 top-0 h-16 w-full backdrop-blur-lg transition-all">
      <ul className="flex h-16 items-center gap-4">
        <li>
          <Link href="/" aria-label="sprout and scribble logo">
            <Logo />
          </Link>
        </li>

        <NavLink href="/products" name="Sản phẩm" />
        <NavLink href="/about" name="Về chúng tôi" />

        <div className="flex flex-1 items-center justify-end gap-4">
          <ThemeToggle />

          {session ? (
            <UserButton expires={session?.expires} user={session?.user} />
          ) : (
            <LoginButton />
          )}
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
