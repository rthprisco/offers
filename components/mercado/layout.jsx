'use client';

import NavigationMenuMercado from './navigation-menu';
import ProtectedRouteMercado from './protected-route';

export default function MercadoLayout({ children }) {
  return (
    <ProtectedRouteMercado>
      <div className="flex min-h-screen bg-gray-50">
        <NavigationMenuMercado />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </ProtectedRouteMercado>
  );
}

