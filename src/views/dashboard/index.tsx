import Layout from "../../components/layout"
import Wrapper from "../../components/wrapper"
import { useAuthStore } from "../../store/use-auth-store"
import AdminSection from "./_parts/admin"
import AfiliatorSection from "./_parts/afiliator"

const DashboardPage = () => {

  const {user, role} = useAuthStore()

  return (
    <Layout>
      <Wrapper title="Dashboard" subtitle="ringkasan performa">
          <p className="text">Selamat Datang <span className="font-semibold">{user?.name} !</span></p>
      </Wrapper>
      {
        role === 'admin' ? <AdminSection /> : <AfiliatorSection />
      }
    </Layout>
  )
}

export default DashboardPage