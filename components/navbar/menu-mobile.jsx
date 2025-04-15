"use client";

import { IoIosMenu } from "react-icons/io";
import { LuListChecks, LuNewspaper } from "react-icons/lu";
import { GoHome } from "react-icons/go";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

export default function MenuMobile() {
  const pathname = usePathname();

  const links = [
    { label: "Início", href: "/", icon: <GoHome size={24} /> },
    {
      label: "Criar Listas",
      href: "/create-list",
      icon: <LuListChecks size={24} />,
    },
    {
      label: "Encartes",
      href: "/en",
      icon: <LuNewspaper size={24} />,
    },
  ];

  return (
    <div className="fixed bottom-0 w-full border-t bg-white p-2 md:hidden">
      <ul className="flex justify-around">
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
        <li className="flex flex-col items-center">
          <IoIosMenu size={24} />
          <span>Menu</span>
        </li>
      </ul>
    </div>
  );
}
