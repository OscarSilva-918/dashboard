import { Driver } from '@/types/driver';
import { Shipment } from '@/types/shipment';
import styles from './AssignDriverModal.module.css';

interface AssignDriverModalProps {
  shipment: Shipment;
  drivers: Driver[];
  onAssign: (shipmentId: string, driverId: string) => void;
  onClose: () => void;
}

export function AssignDriverModal({ 
  shipment, 
  drivers, 
  onAssign, 
  onClose 
}: AssignDriverModalProps) {
  const availableDrivers = drivers.filter(d => d.status === 'available');

  const handleAssign = (driverId: string) => {
    onAssign(shipment.id, driverId);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Asignar Repartidor</h2>
        <p className={styles.shipmentInfo}>
          Envío #{shipment.trackingNumber} - {shipment.destination}
        </p>

        <div className={styles.driverList}>
          {availableDrivers.length === 0 ? (
            <p className={styles.noDrivers}>No hay repartidores disponibles</p>
          ) : (
            availableDrivers.map(driver => (
              <div key={driver.id} className={styles.driverItem}>
                <div>
                  <h3 className={styles.driverName}>{driver.name}</h3>
                  <p className={styles.driverInfo}>{driver.email} • {driver.phone}</p>
                </div>
                <button
                  onClick={() => handleAssign(driver.id)}
                  className={styles.assignButton}
                >
                  Asignar
                </button>
              </div>
            ))
          )}
        </div>

        <button onClick={onClose} className={styles.closeButton}>
          Cancelar
        </button>
      </div>
    </div>
  );
}