import { createColumnHelper } from "@tanstack/react-table"
import { Icon } from "@iconify/react/dist/iconify.js"
import { stringToDate } from "../../../../lib/date_formater"
import NumberToIdr from "../../../../lib/idr-formated"
import ConfirmButton from "../../../../components/confirm-button"
import CancelButton from "../../../../components/cancel-button"

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
  columnHelper.accessor('trx', {
    header: 'Kode Booking',
    cell: info => <div className="text-gray-600">{info.getValue()}</div>
  }),

  columnHelper.accessor('total_price', {
    header: 'Total Harga',
    cell: info => <div className="text-gray-600 font-semibold">{NumberToIdr(info.getValue())}</div>
  }),

  columnHelper.accessor('total_day', {
    header: 'Hari',
    cell: info => <div className="text-gray-600 ">{info.getValue()} Hari</div>
  }),

  columnHelper.accessor('start_booking', {
    header: 'Checkin/Out',
    cell: info => <div className="text-gray-600">{stringToDate(info.getValue())} - {stringToDate(info.row.original.end_booking)}</div>
  }),

  // columnHelper.accessor('end_booking', {
  //   header: 'Checkout',
  //   cell: info => <div className="text-gray-600">{stringToDate(info.getValue())}</div>
  // }),
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
  columnHelper.display({
    id: 'action',
    header: 'Action',
    enableSorting: false,
    cell: (info) => 
    <div className='flex items-center gap-2'>
      <div className="dropdown dropdown-bottom dropdown-start lg:dropdown-end md:dropdown-end">
        <Icon role="button" tabIndex={0} icon="solar:menu-dots-bold-duotone" className='text-lg rotate-90' />
        <div tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 py-4 shadow">
          
          <ConfirmButton id={info.row.original.id} />
          <CancelButton id={info.row.original.id} />

        </div>
      </div> 
    </div>
  })
]