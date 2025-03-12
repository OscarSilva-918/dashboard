import { Search } from 'lucide-react';
import { useState } from 'react';
import { Shipment } from '@/types/shipment';
import { statusTranslations } from '@/utils/statusUtils';
import styles from './PackageOverview.module.css';

interface PackageOverviewProps {
  shipments: Shipment[];
}

export function PackageOverview({ shipments }: PackageOverviewProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredShipments = shipments.filter((shipment) =>
    shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Resumen de Paquetes</h2>
        <div className={styles.search}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar paquetes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Número de Seguimiento</th>
              <th>Cliente</th>
              <th>Destino</th>
              <th>Estado</th>
              <th>Entrega Estimada</th>
            </tr>
          </thead>
          <tbody>
            {filteredShipments.map((shipment) => (
              <tr key={shipment.id}>
                <td>{shipment.trackingNumber}</td>
                <td>{shipment.customer}</td>
                <td>{shipment.destination}</td>
                <td>
                  <span className={`${styles.status} ${styles[shipment.status]}`}>
                    {statusTranslations[shipment.status]}
                  </span>
                </td>
                <td>{new Date(shipment.estimatedDelivery).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}