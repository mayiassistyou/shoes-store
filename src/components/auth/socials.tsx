"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function Socials() {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <Button
        variant={"outline"}
        className="flex w-full gap-4"
        onClick={() =>
          signIn("google", {
            redirect: false,
            callbackUrl: "/",
          })
        }
      >
        <p>Đăng nhập với Google</p>
        <FcGoogle className="h-5 w-5" />
      </Button>
    </div>
  );
}
