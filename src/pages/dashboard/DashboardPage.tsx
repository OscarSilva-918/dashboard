import { Package, Truck, CheckCircle, PackageOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { PackageOverview } from '@/components/dashboard/PackageOverview';
import { mockStats, mockActivities, mockShipments } from '@/data/mockData';
import styles from './DashboardPage.module.css';

export function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <section className={styles.statsGrid}>
        <StatsCard
          title="Total de Envíos"
          value={mockStats.totalShipments}
          icon={Package}
          trend={5}
        />
        <StatsCard
          title="Entregas Pendientes"
          value={mockStats.pendingDeliveries}
          icon={PackageOpen}
          trend={-2}
        />
        <StatsCard
          title="En Tránsito"
          value={mockStats.inTransit}
          icon={Truck}
          trend={3}
        />
        <StatsCard
          title="Entregados"
          value={mockStats.delivered}
          icon={CheckCircle}
          trend={8}
        />
      </section>

      <section className={styles.contentGrid}>
        <PackageOverview shipments={mockShipments} />
        <RecentActivity activities={mockActivities} />
      </section>
    </div>
  );
}