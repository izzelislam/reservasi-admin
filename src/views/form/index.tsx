import CustomInput from "../../components/custom-input"
import CustomSelect from "../../components/custom-select";
import Layout from "../../components/layout"
import Wrapper from "../../components/wrapper"

const data = [
  {
    "id" : "active",
    "name" : "Active"
  },
  {
    "id" : "inactive",
    "name" : "Inactive"
  }
];

const index = () => {
  return (
    <Layout>
      <Wrapper title="Form" subtitle="input form">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <CustomInput type="text" placeholder="Username" label='Username'/>
            <CustomSelect label="Status" placeholder="Status" value="" onChange={() => {}} options={data} />
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default index