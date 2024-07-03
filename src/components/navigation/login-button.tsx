"use client";

import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function LoginButton(): JSX.Element | null {
  const pathname = usePathname();

  if (pathname.split("/")[1] === "auth") return null;

  return (
    <Button asChild>
      <Link className="flex gap-2" href="/auth/login">
        <LogIn size={16} />
        <span>Login</span>
      </Link>
    </Button>
  );
}

export default LoginButton;
