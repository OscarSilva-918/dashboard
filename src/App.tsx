import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from '@/routes/AppRoutes';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { AuthProvider } from '@/context/AuthContext';

export function App() {
  return (
    <AuthProvider>
      <Router>
        <DashboardLayout>
          <AppRoutes />
        </DashboardLayout>
      </Router>
    </AuthProvider>
  );
}