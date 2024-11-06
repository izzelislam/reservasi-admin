import { createColumnHelper } from "@tanstack/react-table"
import { stringToDate } from "../../../../lib/date_formater"
import NumberToIdr from "../../../../lib/idr-formated"

export const columnHelper = createColumnHelper<any>()

export const orderColumns = [
  columnHelper.display({
    id: 'select',
    header: '',
    enableSorting: false,
    cell: () => <input type="checkbox" className="checkbox" />
  }),
  columnHelper.display({
    id: 'pelanggan',
    header: 'Pelanggan',
    cell: info => (
      <div>
        <div className="font-semibold text-sm">{info.row.original.user.name}</div>
        <div className="text-sm text-gray-600">{info.row.original.user.email}</div>
        <div className="text-sm text-gray-600">{info.row.original.user.phone}</div>
      </div>
    )
  }),
  columnHelper.accessor('total_price', {
    header: 'Total Harga',
    cell: info => <div className="text-gray-600 font-semibold">{NumberToIdr(info.getValue())}</div>
  }),

  columnHelper.accessor('total_day', {
    header: 'Hari',
    cell: info => <div className="text-gray-600 ">{info.getValue()} Hari</div>
  }),
  
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => {
      const status = info.getValue()

      if (status == 'pending'){
        return (
          <div className="text-yellow-500 font-semibold">Pending</div>
        )
      }

      if (status == 'booked'){
        return (
          <div className="text-green-500 font-semibold">Dibooking</div>
        )
      }

      if (status == 'finished'){
        return (
          <div className="text-blue-500 font-semibold">Selesai</div>
        )
      }

      if (status == 'canceled'){
        return (
          <div className="text-red-500 font-semibold">Dibatalkan</div>
        )
      }
    }
  }),
  columnHelper.accessor('order_date', {
    header: 'Tanggal Transaksi',
    cell: info => <div className="text-gray-600">{stringToDate(info.getValue())}</div>
  }),

]