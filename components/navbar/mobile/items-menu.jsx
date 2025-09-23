"use client";

import React, { useState, useEffect } from "react";
import { CircleUser } from "lucide-react";
import { IoIosMenu } from "react-icons/io";
import { LuListChecks, LuNewspaper } from "react-icons/lu";
import { GoHeart, GoHome, GoPerson, GoSignOut } from "react-icons/go";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

import { User, Gift, Settings } from "lucide-react";

export default function ItemsMenu() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user_data");
    const mercadoData = localStorage.getItem("mercado_data");
    const currentUserType = localStorage.getItem("user_type");

    if (userData && currentUserType === "user") {
      setUser(JSON.parse(userData));
      setUserType("user");
    } else if (mercadoData && currentUserType === "mercado") {
      setUser(JSON.parse(mercadoData));
      setUserType("mercado");
    }
  }, []);

  const getUserDisplayName = () => {
    if (!user) return null;
    if (userType === "mercado") {
      return user.nome.split(" ")[0];
    } else {
      return user.name.split(" ")[0];
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user_data");
    localStorage.removeItem("mercado_data");
    localStorage.removeItem("user_type");
    localStorage.removeItem("mercado_token");

    setUser(null);
    setUserType(null);

    setOpenMenu(false);
    window.location.href = "/";
  };

  const links = [
    { label: "Início", href: "/", icon: <GoHome size={24} /> },
    { label: "Criar Listas", href: "/create-list", icon: <LuListChecks size={24} /> },
    { label: "Encartes", href: "/supermarket-flyers", icon: <LuNewspaper size={24} /> },
  ];

  function toggleMenu() {
    setOpenMenu((prev) => !prev);
  }

  return (
    <div>
      <ul className="fixed bottom-0 flex w-full justify-around border-t bg-white p-2 md:hidden">
        {links.map(({ label, href, icon }) => {
          const isActive = pathname === href;
          return (
            <li
              key={href}
              className={clsx({
                "text-primary-blue": isActive,
              })}
            >
              <Link href={href} className="flex flex-col items-center">
                {icon}
                <p>{label}</p>
              </Link>
            </li>
          );
        })}
        <li>
          <button className="flex flex-col items-center" onClick={toggleMenu}>
            <IoIosMenu size={24} />
            <span>Menu</span>
          </button>
        </li>
      </ul>

      {/* Menu lateral deslizante */}
      <div
        className={clsx(
          "bg-primary-blue fixed top-0 right-0 z-20 h-screen w-3/4 transform transition-transform duration-300 ease-in-out md:hidden",
          {
            "translate-x-0": openMenu,
            "translate-x-full": !openMenu,
          },
        )}
      >
        <ul className="flex flex-col p-4 text-white">
          <li className="mb-4 self-end">
            <button onClick={toggleMenu} className="text-lg font-bold">
              ✕
            </button>
          </li>
          <li className="mb-4">
            {user ? (
              <Link
                href="/my-account"
                className=" flex gap-2 py-2 px-2 rounded cursor-pointer 
               hover:text-black hover:bg-gray-100 
               active:bg-blue-200 active:text-blue-800 
               transition-colors duration-200"
              >
                <GoPerson size={24} />
                {`Olá, ${getUserDisplayName()}!`}
              </Link>
            ) : (
              <Link href="/login" className="flex gap-2">
                <GoPerson size={24} /> Faça seu login
              </Link>
            )}
          </li>

          {user && (
            <>
              {userType === "mercado" && (
                <>
                  <li>
                    <Link
                      href="/personalizar"
                      className="flex px-5 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <User size={20} />
                      Personalizar
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/mercado/criar-ofertas"
                      className="flex px-5 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Gift size={20} />
                      Criar Ofertas
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/configuracao"
                      className="flex px-5 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Settings size={20} />
                      Configuração
                    </Link>
                  </li>
                </>
              )}

              {userType === "user" && (
                <li
                  className="mt-6 flex gap-2 py-2 px-2 rounded cursor-pointer 
                 hover:text-black hover:bg-gray-100 
                 active:bg-blue-200 active:text-blue-800 
                 transition-colors duration-200"
                >
                  <GoHeart size={24} />
                  Favoritos
                </li>
              )}

              <li
                className="flex gap-2 py-2 px-2 rounded cursor-pointer 
               hover:text-black hover:bg-gray-100 
               active:bg-blue-200 active:text-blue-800 
               transition-colors duration-200"
                onClick={() => setOpenMenu(false)}
              >
                <button className="flex gap-2" onClick={handleLogout}>
                  <GoSignOut size={24} />
                  Sair
                </button>
              </li>
            </>
          )}
        </ul>
      </div>

      {openMenu && (
        <div
          className="fixed inset-0 z-10 bg-black/60 md:hidden"
          onClick={toggleMenu}
        />
      )}
    </div>
  );
}
