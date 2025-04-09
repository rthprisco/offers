import Link from "next/link";

import {
  CircleUser,
  ListChecks,
  Newspaper,
  Sun,
  Search,
  MapPin,
} from "lucide-react";
import { auth } from "@/auth";


export default async function Navbar() {
  const session = await auth();

  return (
    <header className="bg-primary-blue flex w-full justify-around gap-8 shadow">
      <div className="flex flex-col justify-center">
        <Link href="/">OFFers</Link>
      </div>
      <div className="flex flex-col justify-center gap-2 py-4">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Pesquise pelo seu produto..."
            className="bg-background relative h-10 w-full rounded-xl border-none px-4 py-0 text-sm focus:outline-none"
          />
          <Search className="absolute right-3" />
        </div>
        <div className="flex items-center gap-1 text-white">
          <MapPin size={16} />
          <span className="text-xs">Insira seu CEP</span>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <ul className="flex list-none items-center">
          <li>
            {}
            <Link
              href={session ? "my-account" : "login"}
              title="Faça seu login"
              className="flex items-center gap-1 p-4 text-sm text-white"
            >
              <CircleUser size={28} />
              {session ? `Olá, ${session.user.name}!` : "Faça seu login"}
            </Link>
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
              title="Faça seu login ou cadastre-se"
              className="flex items-center gap-1 p-4 text-sm text-white"
            >
              <Newspaper size={28} />
            </Link>
          </li>
          <li>
            <Link
              href="/"
              title="Faça seu login ou cadastre-se"
              className="flex items-center gap-1 p-4 text-sm text-white"
            >
              <Sun size={28} />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
  // }
  // return null;
}
