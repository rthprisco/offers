"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { redirect } from "next/navigation";
import { logout } from "@/controllers/authController";
import { GoPerson, GoSignOut } from "react-icons/go";

export default function DropMenuMyAccount({ session }) {
  const userName = session.user.name.split(" ")[0];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="text-white">
        <button>{`Olá, ${userName}!`}</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem onSelect={() => redirect("/my-account")}>
          <GoPerson />
          Minha Conta
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={logout}>
          <GoSignOut />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
