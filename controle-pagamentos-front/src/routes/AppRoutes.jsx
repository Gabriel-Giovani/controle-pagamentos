import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ClientsManagement from '../pages/ClientsManagement/ClientsManagements';
import Layout from '../components/Layout';
import PaymentsManagemnt from '../pages/PaymentsManagement/PaymentsManagement';

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route
                    element={<Layout />}
                >
                    <Route path="/" element={<Navigate to="/clientes" />} />
                    <Route path='/clientes' element={<ClientsManagement />} />
                    <Route path="pagamentos" element={<PaymentsManagemnt />} />
                </Route>
            </Routes>
        </Router>
    );
}