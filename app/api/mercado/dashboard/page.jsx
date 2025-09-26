import DashboardMercado from '@/components/mercado/dashboard';
import ProtectedRouteMercado from '@/components/mercado/protected-route';

export default function DashboardMercadoPage() {
  return (
    <ProtectedRouteMercado>
      <DashboardMercado />
    </ProtectedRouteMercado>
  );
}

export const metadata = {
  title: 'Dashboard do Mercado - Offers',
  description: 'Painel de controle do mercado',
};

