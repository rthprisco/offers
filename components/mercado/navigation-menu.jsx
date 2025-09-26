'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Store, Home, ShoppingBag, Settings, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    title: 'Dashboard',
    href: '/mercado/dashboard',
    icon: Home
  },
  {
    title: 'Ofertas',
    href: '/mercado/ofertas',
    icon: ShoppingBag
  },
  {
    title: 'Relatórios',
    href: '/mercado/relatorios',
    icon: BarChart3
  },
  {
    title: 'Configurações',
    href: '/mercado/configuracoes',
    icon: Settings
  }
];

export default function NavigationMenuMercado() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm border-r min-h-screen w-64">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Store className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Painel do Mercado</h2>
            <p className="text-sm text-gray-500">Offers Platform</p>
          </div>
        </div>

        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

