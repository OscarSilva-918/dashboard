import { SettingsForm } from '@/components/settings/SettingsForm';
import { DeliverySettings, NotificationSettings } from '@/types/settings';

const initialDeliverySettings: DeliverySettings = {
  baseRate: 100,
  perKmRate: 20,
  minimumOrder: 500,
  waitingTimeRate: 5,
  rushHourMultiplier: 1.5,
  maxDeliveryRadius: 10,
  rushHours: [
    { start: '11:00', end: '14:00' },
    { start: '19:00', end: '22:00' }
  ]
};

const initialNotificationSettings: NotificationSettings = {
  enablePush: true,
  enableEmail: true,
  enableSMS: false,
  events: {
    orderCreated: true,
    orderAccepted: true,
    orderPickedUp: true,
    orderDelivered: true,
    orderCancelled: true,
    driverAssigned: true
  }
};

export function SettingsPage() {
  const handleSaveSettings = (
    deliverySettings: DeliverySettings,
    notificationSettings: NotificationSettings
  ) => {
    console.log('Saving settings:', { deliverySettings, notificationSettings });
    // Aquí implementaremos la lógica para guardar la configuración
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Configuración del Sistema
        </h1>
      </div>

      <SettingsForm
        initialDeliverySettings={initialDeliverySettings}
        initialNotificationSettings={initialNotificationSettings}
        onSave={handleSaveSettings}
      />
    </div>
  );
}