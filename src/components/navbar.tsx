"use client";

import { LogIn, Moon, Settings, Sun, Truck, TruckIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "./logo";
import NavLink from "./navlink";
import { Button } from "./ui/button";

function Navbar(): JSX.Element {
  const { setTheme, theme } = useTheme();
  const pathname = usePathname();

  const user = undefined;

  return (
    <nav className="z-100 sticky inset-x-0 top-0 h-16 w-full backdrop-blur-lg transition-all">
      <ul className="flex h-16 items-center gap-4">
        <li>
          <Link href="/" aria-label="sprout and scribble logo">
            <Logo />
          </Link>
        </li>

        <NavLink href="/products" name="Sản phẩm" pathname={pathname} />
        <NavLink href="/about" name="Về chúng tôi" pathname={pathname} />

        <div className="flex flex-1 justify-end gap-4">
          <Button
            className="group p-3"
            variant={"secondary"}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun
              className="duration-750 absolute transition-all ease-in-out group-hover:rotate-180 group-hover:text-yellow-600 dark:-rotate-90 dark:scale-0"
              size={16}
            />
            <Moon
              className="duration-750 rotate-90 scale-0 transition-all ease-in-out group-hover:text-blue-400 dark:rotate-0 dark:scale-100"
              size={16}
            />
          </Button>

          {user ? (
            <p>user</p>
          ) : (
            <Button asChild>
              <Link className="flex gap-2" href="/auth/login">
                <LogIn size={16} />
                <span>Login</span>
              </Link>
            </Button>
          )}
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
