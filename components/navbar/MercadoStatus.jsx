import Link from "next/link";
import { LogOut, Settings, Gift, Store } from "lucide-react";

export default function MercadoDropdown({ handleLogout }) {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
      <Link href="/mercado/configuracao" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
        <Settings size={16} className="inline-block mr-2" />
        Configuração
      </Link>
      <Link href="/mercado/criar-ofertas" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
        <Gift size={16} className="inline-block mr-2" />
        Criar Ofertas
      </Link>
      <hr className="my-1 border-gray-200" />
      <button
        onClick={handleLogout}
        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
      >
        <LogOut size={16} className="inline-block mr-2" />
        Sair
      </button>
    </div>
  );
}

