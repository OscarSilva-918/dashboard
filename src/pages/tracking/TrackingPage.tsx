import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Driver } from '@/types/driver';
import { Card } from '@/components/Dashboard/ui/Card';
import { ExportButton } from '@/components/export/ExportButton';
import { Phone, Mail, AlertCircle, ChevronUp, ChevronDown } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import styles from './TrackingPage.module.css';

// Mock driver locations in Graupa, Misiones
const mockDrivers: (Driver & { location: [number, number] })[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    phone: '+1234567890',
    status: 'available',
    activeDeliveries: 2,
    location: [-27.3621, -55.8913]
  },
  {
    id: '2',
    name: 'María García',
    email: 'maria@example.com',
    phone: '+1234567891',
    status: 'busy',
    activeDeliveries: 1,
    location: [-27.3589, -55.8945]
  },
  {
    id: '3',
    name: 'Carlos Rodríguez',
    email: 'carlos@example.com',
    phone: '+1234567892',
    status: 'available',
    activeDeliveries: 0,
    location: [-27.3601, -55.8899]
  }
];

export function TrackingPage() {
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [isDriverListCollapsed, setIsDriverListCollapsed] = useState(false);

  const handleContactDriver = (driver: Driver) => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className="flex justify-between items-center mb-6">
          <h1 className={styles.title}>Seguimiento de Repartidores</h1>
          <div className="flex gap-4">
            <ExportButton 
              data={mockDrivers.map(d => ({ 
                name: d.name, 
                status: d.status, 
                deliveries: d.activeDeliveries 
              }))} 
              type="csv" 
            />
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.driversSection}>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <h2 className={styles.sectionTitle}>Repartidores Activos</h2>
              <span className={styles.driverCount}>
                {mockDrivers.length} repartidores
              </span>
            </div>
            <button
              onClick={() => setIsDriverListCollapsed(!isDriverListCollapsed)}
              className={styles.collapseButton}
            >
              {isDriverListCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
            </button>
          </div>
          
          {!isDriverListCollapsed && (
            <div className={styles.driverGrid}>
              {mockDrivers.map((driver) => (
                <Card
                  key={driver.id}
                  className={`${styles.driverCard} ${
                    selectedDriver?.id === driver.id ? styles.selected : ''
                  }`}
                  onClick={() => setSelectedDriver(driver)}
                >
                  <div className={styles.driverHeader}>
                    <h3 className={styles.driverName}>{driver.name}</h3>
                    <span
                      className={`${styles.status} ${
                        driver.status === 'available' ? styles.available : styles.busy
                      }`}
                    >
                      {driver.status === 'available' ? 'Disponible' : 'Ocupado'}
                    </span>
                  </div>
                  <div className={styles.driverDetails}>
                    <p className={styles.driverInfo}>
                      <span className="font-semibold">Entregas activas:</span> {driver.activeDeliveries}
                    </p>
                    <div className="flex gap-4 mt-3">
                      <button 
                        className={styles.iconButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `tel:${driver.phone}`;
                        }}
                      >
                        <Phone size={16} />
                      </button>
                      <button 
                        className={styles.iconButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `mailto:${driver.email}`;
                        }}
                      >
                        <Mail size={16} />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <Card className={`${styles.map} ${isDriverListCollapsed ? styles.mapExpanded : ''}`}>
          <MapContainer
            center={[-27.3621, -55.8913]}
            zoom={15}
            className={styles.mapContainer}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {mockDrivers.map((driver) => (
              <Marker
                key={driver.id}
                position={driver.location}
                eventHandlers={{
                  click: () => setSelectedDriver(driver),
                }}
              >
                <Popup>
                  <div className={styles.popup}>
                    <h3 className={styles.driverName}>{driver.name}</h3>
                    <p className={styles.driverInfo}>
                      Estado: {driver.status === 'available' ? 'Disponible' : 'Ocupado'}
                    </p>
                    <p className={styles.driverInfo}>
                      Entregas activas: {driver.activeDeliveries}
                    </p>
                    <button
                      onClick={() => handleContactDriver(driver)}
                      className={styles.contactButton}
                    >
                      Contactar
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Card>
      </div>

      {showAlert && (
        <div className={styles.alert}>
          <AlertCircle size={20} />
          <span>Notificación enviada al repartidor</span>
        </div>
      )}
    </div>
  );
}