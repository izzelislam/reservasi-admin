import Layout from "../components/layout"
import Wrapper from "../components/wrapper"

const DashboardPage = () => {
  return (
    <Layout>
      <Wrapper title="Dashboard" subtitle="ringkasan performa">
        <div className="card card-compact bg-base-100 w-96 shadow-xl">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default DashboardPage