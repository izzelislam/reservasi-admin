import Layout from "../../components/layout"
import Wrapper from "../../components/wrapper"
import { useAuthStore } from "../../store/use-auth-store"

const DashboardPage = () => {

  const {user} = useAuthStore()


  return (
    <Layout>
      <Wrapper title="Dashboard" subtitle="ringkasan performa">
        <div>
          <div>
            <p className="text">Selamat Datang <span className="font-semibold">{user?.name} !</span></p>
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default DashboardPage