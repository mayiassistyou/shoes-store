"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, TruckIcon, User } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function UserButton({ user }: Session): JSX.Element {
  const router = useRouter();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar className="h-7 w-7">
          {user.image && (
            <Image src={user.image} alt={user.name!} fill={true} sizes="100%" />
          )}
          {!user.image && (
            <AvatarFallback className="bg-primary/25">
              <div className="font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-4 w-64 p-6" align="end">
        <div className="mb-4 flex flex-col items-center gap-1 rounded-lg bg-primary/10 p-4">
          {user.image && (
            <Image
              src={user.image}
              alt={user.name!}
              className="rounded-full"
              width={36}
              height={36}
            />
          )}
          <p className="text-xs font-bold">{user.name}</p>
          <span className="text-xs font-medium text-secondary-foreground">
            {user.email}
          </span>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => router.push("/dashboard/information")}
          className="group cursor-pointer py-2 font-medium"
        >
          <User
            size={14}
            className="mr-3 transition-all duration-300 ease-in-out group-hover:translate-x-1"
          />{" "}
          Thông tin cá nhân
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push("/dashboard/orders")}
          className="group cursor-pointer py-2 font-medium"
        >
          <TruckIcon
            size={14}
            className="mr-3 transition-all duration-300 ease-in-out group-hover:translate-x-1"
          />{" "}
          Đơn hàng
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => signOut()}
          className="group cursor-pointer py-2 font-medium focus:bg-destructive/30"
        >
          <LogOut
            size={14}
            className="mr-3 transition-all duration-300 ease-in-out group-hover:scale-75"
          />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserButton;
