import { Route, Routes } from "react-router-dom";
import DashboardPage from '../views/dashboard';
import LoginOnePage from "../views/login-one";
import LoginTwoPage from "../views/login-two";


const RouteApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/login-one" element={<LoginOnePage />} />
      <Route path="/login-two" element={<LoginTwoPage />} />
    </Routes>
  )
}

function AppRoutes() {
  return (
    <RouteApp />
  )
}

export default AppRoutes