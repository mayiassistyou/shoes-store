"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

import NavLink from "./navlink";

function HamburgerMenu(): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="block lg:hidden" asChild>
        <Menu size={34} />
      </SheetTrigger>

      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>MENU</SheetTitle>
        </SheetHeader>

        <ul className="mt-4">
          <NavLink
            href="/products"
            name="Sản phẩm"
            onClick={() => setOpen(false)}
          />
          <NavLink
            href="/about"
            name="Về chúng tôi"
            onClick={() => setOpen(false)}
          />
        </ul>
      </SheetContent>
    </Sheet>
  );
}

export default HamburgerMenu;
