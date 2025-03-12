import { useState } from 'react';
import { Bell } from 'lucide-react';
import { formatDistanceToNow } from '@/utils/dateUtils';

interface Notification {
  id: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export function NotificationBell() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      message: 'Nuevo envío asignado #TN123456',
      timestamp: new Date().toISOString(),
      read: false
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notificaciones</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="p-4 text-gray-600 dark:text-gray-400">No hay notificaciones</p>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 
                    ${notification.read ? 'opacity-70' : 'bg-blue-50 dark:bg-blue-900/20'}`}
                >
                  <p className="text-sm text-gray-900 dark:text-white">{notification.message}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {formatDistanceToNow(new Date(notification.timestamp))}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}