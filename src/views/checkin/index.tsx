import Layout from "../../components/layout"
import Wrapper from "../../components/wrapper"
import Table from "./parts/table"

const CheckInPage = () => {
  return (
    <Layout>
      <Wrapper title="Check In" subtitle="Check In">
        <div className="bg-gray-800 h-10">

        </div>
        <Table/>
      </Wrapper>
    </Layout>
  )
}

export default CheckInPage