import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  BarChart3,
  Settings,
  ChevronLeft,
  Menu,
  MapPin
} from 'lucide-react';
import styles from './Sidebar.module.css';

const menuItems = [
  { icon: LayoutDashboard, label: 'Panel Principal', path: '/dashboard' },
  { icon: Package, label: 'Gestión de Envíos', path: '/shipments' },
  { icon: ClipboardList, label: 'Pedidos', path: '/orders' },
  { icon: MapPin, label: 'Seguimiento', path: '/tracking' },
  { icon: BarChart3, label: 'Informes', path: '/reports' },
  { icon: Settings, label: 'Configuración', path: '/settings' }
] as const;

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.header}>
        {!collapsed && <h1 className={styles.title}>SeguiPaquetes</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={styles.collapseButton}
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`${styles.navItem} ${
              location.pathname === item.path ? styles.active : ''
            }`}
          >
            <item.icon size={20} />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
}