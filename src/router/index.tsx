import { Route, Routes } from "react-router-dom";
import DashboardPage from '../views/dashboard';
import LoginOnePage from "../views/login-one";
import LoginTwoPage from "../views/login-two";
import TablePage from "../views/table";
import FormPage from "../views/form";
import CheckInPage from "../views/checkin";


const RouteApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/login-one" element={<LoginOnePage />} />
      <Route path="/login-two" element={<LoginTwoPage />} />
      <Route path="/table" element={<TablePage />} />
      <Route path="/form" element={<FormPage />} />
      <Route path="/check-in" element={<CheckInPage />} />
    </Routes>
  )
}

function AppRoutes() {
  return (
    <RouteApp />
  )
}

export default AppRoutes