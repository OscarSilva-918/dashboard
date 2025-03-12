import { Download } from 'lucide-react';
import { Shipment } from '@/types/shipment';

interface ExportButtonProps {
  data: Shipment[];
  type: 'csv' | 'pdf';
}

export function ExportButton({ data, type }: ExportButtonProps) {
  const exportData = () => {
    if (type === 'csv') {
      const headers = ['ID', 'Tracking', 'Cliente', 'Destino', 'Estado', 'Entrega Estimada'];
      const csvContent = [
        headers.join(','),
        ...data.map(shipment => [
          shipment.id,
          shipment.trackingNumber,
          shipment.customer,
          shipment.destination,
          shipment.status,
          shipment.estimatedDelivery
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `envios_${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
    }
  };

  return (
    <button
      onClick={exportData}
      className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 
                 border border-gray-300 dark:border-gray-600 rounded-lg
                 hover:bg-gray-50 dark:hover:bg-gray-700
                 text-gray-700 dark:text-gray-300"
    >
      <Download size={18} />
      <span>Exportar {type.toUpperCase()}</span>
    </button>
  );
}