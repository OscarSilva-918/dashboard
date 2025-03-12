import { useState } from 'react';
import { Save } from 'lucide-react';
import { DeliverySettings, NotificationSettings } from '@/types/settings';

interface SettingsFormProps {
  initialDeliverySettings: DeliverySettings;
  initialNotificationSettings: NotificationSettings;
  onSave: (deliverySettings: DeliverySettings, notificationSettings: NotificationSettings) => void;
}

export function SettingsForm({ 
  initialDeliverySettings, 
  initialNotificationSettings,
  onSave 
}: SettingsFormProps) {
  const [deliverySettings, setDeliverySettings] = useState(initialDeliverySettings);
  const [notificationSettings, setNotificationSettings] = useState(initialNotificationSettings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(deliverySettings, notificationSettings);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Configuración de Entregas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Tarifa Base
            </label>
            <input
              type="number"
              value={deliverySettings.baseRate}
              onChange={(e) => setDeliverySettings({
                ...deliverySettings,
                baseRate: parseFloat(e.target.value)
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Tarifa por KM
            </label>
            <input
              type="number"
              value={deliverySettings.perKmRate}
              onChange={(e) => setDeliverySettings({
                ...deliverySettings,
                perKmRate: parseFloat(e.target.value)
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          {/* Add more delivery settings fields */}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Configuración de Notificaciones
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="enablePush"
              checked={notificationSettings.enablePush}
              onChange={(e) => setNotificationSettings({
                ...notificationSettings,
                enablePush: e.target.checked
              })}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <label htmlFor="enablePush" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Activar Notificaciones Push
            </label>
          </div>
          {/* Add more notification settings */}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Save size={20} />
          Guardar Cambios
        </button>
      </div>
    </form>
  );
}