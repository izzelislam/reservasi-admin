import Layout from '../../components/layout'
import Wrapper from '../../components/wrapper'
import users from '../../variables/users'
import { columns } from './column'
import DataTable from '../../components/data-table'

const index = () => {

  return (
    <Layout>
      <Wrapper title="Table" subtitle='data table'>
        <DataTable data={users} columns={columns} />
      </Wrapper>
    </Layout>
  )
}

export default index