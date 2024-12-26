import { toast } from 'react-toastify'
import Wrapper from '../../../components/wrapper'
import api from '../../../lib/api'
import { useEffect, useState } from 'react'
import NumberToIdr from '../../../lib/idr-formated'

const AfiliatorSection = () => {

  const [data, setData] = useState<any>({})

  useEffect(() => {
    handleGetDashboard()
  }, [])

  const handleGetDashboard = async () => {
    try {
      const res = await api.get('/admin/dashboard-afiliator')
      setData(res.data)
    } catch (error) {
      toast.error('Gagal mengambil data')
    }
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Wrapper>
            <p className="text">Total Pendapatan</p>
            <h4 className="font-semibold mt-1">{NumberToIdr(parseInt(data?.commisions_sum_amount))}</h4>
        </Wrapper>
        <Wrapper>
            <p className="text">Pendapatan Terbayar</p>
            <h4 className="font-semibold mt-1">{NumberToIdr(parseInt(data?.commision_payment_sum_amount))}</h4>
        </Wrapper>
        <Wrapper>
            <p className="text">Pendapatan Belum Terbayar</p>
            <h4 className="font-semibold mt-1">{NumberToIdr(parseInt(data?.commisions_sum_amount) - parseInt(data?.commision_payment_sum_amount))}</h4>
        </Wrapper>
      </div>
    </div>
  )
}

export default AfiliatorSection