import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Package, Phone, MapPin, Clock } from 'lucide-react';
import { Card } from '@/components/Dashboard/ui/Card';
import { ShipmentForm } from '@/components/forms/ShipmentForm/ShipmentForm';
import { Order } from '@/types/order';
import styles from './OperatorDashboard.module.css';

const mockOrders: Order[] = [
  {
    id: '1',
    customerName: 'Juan Pérez',
    address: 'Av. Principal 123, Graupa',
    items: [{ id: '1', name: 'Producto 1', quantity: 2, price: 25.00 }],
    total: 50.00,
    status: 'pending',
    paymentMethod: 'cash',
    paymentStatus: 'pending',
    createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 3600000).toISOString()
  }
];

export function OperatorDashboard() {
  const { user } = useAuth();
  const [showNewOrderForm, setShowNewOrderForm] = useState(false);
  const [orders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreateOrder = (data: any) => {
    // Implementar lógica para crear pedido
    setShowNewOrderForm(false);
  };

  const filteredOrders = orders.filter(order =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Panel de Operador
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Bienvenido, {user?.name}
          </p>
        </div>
        <button
          onClick={() => setShowNewOrderForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                   flex items-center gap-2"
        >
          <Package size={20} />
          Crear Nuevo Pedido
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
              <Package className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <div>
              <h3 className="text-sm text-gray-600 dark:text-gray-400">
                Pedidos Pendientes
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {orders.filter(o => o.status === 'pending').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
              <Clock className="text-green-600 dark:text-green-400" size={24} />
            </div>
            <div>
              <h3 className="text-sm text-gray-600 dark:text-gray-400">
                En Proceso
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {orders.filter(o => o.status === 'in_progress').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
              <MapPin className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <div>
              <h3 className="text-sm text-gray-600 dark:text-gray-400">
                Entregados Hoy
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {orders.filter(o => o.status === 'delivered').length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Pedidos Recientes
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar pedidos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                       focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredOrders.map(order => (
            <div key={order.id} className="py-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {order.customerName}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    ID: {order.id}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {order.address}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 text-sm rounded-full ${
                    order.status === 'pending' 
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  }`}>
                    {order.status}
                  </span>
                  <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    ${order.total.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="mt-2 flex gap-2">
                <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 
                                 dark:hover:text-blue-300 flex items-center gap-1">
                  <Phone size={16} />
                  Contactar Cliente
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {showNewOrderForm && (
        <ShipmentForm
          onSubmit={handleCreateOrder}
          onCancel={() => setShowNewOrderForm(false)}
        />
      )}
    </div>
  );
}