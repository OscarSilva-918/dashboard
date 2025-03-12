import { useState } from 'react';
import { Package, Search, Filter } from 'lucide-react';
import { Order } from '@/types/order';
import { formatDistanceToNow } from '@/utils/dateUtils';

interface OrderListProps {
  orders: Order[];
  onAssignDriver: (orderId: string) => void;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
}

export function OrderList({ orders, onAssignDriver, onUpdateStatus }: OrderListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Order['status'] | 'all'>('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por cliente o ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full rounded-md border-gray-300 dark:border-gray-600 
                       dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as Order['status'] | 'all')}
              className="rounded-md border-gray-300 dark:border-gray-600 
                       dark:bg-gray-700 dark:text-white"
            >
              <option value="all">Todos los estados</option>
              <option value="pending">Pendientes</option>
              <option value="accepted">Aceptados</option>
              <option value="in_progress">En Progreso</option>
              <option value="delivered">Entregados</option>
              <option value="cancelled">Cancelados</option>
            </select>
            <button className="p-2 rounded-md border border-gray-300 dark:border-gray-600
                           hover:bg-gray-100 dark:hover:bg-gray-700">
              <Filter size={20} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {filteredOrders.map(order => (
          <div key={order.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Package className="text-blue-600 dark:text-blue-400" size={24} />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {order.customerName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ID: {order.id}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-2 py-1 text-sm rounded-full ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                  order.status === 'in_progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                  'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                }`}>
                  {order.status}
                </span>
                <button
                  onClick={() => onAssignDriver(order.id)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md
                           hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Asignar Repartidor
                </button>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Dirección:</span>
                <p className="text-gray-900 dark:text-white">{order.address}</p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Total:</span>
                <p className="text-gray-900 dark:text-white">
                  ${order.total.toFixed(2)}
                </p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Creado:</span>
                <p className="text-gray-900 dark:text-white">
                  {formatDistanceToNow(new Date(order.createdAt))}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}