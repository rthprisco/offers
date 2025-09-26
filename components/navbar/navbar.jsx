"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";


import {
  CircleUser,
  ListChecks,
  Newspaper,
  Sun,
  MapPin,
  Save,
  LogOut,
} from "lucide-react";
import { GoBell } from "react-icons/go";
import UserDropdown from "./UserDropdown";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user_data");
    const mercadoData = localStorage.getItem("mercado_data");

    if (userData) {
      setUser(JSON.parse(userData));
      setUserType("user");
    } else if (mercadoData) {
      setUser(JSON.parse(mercadoData));
      setUserType("mercado");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user_data");
    localStorage.removeItem("mercado_data");
    localStorage.removeItem("user_type");
    localStorage.removeItem("mercado_token");
    window.location.href = "/";
  };

  const getUserDisplayName = () => {
    if (!user) return null;
    return userType === "mercado" ? user.nome : user.name;
  };

  return (
    <header className="bg-primary-blue flex w-full items-center justify-around shadow md:gap-8">

      <div className="flex w-14 flex-col justify-center md:w-20">
        <Link href="/">
          <Image
            src="/logo-offers.svg"
            alt="Logo OFFers"
            width={90}
            height={90}
          />
        </Link>
      </div>

      {/* Busca e CEP  */}
      <div className="flex w-[240px] flex-col justify-center gap-2 py-4 md:w-[460px]">
        <SearchBar />
        <div className="hidden items-center gap-1 text-white md:flex">
          <MapPin size={16} />
          <span className="text-xs">Insira seu CEP</span>
        </div>
      </div>
      <div className="hidden flex-col justify-center md:flex">
        <ul className="flex list-none items-center">
          <li className="flex gap-2 p-4 relative group">
            <CircleUser size={28} color="white" />
            {user ? (
              <div className="flex items-center text-sm text-white">
                {userType === "mercado" ? (
                  <div className="relative group">
                    <span className="cursor-pointer">
                      Olá, {getUserDisplayName()}
                    </span>
                    <div className="absolute hidden group-hover:block top-full right-0 mt-2">
                      <UserDropdown handleLogout={handleLogout} />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <p>Olá, {getUserDisplayName()}</p>
                    <button
                      onClick={handleLogout}
                      title="Sair"
                      className="flex items-center text-white hover:text-gray-200 transition-colors"
                    >
                      <LogOut size={16} />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-white">
                <Link href="/login" className="hover:underline">
                  Login
                </Link>
              </div>
            )}
          </li>


          <li>
            <Link
              href="/create-list"
              title="Criar Lista"
              className="flex items-center gap-1 p-4 text-sm text-white"
            >
              <ListChecks size={28} />
            </Link>
          </li>

          <li>
            <Link
              href="/supermarket-flyers"
              title="Confira os encartes"
              className="flex items-center gap-1 p-4 text-sm text-white"
            >
              <Newspaper size={28} />
            </Link>
          </li>

          <li>
            <Link
              href="/salvos"
              title="Meus produtos salvos"
              className="flex items-center gap-1 p-4 text-sm text-white"
            >
              <Save size={28} />
            </Link>
          </li>

          <li>
            {typeof window !== "undefined" && (
              <Link
                href="#"
                title="Alterar tema"
                className="flex items-center gap-1 p-4 text-sm text-white"
              >
                <Sun size={28} />
              </Link>
            )}
          </li>
        </ul>
      </div>

      <div className="md:hidden">
        <GoBell size={24} color="white" />
      </div>
    </header>
  );
}


