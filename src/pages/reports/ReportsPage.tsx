import { useState } from 'react';
import { FinancialReport } from '@/components/reports/FinancialReport';

export function ReportsPage() {
  const [startDate] = useState(new Date());
  const [endDate] = useState(new Date());

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Informes y Análisis
        </h1>
      </div>

      <div className="space-y-8">
        <FinancialReport startDate={startDate} endDate={endDate} />
        
        {/* Aquí podemos agregar más tipos de reportes */}
      </div>
    </div>
  );
}