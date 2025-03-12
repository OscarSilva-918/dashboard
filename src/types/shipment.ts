export interface Shipment {
  id: string;
  trackingNumber: string;
  destination: string;
  status: 'pending' | 'in_transit' | 'delivered';
  estimatedDelivery: string;
  customer: string;
}

export interface ShipmentStats {
  totalShipments: number;
  pendingDeliveries: number;
  inTransit: number;
  delivered: number;
}

export interface Activity {
  id: string;
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning';
  shipmentId: string;
}