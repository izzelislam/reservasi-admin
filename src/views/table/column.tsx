import { createColumnHelper } from "@tanstack/react-table"
import { UserType } from "../../variables/users"
import { Icon } from "@iconify/react/dist/iconify.js"

export const columnHelper = createColumnHelper<UserType>()

export const columns = [
  columnHelper.display({
    id: 'select',
    header: '',
    enableSorting: false,
    cell: () => <input type="checkbox" className="checkbox" />
  }),
  columnHelper.accessor('id', {
    header: 'ID',
    cell: info => <div className="text-gray-600">{info.getValue()}</div>
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    enableSorting: true,
    cell: info => <div className="lowercase text-gray-600">{info.getValue()}</div>
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: info => <div className="lowercase text-gray-600">{info.getValue()}</div>
  }),
  columnHelper.accessor('phone', {
    header: 'Phone',
    enableSorting: true,
    cell: info => <div className="lowercase text-gray-600">{info.getValue()}</div>
  }),
  columnHelper.display({
    id: 'action',
    header: 'Action',
    enableSorting: false,
    cell: () => 
    <div className='flex items-center gap-2'>
      <div className="dropdown dropdown-bottom a">
        <Icon role="button" tabIndex={0} icon="solar:menu-dots-bold-duotone" className='text-lg rotate-90' />
        <div tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 py-4 shadow">
          <div className="flex items-center gap-2 cursor-pointer pb-2 border-b border-gray-200">
            <Icon icon="solar:pen-new-square-bold-duotone" className='text-lg text-sky-500' />
            <span className="text-gray-500 font-semibold">Edit</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer pt-4">
            <Icon icon="solar:trash-bin-minimalistic-bold-duotone" className='text-xl text-red-500' />
            <span>Deltete</span>
          </div>
        </div>
      </div> 
    </div>
  })
]