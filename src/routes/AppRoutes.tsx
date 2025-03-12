import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { ShipmentsPage } from '@/pages/shipments/ShipmentsPage';
import { TrackingPage } from '@/pages/tracking/TrackingPage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { DriverDashboard } from '@/pages/driver/DriverDashboard';
import { OperatorDashboard } from '@/pages/operator/OperatorDashboard';
import { OrdersPage } from '@/pages/orders/OrdersPage';
import { ReportsPage } from '@/pages/reports/ReportsPage';
import { SettingsPage } from '@/pages/settings/SettingsPage';
import { ShippingQuotePage } from '@/pages/ShippingQuote/ShippingQuotePage';

function ProtectedRoute({ children, allowedRoles }: { children: JSX.Element, allowedRoles: string[] }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['admin', 'driver', 'operator']}>
            {user?.role === 'admin' ? <DashboardPage /> : 
             user?.role === 'driver' ? <DriverDashboard /> :
             <OperatorDashboard />}
          </ProtectedRoute>
        }
      />

<Route
        path="/shipments"
        element={
          <ProtectedRoute allowedRoles={['admin', 'operator']}>
            <ShipmentsPage />
          </ProtectedRoute>
        }
      />

<Route
        path="/shipping-quote"
        element={
          <ProtectedRoute allowedRoles={['admin', 'operator']}>
            <ShippingQuotePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tracking"
        element={
          <ProtectedRoute allowedRoles={['admin', 'operator']}>
            <TrackingPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute allowedRoles={['admin', 'operator']}>
            <OrdersPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ReportsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <SettingsPage />
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}