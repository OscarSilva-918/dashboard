import { Activity, Shipment, ShipmentStats } from '../types/shipment';
import { Order, OrderStats } from '../types/order';

export const mockStats: ShipmentStats = {
  totalShipments: 1234,
  pendingDeliveries: 45,
  inTransit: 89,
  delivered: 1100
};

export const mockActivities: Activity[] = [
  {
    id: '1',
    message: 'Paquete #TN123456 ha sido entregado a Juan Pérez',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    type: 'success',
    shipmentId: 'TN123456'
  },
  {
    id: '2',
    message: 'Paquete #TN123457 está en ruta de entrega',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    type: 'info',
    shipmentId: 'TN123457'
  },
  {
    id: '3',
    message: 'Paquete #TN123458 requiere atención',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    type: 'warning',
    shipmentId: 'TN123458'
  }
];

export const mockShipments: Shipment[] = [
  {
    id: '1',
    trackingNumber: 'TN123456',
    customer: 'Juan Pérez',
    destination: 'Madrid, ES',
    status: 'delivered',
    estimatedDelivery: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString()
  },
  {
    id: '2',
    trackingNumber: 'TN123457',
    customer: 'María García',
    destination: 'Barcelona, ES',
    status: 'in_transit',
    estimatedDelivery: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString()
  },
  {
    id: '3',
    trackingNumber: 'TN123458',
    customer: 'Carlos Rodríguez',
    destination: 'Valencia, ES',
    status: 'pending',
    estimatedDelivery: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString()
  }
];

export const mockOrderStats: OrderStats = {
  total: 450,
  pending: 45,
  inProgress: 89,
  delivered: 300,
  cancelled: 16,
  averageDeliveryTime: 45, // minutes
  totalRevenue: 45000
};