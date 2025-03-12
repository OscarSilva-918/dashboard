export interface Order {
  id: string;
  customerName: string;
  address: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'accepted' | 'in_progress' | 'delivered' | 'cancelled';
  paymentMethod: 'cash' | 'card' | 'digital_wallet';
  paymentStatus: 'pending' | 'completed';
  createdAt: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  driverId?: string;
  rating?: number;
  notes?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface OrderStats {
  total: number;
  pending: number;
  inProgress: number;
  delivered: number;
  cancelled: number;
  averageDeliveryTime: number;
  totalRevenue: number;
}