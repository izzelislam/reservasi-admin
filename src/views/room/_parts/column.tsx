import { createColumnHelper } from "@tanstack/react-table"
import { Icon } from "@iconify/react/dist/iconify.js"
import { RoomType } from "../../../types/room-type"
import NumberToIdr from "../../../lib/idr-formated"
import { Link } from "react-router-dom"
import DeleteButton from "../../../components/delete-button"

export const columnHelper = createColumnHelper<RoomType>()

const limitString = (str: string, maxLength: number) => {
  return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
};

export const RoomColumns = [
  columnHelper.display({
    id: 'select',
    header: '',
    enableSorting: false,
    cell: () => <input type="checkbox" className="checkbox" />
  }),
  columnHelper.accessor('name', {
    header: 'Nama Kamar',
    cell: info => <div className="text-gray-600">{limitString(info.getValue(), 20)}</div>
  }),
  columnHelper.accessor('capacity', {
    header: 'Kapasitas',
    cell: info => <div className="text-gray-600">{info.getValue()}</div>
  }),
  columnHelper.accessor('price', {
    header: 'harga @malam',
    enableSorting: true,
    cell: info => <div className=" text-gray-600 font-semibold">{NumberToIdr(info.getValue())}</div>
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => {
      if (info.getValue() === 'available') {
        return (
          <div className="text-green-500 font-bold flex items-center gap-1">
            <Icon icon="solar:verified-check-bold-duotone" className='text-2xl mr-1' />
            <span>Tersedia</span>
          </div>
        )
      } else {
        return (
          <div className="text-red-500 font-bold">
            <span>Unavailable</span>
          </div>
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
      <div className="dropdown dropdown-bottom">
        <Icon role="button" tabIndex={0} icon="solar:menu-dots-bold-duotone" className='text-lg rotate-90' />
        <div tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 py-4 shadow">
          
          <Link to={`/room/create/${info.row.original.id}`} className="flex items-center gap-2 cursor-pointer pb-2 border-b border-gray-200">
            <Icon icon="solar:pen-new-square-bold-duotone" className='text-lg text-sky-500' />
            <span className="text-gray-500 font-semibold">Edit</span>
          </Link>

          <DeleteButton id={info.row.original.id} />

        </div>
      </div> 
    </div>
  })
]