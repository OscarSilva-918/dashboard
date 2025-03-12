import { Activity } from '../../types/shipment';
import { formatDistanceToNow } from '../../utils/dateUtils';

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Actividad Reciente</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
          >
            <div className={`
              w-2 h-2 mt-2 rounded-full flex-shrink-0
              ${activity.type === 'success' ? 'bg-green-500' : ''}
              ${activity.type === 'warning' ? 'bg-yellow-500' : ''}
              ${activity.type === 'info' ? 'bg-blue-500' : ''}
            `} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
              <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">
                {formatDistanceToNow(new Date(activity.timestamp))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}