import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/Dashboard/ui/Card';
import { Package, DollarSign, TrendingUp, Bell } from 'lucide-react';
import styles from './DriverDashboard.module.css';

interface Delivery {
  id: string;
  address: string;
  customer: string;
  status: 'pending' | 'accepted' | 'rejected';
  amount: number;
}

const mockDeliveries: Delivery[] = [
  {
    id: '1',
    address: 'Av. Principal 123, Graupa',
    customer: 'Juan Pérez',
    status: 'pending',
    amount: 15.00
  },
  {
    id: '2',
    address: 'Calle 2 456, Misiones',
    customer: 'María García',
    status: 'pending',
    amount: 20.00
  }
];

export function DriverDashboard() {
  const { user } = useAuth();
  const [deliveries, setDeliveries] = useState(mockDeliveries);
  const [showNotification, setShowNotification] = useState(false);

  const handleDeliveryAction = (id: string, action: 'accepted' | 'rejected') => {
    setDeliveries(deliveries.map(delivery =>
      delivery.id === id ? { ...delivery, status: action } : delivery
    ));
    
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const totalEarnings = 1250.75;
  const deliveriesCompleted = 45;
  const averageRating = 4.8;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Bienvenido, {user?.name}</h1>
      </div>

      <div className={styles.stats}>
        <Card className={styles.statCard}>
          <div className={styles.statIcon}>
            <DollarSign size={24} />
          </div>
          <div className={styles.statContent}>
            <h3>Ganancias Totales</h3>
            <p className={styles.statValue}>${totalEarnings}</p>
          </div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statIcon}>
            <Package size={24} />
          </div>
          <div className={styles.statContent}>
            <h3>Entregas Completadas</h3>
            <p className={styles.statValue}>{deliveriesCompleted}</p>
          </div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statIcon}>
            <TrendingUp size={24} />
          </div>
          <div className={styles.statContent}>
            <h3>Calificación Promedio</h3>
            <p className={styles.statValue}>{averageRating}/5.0</p>
          </div>
        </Card>
      </div>

      <Card className={styles.deliveries}>
        <h2 className={styles.sectionTitle}>Pedidos Pendientes</h2>
        <div className={styles.deliveryList}>
          {deliveries.filter(d => d.status === 'pending').map((delivery) => (
            <div key={delivery.id} className={styles.deliveryItem}>
              <div className={styles.deliveryInfo}>
                <h3 className={styles.customerName}>{delivery.customer}</h3>
                <p className={styles.address}>{delivery.address}</p>
                <p className={styles.amount}>${delivery.amount.toFixed(2)}</p>
              </div>
              <div className={styles.actions}>
                <button
                  onClick={() => handleDeliveryAction(delivery.id, 'accepted')}
                  className={styles.acceptButton}
                >
                  Aceptar
                </button>
                <button
                  onClick={() => handleDeliveryAction(delivery.id, 'rejected')}
                  className={styles.rejectButton}
                >
                  Rechazar
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {showNotification && (
        <div className={styles.notification}>
          <Bell size={20} />
          <span>Estado del pedido actualizado</span>
        </div>
      )}
    </div>
  );
}