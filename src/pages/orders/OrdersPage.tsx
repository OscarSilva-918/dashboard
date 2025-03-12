import { useState } from 'react';
import { OrderList } from '@/components/orders/OrderList';
import { AssignDriverModal } from '@/components/shipments/AssignDriverModal/AssignDriverModal';
import { Plus } from 'lucide-react';
import { Order } from '@/types/order';

// Mock data
const mockOrders: Order[] = [
  {
    id: '1',
    customerName: 'Juan Pérez',
    address: 'Av. Principal 123, Graupa',
    items: [
      { id: '1', name: 'Producto 1', quantity: 2, price: 25.00 }
    ],
    total: 50.00,
    status: 'pending',
    paymentMethod: 'cash',
    paymentStatus: 'pending',
    createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 3600000).toISOString()
  },
  {
    id: '2',
    customerName: 'María García',
    address: 'Calle 2 456, Misiones',
    items: [
      { id: '2', name: 'Producto 2', quantity: 1, price: 30.00 }
    ],
    total: 30.00,
    status: 'in_progress',
    paymentMethod: 'card',
    paymentStatus: 'completed',
    createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 7200000).toISOString()
  }
];

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const handleAssignDriver = (orderId: string) => {
    setSelectedOrderId(orderId);
  };

  const handleUpdateStatus = (orderId: string, status: Order['status']) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status } : order
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Gestión de Pedidos
        </h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Plus size={20} />
          <span>Nuevo Pedido</span>
        </button>
      </div>

      <OrderList
        orders={orders}
        onAssignDriver={handleAssignDriver}
        onUpdateStatus={handleUpdateStatus}
      />

      {selectedOrderId && (
        <AssignDriverModal
          shipment={orders.find(o => o.id === selectedOrderId)!}
          drivers={[]}
          onAssign={() => {}}
          onClose={() => setSelectedOrderId(null)}
        />
      )}
    </div>
  );
}