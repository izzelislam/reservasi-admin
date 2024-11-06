import { Route, Routes } from "react-router-dom";
import LoginTwoPage from "../views/login-two";
import TablePage from "../views/table";
import FormPage from "../views/form";
import CheckInPage from "../views/checkin";
import LoginPage from "../views/auth";
import DashboardPage from "../views/dashboard";
import RoomPage from "../views/room";
import RoomForm from "../views/room/form";
import AdminUserPage from "../views/user/admin";
import AdminFormPage from "../views/user/admin/form";
import AfiliatorUserPage from "../views/user/afiliator";
import AfiliatorFormPage from "../views/user/afiliator/form";
import CustomerUserPage from "../views/user/customer";
import CustomerFormPage from "../views/user/customer/form";
import CategoryPage from "../views/category";
import CategoryFormPage from "../views/category/form";
import InfoPage from "../views/info";
import InfoFormPage from "../views/info/form";
import OrderTrxPage from "../views/order/trx";
import OrderReportPage from "../views/order/report";
import CommisionPage from "../views/commision/afiliator";
import CommisionVendorPage from "../views/commision/vendor";



const RouteApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />

      <Route path="/room" element={<RoomPage />} />
      <Route path="/room/create" element={<RoomForm />} />
      <Route path="/room/create/:id" element={<RoomForm />} />
      
      <Route path="/user/admin" element={<AdminUserPage />} />
      <Route path="/user/admin/create" element={<AdminFormPage />} />
      <Route path="/user/admin/create/:id" element={<AdminFormPage />} />

      <Route path="/user/afiliator" element={<AfiliatorUserPage />} />
      <Route path="/user/afiliator/create" element={<AfiliatorFormPage />} />
      <Route path="/user/afiliator/create/:id" element={<AfiliatorFormPage />} />

      <Route path="/user/customer" element={<CustomerUserPage />} />
      <Route path="/user/customer/create" element={<CustomerFormPage />} />
      <Route path="/user/customer/create/:id" element={<CustomerFormPage />} />

      <Route path="/post/category" element={<CategoryPage />} />
      <Route path="/post/category/create" element={<CategoryFormPage />} />
      <Route path="/post/category/create/:id" element={<CategoryFormPage />} />

      <Route path="/post/info" element={<InfoPage />} />
      <Route path="/post/info/create" element={<InfoFormPage />} />
      <Route path="/post/info/create/:id" element={<InfoFormPage />} />
      
      <Route path="/order/transaction" element={<OrderTrxPage />} />
      <Route path="/order/report" element={<OrderReportPage />} />
     
      <Route path="/comission/afiliator" element={<CommisionPage />} />
      <Route path="/comission/vendor" element={<CommisionVendorPage />} />



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