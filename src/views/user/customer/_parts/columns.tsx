import { createColumnHelper } from "@tanstack/react-table"
import { Icon } from "@iconify/react/dist/iconify.js"
import { Link } from "react-router-dom"
import DeleteButton from "../../../../components/delete-button"
import { stringToDate } from "../../../../lib/date_formater"

export const columnHelper = createColumnHelper<any>()

export const CustomerColumns = [
  columnHelper.display({
    id: 'select',
    header: '',
    enableSorting: false,
    cell: () => <input type="checkbox" className="checkbox" />
  }),
  columnHelper.accessor('name', {
    header: 'Nama',
    cell: info => <div className="text-gray-600">{info.getValue()}</div>
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: info => <div className="text-gray-600">{info.getValue()}</div>
  }),
  columnHelper.accessor('phone', {
    header: 'Nomor Telepon',
    enableSorting: true,
    cell: info => <div className=" text-gray-600">{info.getValue()}</div>
  }),
  columnHelper.accessor('created_at', {
    header: 'Tnaggal Bergabung',
    enableSorting: true,
    cell: info => <div className=" text-gray-600">{stringToDate(info.getValue())}</div>
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
          
          <Link to={`/user/customer/create/${info.row.original.id}`} className="flex items-center gap-2 cursor-pointer pb-2 border-b border-gray-200">
            <Icon icon="solar:pen-new-square-bold-duotone" className='text-lg text-sky-500' />
            <span className="text-gray-500 font-semibold">Edit</span>
          </Link>

          <DeleteButton id={info.row.original.id} />

        </div>
      </div> 
    </div>
  })
]