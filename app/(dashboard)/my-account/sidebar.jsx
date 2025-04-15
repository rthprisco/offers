"use client";

import { logout } from "@/controllers/authController";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoPerson, GoLock, GoHeart, GoBell, GoSignOut } from "react-icons/go";
import clsx from "clsx";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { label: "Minha conta", href: "/my-account", icon: <GoPerson size={24} /> },
    {
      label: "Segurança e privacidade",
      href: "/my-account/security",
      icon: <GoLock size={24} />,
    },
    {
      label: "Favoritos",
      href: "/my-account/favorites",
      icon: <GoHeart size={24} />,
    },
    {
      label: "Notificações",
      href: "/my-account/notifications",
      icon: <GoBell size={24} />,
    },
  ];

  return (
    <div className="mt-12 mr-20 hidden flex-col gap-2 md:flex">
      {links.map(({ label, href, icon }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={clsx("flex items-center px-6 py-2", {
              "text-primary-blue bg-primary-blue/10 rounded-3xl": isActive,
            })}
          >
            {icon}
            <p className="ml-6">{label}</p>
          </Link>
        );
      })}
    </div>
  );
}
