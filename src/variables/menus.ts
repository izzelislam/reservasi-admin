type Menu = {
  label: string;
  icon?: string;
  name?: string;
  path?: string;
  children?: Menu[];
  avaibility?: any
}

const menus: Menu[] = [
  {
    label: 'Dashboard',
    name : 'dashboard', 
    icon: 'solar:home-2-bold-duotone',
    path: '/dashboard',
    avaibility: ['admin', 'afiliator']
  },
  {
    label: 'Checkin/Out',
    name: 'checkin',
    icon: 'solar:inbox-archive-bold-duotone',
    path: '/check-in',
    avaibility: ['admin', 'afiliator']
  },
  {
    label: 'Kamar',
    name: 'room',
    icon: 'solar:bed-bold-duotone',
    avaibility: ['admin'],
    children: [
      {
        label: 'Daftar Kamar',
        path: '/room',
        avaibility: ['admin']
      },
      {
        label: 'Tambah Kamar',
        path: '/room/create',
        avaibility: ['admin']
      }
    ]
  },
  {
    label: 'Transaksi',
    name: 'order',
    icon: 'solar:cart-3-bold-duotone',
    avaibility: ['admin'],
    children: [
      {
        label: 'Transaksi',
        path: '/order/transaction',
        avaibility: ['admin']
      },
      {
        label: 'Laporan',
        path: '/order/report',
        avaibility: ['admin']
      }
    ]
  },
  {
    label: 'Komisi',
    name: 'comission',
    icon: 'solar:money-bag-bold-duotone',
    avaibility: ['admin', 'afiliator'],
    children: [
      {
        label: 'Afiliator',
        path: '/comission/afiliator',
        avaibility: ['admin', 'afiliator']
      },
      {
        label: 'Platform',
        path: '/comission/vendor',
        avaibility: ['admin']
      },
    ]
  },
  {
    label: 'Penguna',
    name: 'user',
    icon: 'solar:users-group-rounded-bold-duotone',
    avaibility: ['admin'],
    children: [
      {
        label: 'Admin',
        path: '/user/admin',
        avaibility: ['admin']
      },
      {
        label: 'Afiliator',
        path: '/user/afiliator',
        avaibility: ['admin']
      },
      {
        label: 'Pelanggan',
        path: '/user/customer',
        avaibility: ['admin']
      }
    ]
  },
  {
    label: 'Post',
    name: 'post',
    icon: 'solar:signpost-2-bold-duotone',
    avaibility: ['admin'],
    children: [
      {
        label: 'Berita',
        path: '/post/info',
        avaibility: ['admin']
      },
      {
        label: 'Kategory',
        path: '/post/category',
        avaibility: ['admin']
      }
    ]
  },
  // {
  //   label: 'Pengaturan',
  //   name: 'setting',
  //   icon: 'solar:settings-bold-duotone',
  //   children: [
  //     {
  //       label: 'Kontak',
  //       path: '/transaksi'
  //     },
  //     {
  //       label: 'Sosial',
  //       path: '/transaksi-add'
  //     }
  //   ]
  // }
];

export default menus;