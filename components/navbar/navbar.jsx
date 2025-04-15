import Link from "next/link";
import Image from "next/image";

import {
  CircleUser,
  ListChecks,
  Newspaper,
  Sun,
  Search,
  MapPin,
} from "lucide-react";
import { GoBell } from "react-icons/go";

import { auth } from "@/auth";
import DropMenuMyAccount from "./drop-menu-my-account";

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="bg-primary-blue flex w-full items-center justify-around shadow md:gap-8">
      <div className="flex w-14 md:w-20 flex-col justify-center">
        <Link href="/">
          <Image
            src="/logo-offers.svg"
            alt="Logo OFFers"
            width={90}
            height={90}
          />
        </Link>
      </div>
      <div className="flex w-[240px] flex-col justify-center gap-2 py-4 md:w-[460px]">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Pesquise pelo seu produto..."
            className="bg-background relative h-10 w-full rounded-xl border-none px-4 py-0 text-sm shadow focus:outline-none"
          />
          <Search className="absolute right-3 hidden md:block" color="gray" />
        </div>
        <div className="hidden items-center gap-1 text-white md:flex">
          <MapPin size={16} />
          <span className="text-xs">Insira seu CEP</span>
        </div>
      </div>
      <div className="hidden flex-col justify-center md:flex">
        <ul className="flex list-none items-center">
          <li className="flex gap-2 p-4">
            <CircleUser size={28} color="white" />
            {session ? (
              <DropMenuMyAccount session={session} />
            ) : (
              <Link
                href="/login"
                title="Faça seu login"
                className="flex items-center text-sm text-white"
              >
                <p>Faça seu login</p>
              </Link>
            )}
          </li>
          <li>
            <Link
              href="/create-list"
              title="Faça seu login ou cadastre-se"
              className="flex items-center gap-1 p-4 text-sm text-white"
            >
              <ListChecks size={28} />
            </Link>
          </li>
          <li>
            <Link
              href="/"
              title="Confira os encartes"
              className="flex items-center gap-1 p-4 text-sm text-white"
            >
              <Newspaper size={28} />
            </Link>
          </li>
          <li>
            <Link
              href="/"
              title="Alterar tema"
              className="flex items-center gap-1 p-4 text-sm text-white"
            >
              <Sun size={28} />
            </Link>
          </li>
        </ul>
      </div>
      <div className="md:hidden">
        <GoBell size={24} color="white" />
      </div>
    </header>
  );
}
