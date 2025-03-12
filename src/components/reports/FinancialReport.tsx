import { useState } from 'react';
import { BarChart, DollarSign, TrendingUp, Users } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';

interface FinancialReportProps {
  startDate: Date;
  endDate: Date;
}

export function FinancialReport({ startDate, endDate }: FinancialReportProps) {
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('day');

  // Mock data - replace with real data from your backend
  const stats = {
    totalRevenue: 15780.50,
    totalOrders: 245,
    averageOrderValue: 64.41,
    activeDrivers: 12
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Reporte Financiero
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setPeriod('day')}
            className={`px-3 py-1 rounded-md ${
              period === 'day' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Día
          </button>
          <button
            onClick={() => setPeriod('week')}
            className={`px-3 py-1 rounded-md ${
              period === 'week'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Semana
          </button>
          <button
            onClick={() => setPeriod('month')}
            className={`px-3 py-1 rounded-md ${
              period === 'month'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Mes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Ingresos Totales"
          value={stats.totalRevenue}
          icon={DollarSign}
          trend={12}
        />
        <StatsCard
          title="Total de Pedidos"
          value={stats.totalOrders}
          icon={BarChart}
          trend={8}
        />
        <StatsCard
          title="Valor Promedio"
          value={stats.averageOrderValue}
          icon={TrendingUp}
          trend={-2}
        />
        <StatsCard
          title="Repartidores Activos"
          value={stats.activeDrivers}
          icon={Users}
          trend={5}
        />
      </div>

      {/* Add charts and detailed tables here */}
    </div>
  );
}