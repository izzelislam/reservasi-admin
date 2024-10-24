import { Route, Routes } from "react-router-dom";
import DashboardPage from '../views/dashboard';


const RouteApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
    </Routes>
  )
}

function AppRoutes() {
  return (
    <RouteApp />
  )
}

export default AppRoutes