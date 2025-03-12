import { LucideIcon } from 'lucide-react';
import styles from './StatsCard.module.css';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: number;
}

export function StatsCard({ title, value, icon: Icon, trend }: StatsCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.info}>
          <h3>{title}</h3>
          <div className={styles.value}>{value.toLocaleString()}</div>
          {trend && (
            <div className={`${styles.trend} ${trend > 0 ? styles.up : styles.down}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% desde el mes pasado
            </div>
          )}
        </div>
        <div className={styles.icon}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}