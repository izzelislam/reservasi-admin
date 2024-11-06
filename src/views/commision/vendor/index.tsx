import { useEffect, useState } from "react"
import Layout from "../../../components/layout"
import Wrapper from "../../../components/wrapper"
import DataTable from "../../../components/data-table"
import "react-datepicker/dist/react-datepicker.css";
import { comissionColumns } from "./_parts/columns"
import { useCommisionStore } from "../../../store/use-commision-store"
import NumberToIdr from "../../../lib/idr-formated";
import CustomSelect from "../../../components/custom-select";
import { Months } from "../../../constant/values";


const CommisionVendorPage = () => {

  const {loading, total, attributes, commisions, paidCommisionVendor, getCommisionVendor, getPaidCommision} = useCommisionStore()
  const [year, setYear] = useState<any>(new Date().getFullYear())
  const [month, setMonth] = useState<any>(new Date().getMonth() + 1)

  const init = async () => {
    await getCommisionVendor()
    await getPaidCommision()
  }

  const withDateOrMonth = async () => {
    if (month && year){
      await getPaidCommision(month, year)
      await getCommisionVendor(month, year)
    }
  }

  useEffect(() => {
    withDateOrMonth()
  }, [month, year])

  useEffect(() => {
    init()
  }, [])


  const GenerateYear = () => {
    let year = new Date().getFullYear()
    let years = []
    for (let i = 0; i < 5; i++) {
      years.push({id: year.toString(), name: year.toString()})
      year--
    }
    return years
  }



  return (
    <Layout>
      <Wrapper title="Komisi Platform" subtitle="data komisi platform">
        <div>
          <DataTable
            data={commisions} 
            columns={comissionColumns}
            attributes={attributes}
            loading={loading}
            fn={getCommisionVendor}
          >
            <div className="flex flex-wrap gap-4 items-start">

              <CustomSelect
                placeholder="Pilih Bulan"
                value={month}
                options={Months}
                onChange={(e) => setMonth(e.target.value)}
              />

              <CustomSelect
                placeholder="Pilih Tahun"
                value={year}
                options={GenerateYear()}
                onChange={(e) => setYear(e.target.value)}
              />

              {
                paidCommisionVendor ? (
                  <div className="flex flex-wrap gap-4">
                    <p className="font-semibold">Total Yang Harus Dibayarkan bulan {month}, {year} : <p className="text-2xl">{NumberToIdr(total as number) ?? 0}</p></p>
                    <div>
                      <div className="bg-lime-500 text-white px-2 py-1 text-sm rounded-lg">Sudah dibayarkan</div>
                    </div>
                  </div>
                ): (
                  <div className="flex flex-wrap gap-4">
                    <p className="font-semibold">Total Yang Harus Dibayarkan bulan {month}, {year} : <p className="text-2xl">{NumberToIdr(total as number) ?? 0}</p></p>
                    <div>
                      <div className="bg-red-500 text-white px-2 py-1 text-sm rounded-lg">Belum dibayarkan</div>
                    </div>
                  </div>
                )
              }
            </div>
          </DataTable>
        </div>
      </Wrapper>
      
      {/* <Modal visible={isOpen && mode== 'paid'} onClose={handleClose}>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className='text-xl font-bold text-center'>Pembayaran Komisi</h2>
          
            <CustomInput 
              type="number"
              placeholder="Jumlah"
              name="amount"
              label="Jumlah"
              register={register}
              error={errors.amount?.message}
            />

            <div className="flex justify-center gap-2">
              <div>
                <Button type="button" bg="bg-gray-600" onClick={handleClose} title='Batal' icon='solar:close-square-bold-duotone' />
              </div>
              <div>
                <Button bg='bg-sky-700' loading={loading} disabled={loading} type="submit" title='Bayarkan' icon='solar:leaf-bold-duotone' />
              </div>
            </div>
          </form>
        </div>
      </Modal> */}


    </Layout>
  )
}

export default CommisionVendorPage