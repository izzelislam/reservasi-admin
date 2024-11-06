import { createColumnHelper } from "@tanstack/react-table"
import NumberToIdr from "../../../../lib/idr-formated"

export const columnHelper = createColumnHelper<any>()

export const comissionColumns = [
  columnHelper.display({
    id: 'select',
    header: '',
    enableSorting: false,
    cell: () => <input type="checkbox" className="checkbox" />
  }),
  
  columnHelper.accessor('order.order_date', {
    header: 'Tanggal Transaksi',
    cell: info => <div className="text-gray-600">{info.getValue()}</div>
  }),

  columnHelper.accessor('order.trx', {
    header: 'Kode Booking',
    cell: info => <div className="text-gray-600 font-semibold">{info.getValue()}</div>
  }),

  columnHelper.accessor('amount', {
    header: 'Komisi',
    cell: info => <div className="text-gray-600">{NumberToIdr(info.getValue())}</div>
  }),
  columnHelper.accessor('order.room.name', {
    header: 'Kamar',
    cell: info => <div className="text-gray-600">{info.getValue()}</div>
  }),

]