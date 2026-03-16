import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CityGuidePage from './pages/CityGuidePage';
import CityDetailPage from './pages/CityDetailPage';
import RouteExplorerPage from './pages/RouteExplorerPage';
import CrossCountryPage from './pages/CrossCountryPage';
import TripPlannerPage from './pages/TripPlannerPage';
import GuidesPage from './pages/GuidesPage';
import DashboardPage from './pages/DashboardPage';
import TripDashboardPage from './pages/TripDashboardPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cities" element={<CityGuidePage />} />
        <Route path="/cities/:id" element={<CityDetailPage />} />
        <Route path="/routes" element={<RouteExplorerPage />} />
        <Route path="/cross-country" element={<CrossCountryPage />} />
        <Route path="/trip-planner" element={<TripPlannerPage />} />
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/:tripId" element={<TripDashboardPage />} />
      </Route>
    </Routes>
  );
}
