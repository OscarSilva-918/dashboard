import { useState } from 'react';
import { Package, Plus, Truck } from 'lucide-react';
import { ShipmentForm, ShipmentFormData } from '@/components/forms/ShipmentForm/ShipmentForm';
import { DriverForm, DriverFormData } from '@/components/forms/DriverForm/DriverForm';
import { AssignDriverModal } from '@/components/shipments/AssignDriverModal/AssignDriverModal';
import { ExportButton } from '@/components/export/ExportButton';
import { mockShipments } from '@/data/mockData';
import { Driver } from '@/types/driver';
import { Shipment } from '@/types/shipment';
import styles from './ShipmentsPage.module.css';

export function ShipmentsPage() {
  const [showShipmentForm, setShowShipmentForm] = useState(false);
  const [showDriverForm, setShowDriverForm] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [shipments, setShipments] = useState<Shipment[]>(mockShipments);
  const [drivers] = useState<Driver[]>([]);

  const handleAddShipment = (data: ShipmentFormData) => {
    const newShipment: Shipment = {
      id: crypto.randomUUID(),
      trackingNumber: `TN${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      ...data,
      status: 'pending'
    };
    setShipments([...shipments, newShipment]);
    setShowShipmentForm(false);
  };

  const handleAddDriver = (data: DriverFormData) => {
    // Implementation for adding a driver
    setShowDriverForm(false);
  };

  const handleAssignDriver = (shipmentId: string, driverId: string) => {
    // Implementation for assigning a driver to a shipment
    setSelectedShipment(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gestión de Envíos</h1>
        <div className={styles.actions}>
          <ExportButton data={shipments} type="csv" />
          <button
            onClick={() => setShowDriverForm(true)}
            className={styles.actionButton}
          >
            <Truck size={20} />
            <span>Agregar Repartidor</span>
          </button>
          <button
            onClick={() => setShowShipmentForm(true)}
            className={styles.actionButton}
          >
            <Plus size={20} />
            <span>Nuevo Envío</span>
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.shipmentsGrid}>
          {shipments.map((shipment) => (
            <div key={shipment.id} className={styles.shipmentCard}>
              <div className={styles.shipmentHeader}>
                <Package size={20} />
                <span className={styles.trackingNumber}>{shipment.trackingNumber}</span>
              </div>
              <div className={styles.shipmentInfo}>
                <p className={styles.customer}>{shipment.customer}</p>
                <p className={styles.destination}>{shipment.destination}</p>
                <span className={`${styles.status} ${styles[shipment.status]}`}>
                  {shipment.status}
                </span>
              </div>
              <button
                onClick={() => setSelectedShipment(shipment)}
                className={styles.assignButton}
              >
                Asignar Repartidor
              </button>
            </div>
          ))}
        </div>
      </div>

      {showShipmentForm && (
        <ShipmentForm
          onSubmit={handleAddShipment}
          onCancel={() => setShowShipmentForm(false)}
        />
      )}

      {showDriverForm && (
        <DriverForm
          onSubmit={handleAddDriver}
          onCancel={() => setShowDriverForm(false)}
        />
      )}

      {selectedShipment && (
        <AssignDriverModal
          shipment={selectedShipment}
          drivers={drivers}
          onAssign={handleAssignDriver}
          onClose={() => setSelectedShipment(null)}
        />
      )}
    </div>
  );
}