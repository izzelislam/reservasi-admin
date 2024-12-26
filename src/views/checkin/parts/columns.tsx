import { createColumnHelper } from "@tanstack/react-table"
import { Icon } from "@iconify/react/dist/iconify.js"
import { stringToDate, timeFormater } from "../../../lib/date_formater"
import CheckOutButton from "../../../components/checkout-button"

export const columnHelper = createColumnHelper<any>()

const limitString = (str: string, maxLength: number) => {
  return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
};

export const activityColumns = [
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
        <div className="font-semibold text-sm">{info.row.original.order.user.name}</div>
        <div className="text-sm text-gray-600">{info.row.original.order.user.phone}</div>
      </div>
    )
  }),
  columnHelper.accessor('order.room.name', {
    header: 'Kamar',
    cell: info => <div className="text-gray-600 text-wrap display-linebreak">{limitString(info.getValue(), 40)}</div>
  }),
  columnHelper.accessor('order.trx', {
    header: 'Kode',
    cell: info => <div className="text-gray-600">{info.getValue()}</div>
  }),

  columnHelper.accessor('check_in_at', {
    header: 'Checkin',
    cell: info => (
      <div className="">
        <div className="text-gray-600 text-2xl flex items-center">
          <Icon icon="solar:inbox-in-bold-duotone" className="text-green-500"/>
          <p>
            {timeFormater(info.getValue())}
          </p>
        </div>
        <div className="text-green-600 text-sm font-semibold">{stringToDate(info.getValue())}</div>
      </div>
    )
  }),

  columnHelper.accessor('check_out_at', {
    header: 'CheckOut',
    cell: info => {
      if (info.getValue() === null) {
        return (
          <div className="">
            <div className="text-gray-600 text-2xl flex items-center gap-2">
              <Icon icon="solar:inbox-out-bold-duotone" className="text-red-500"/>
              <p className="text-sm text-red-500">
                <i>belum checkout...</i>
              </p>
            </div>
          </div>
        )
      } else {
        return (
          <div className="">
            <div className="text-gray-600 text-2xl flex items-center">
              <Icon icon="solar:inbox-out-bold-duotone" className="text-red-500"/>
              <p>
                {timeFormater(info.getValue())}
              </p>
            </div>
            <div className="text-red-500 text-sm font-semibold">{stringToDate(info.getValue())}</div>
          </div>
        )
      }
    }
  }),

  columnHelper.accessor('order.total_day', {
    header: 'Hari',
    cell: info => <div className="text-gray-600 ">{info.getValue()} Hari</div>
  }),


  // columnHelper.accessor('end_booking', {
  //   header: 'Checkout',
  //   cell: info => <div className="text-gray-600">{stringToDate(info.getValue())}</div>
  // }),
  
  columnHelper.display({
    id: 'action',
    header: 'Action',
    enableSorting: false,
    cell: (info) => 
    <div className='flex items-center gap-2'>
      <div className="dropdown dropdown-bottom dropdown-start lg:dropdown-end md:dropdown-end">
        <Icon role="button" tabIndex={0} icon="solar:menu-dots-bold-duotone" className='text-lg rotate-90' />
        <div tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 py-4 shadow">
          
          <CheckOutButton id={info.row.original.order.id} />

        </div>
      </div> 
    </div>
  })
]