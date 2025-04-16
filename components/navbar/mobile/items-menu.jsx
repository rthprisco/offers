"use client";

import { CircleUser } from "lucide-react";
import { IoIosMenu } from "react-icons/io";
import { LuListChecks, LuNewspaper } from "react-icons/lu";
import { GoHeart, GoHome, GoPerson, GoSignOut } from "react-icons/go";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { logout } from "@/controllers/authController";

export default function ItemsMenu({ session }) {
  const pathname = usePathname();
  const userName = session?.user?.name.split(" ")[0];

  const links = [
    { label: "Início", href: "/", icon: <GoHome size={24} /> },
    {
      label: "Criar Listas",
      href: "/create-list",
      icon: <LuListChecks size={24} />,
    },
    {
      label: "Encartes",
      href: "/supermarket-flyers",
      icon: <LuNewspaper size={24} />,
    },
  ];

  const [openMenu, setOpenMenu] = useState(false);

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
            {session ? (
              <Link href="/my-account" className="flex gap-2">
                <GoPerson size={24} />
                {`Olá, ${userName}!`}
              </Link>
            ) : (
              <Link href="/login" className="flex gap-2">
                <GoPerson size={24} /> Faça seu login
              </Link>
            )}
          </li>
          {session && (
            <>
              <li className="mb-4 flex gap-2">
                <GoHeart size={24} />
                Favoritos
              </li>
              <li className="mb-4" onClick={() => setOpenMenu(false)}>
                <p className="flex gap-2" onClick={logout}>
                  <GoSignOut size={24} />
                  Sair
                </p>
              </li>
            </>
          )}

          {/* {links.map(({ label, href, icon }) => (
            <li key={href} className="mb-4">
              <Link
                href={href}
                onClick={() => setOpenMenu(false)}
                className="flex items-center gap-3 text-lg"
              >
                {icon}
                {label}
              </Link>
            </li>
          ))} */}
        </ul>
      </div>

      {/* Fundo escuro ao abrir o menu */}
      {openMenu && (
        <div
          className="fixed inset-0 z-10 bg-black/60 md:hidden"
          onClick={toggleMenu}
        />
      )}
    </div>
  );
}
