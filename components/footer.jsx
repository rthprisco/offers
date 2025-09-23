"use client";

import { FaInstagram, FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="bg-primary-blue flex md:h-32 h-40 w-full md:items-center pt-10 md:pt-0 justify-around text-white">
      <p>© 2024 - OFFers</p>
      <div className="flex gap-4">
        <FaInstagram size={20} />
        <FaFacebook size={20} />
        <BsTwitterX size={20} />
      </div>
    </footer>
  );
}
