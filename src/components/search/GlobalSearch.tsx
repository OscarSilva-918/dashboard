import { Search } from 'lucide-react';
import { useState } from 'react';

export function GlobalSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement global search logic here
  };

  return (
    <div className="relative max-w-md w-full">
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Buscar envíos, clientes, repartidores..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowResults(true)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                   focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 
                   text-gray-900 dark:text-white"
        />
      </form>

      {showResults && searchTerm && (
        <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50">
          <div className="p-4">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Resultados</h4>
            {/* Add search results here */}
          </div>
        </div>
      )}
    </div>
  );
}