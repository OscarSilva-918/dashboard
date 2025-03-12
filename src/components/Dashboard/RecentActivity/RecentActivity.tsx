import { Activity } from '@/types/shipment';
import { formatDistanceToNow } from '@/utils/dateUtils';
import styles from './RecentActivity.module.css';

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Actividad Reciente</h2>
      <div className={styles.list}>
        {activities.map((activity) => (
          <div key={activity.id} className={styles.item}>
            <div className={`${styles.indicator} ${styles[activity.type]}`} />
            <div className={styles.content}>
              <p className={styles.message}>{activity.message}</p>
              <p className={styles.time}>
                {formatDistanceToNow(new Date(activity.timestamp))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}