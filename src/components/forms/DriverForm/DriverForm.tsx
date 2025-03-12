import { useState } from 'react';
import styles from './DriverForm.module.css';

interface DriverFormProps {
  onSubmit: (data: DriverFormData) => void;
  onCancel: () => void;
}

export interface DriverFormData {
  name: string;
  email: string;
  phone: string;
}

export function DriverForm({ onSubmit, onCancel }: DriverFormProps) {
  const [formData, setFormData] = useState<DriverFormData>({
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={styles.modalOverlay}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Nuevo Repartidor</h2>
        
        <div className={styles.field}>
          <label htmlFor="name">Nombre Completo</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="phone">Teléfono</label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>

        <div className={styles.actions}>
          <button type="button" onClick={onCancel} className={styles.cancelButton}>
            Cancelar
          </button>
          <button type="submit" className={styles.submitButton}>
            Agregar Repartidor
          </button>
        </div>
      </form>
    </div>
  );
}