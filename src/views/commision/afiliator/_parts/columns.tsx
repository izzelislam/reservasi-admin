import { createColumnHelper } from "@tanstack/react-table"
import { Icon } from "@iconify/react/dist/iconify.js"
import NumberToIdr from "../../../../lib/idr-formated"
import PaidButton from "../../../../components/paid-button"

export const columnHelper = createColumnHelper<any>()

export const comissionColumns = [
  columnHelper.display({
    id: 'select',
    header: '',
    enableSorting: false,
    cell: () => <input type="checkbox" className="checkbox" />
  }),
  columnHelper.accessor('name',{
    header: 'Afiliator',
    cell: info => (
      <div className="flex items-center gap-2">
        <img src={info.row.original.photo_url} alt="" className="w-14 h-14 rounded-full" />
        <div>
          <div className="font-semibold text-sm">{info.row.original.name}</div>
          <div className="text-sm text-gray-600">{info.row.original.email}</div>
          <div className="text-sm text-gray-600">{info.row.original.phone}</div>
        </div>
      </div>
    )
  }),
  columnHelper.accessor('afiliator_code', {
    header: 'Kode Afiliator',
    cell: info => <div className="text-gray-600">{info.getValue()}</div>
  }),

  columnHelper.accessor('commisions_sum_amount', {
    header: 'Total Komisi',
    cell: info => <div className="text-gray-600 font-semibold">{NumberToIdr(info.getValue())}</div>
  }),

  columnHelper.accessor('commision_payment_sum_amount', {
    header: 'Komisi terbayar',
    cell: info => <div className="text-gray-600 font-semibold">{NumberToIdr(info.getValue())}</div>
  }),

  columnHelper.display({
    id: 'commision_un_paid',
    header: 'Komisi Belum Terbayar',
    cell: info => <div className="text-gray-600 font-semibold">{NumberToIdr(info.row.original.commisions_sum_amount - info.row.original.commision_payment_sum_amount)}</div>
  }),

  columnHelper.display({
    id: 'action',
    header: 'Action',
    enableSorting: false,
    cell: (info) => 
    <div className='flex items-center gap-2'>
      <div className="dropdown dropdown-bottom a">
        <Icon role="button" tabIndex={0} icon="solar:menu-dots-bold-duotone" className='text-lg rotate-90' />
        <div tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 py-4 shadow">
          <PaidButton id={info.row.original.id} />
        </div>
      </div> 
    </div>
  })
]