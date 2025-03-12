import { useState } from 'react';
import styles from './ShipmentForm.module.css';

interface ShipmentFormProps {
  onSubmit: (data: ShipmentFormData) => void;
  onCancel: () => void;
}

export interface ShipmentFormData {
  trackingNumber: string;
  customer: string;
  destination: string;
  estimatedDelivery: string;
}

export function ShipmentForm({ onSubmit, onCancel }: ShipmentFormProps) {
  const [formData, setFormData] = useState<ShipmentFormData>({
    trackingNumber: '',
    customer: '',
    destination: '',
    estimatedDelivery: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={styles.modalOverlay}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Nuevo Envío</h2>
        
        <div className={styles.field}>
          <label htmlFor="customer">Cliente</label>
          <input
            id="customer"
            type="text"
            value={formData.customer}
            onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="destination">Destino</label>
          <input
            id="destination"
            type="text"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="estimatedDelivery">Fecha Estimada de Entrega</label>
          <input
            id="estimatedDelivery"
            type="date"
            value={formData.estimatedDelivery}
            onChange={(e) => setFormData({ ...formData, estimatedDelivery: e.target.value })}
            required
          />
        </div>

        <div className={styles.actions}>
          <button type="button" onClick={onCancel} className={styles.cancelButton}>
            Cancelar
          </button>
          <button type="submit" className={styles.submitButton}>
            Crear Envío
          </button>
        </div>
      </form>
    </div>
  );
}