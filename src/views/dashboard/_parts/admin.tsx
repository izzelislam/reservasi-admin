import { useEffect, useState } from "react"
import Wrapper from "../../../components/wrapper"
import api from "../../../lib/api"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import Chart from "react-apexcharts";

const AdminSection = () => {

  const [data, setData] = useState<any>({})
  const [ch, setCh] = useState<any>({
    options: {
      bar: {
        horizontal: false,
        with: '10%'
      },
      chart: {
        id: "basic-bar",
        type: "bar",
        columnWidth: '10%',
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      },
      responsive: [
        {
          breakpoint: 768, // Contoh untuk layar kecil
          options: {
            chart: {
              width: "100%",
            },
          },
        },
      ],
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }
    ]
  }
)

  useEffect(() => {
    handleGetDashboard()
  }, [])

  const handleGetDashboard = async () => {
    try {
      const res = await api.get('/admin/dashboard-admin')
      setCh((prev:any) => {
        var d = Object.values(res?.data?.statistik)
        return {
          ...prev,
          series: [
            {
              name: "Jumlah Reservasi",
              data: d
            }
          ]
      }
      })
      console.log(res)
      setData(res.data)
    } catch (error) {
      toast.error('Gagal mengambil data')
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Wrapper>
            <p className="text">Kamar Terbooking</p>
            <h4 className="font-semibold mt-1">{data?.bboke_rrom} kamar</h4>
        </Wrapper>
        <Wrapper>
            <p className="text">Pembayaran Belum Di Konfirm</p>
            <div className="flex justify-between items-center">
            <h4 className="font-semibold mt-1">{data?.pending_order} pembayaran</h4>
            <Link to="/order/transaction" className="btn btn-xs btn-primary">Selengkapnya</Link>
            </div>
        </Wrapper>
        <Wrapper>
            <p className="text">Kamar Terisi</p>
            <h4 className="font-semibold mt-1">
              {data?.checked_in} Kamar
            </h4>
        </Wrapper>
        <Wrapper>
            <p className="text">Jumlah Mitra</p>
            <h4 className="font-semibold mt-1">{data?.mitra} Mitra</h4>
        </Wrapper>
      </div>

      <div className="w-full">
        <Wrapper>
          <Chart
            options={ch.options}
            series={ch.series}
            type="bar"
            width="100%"
            height={400}
          />
        </Wrapper>
      </div>
    </div>
  )
}

export default AdminSection