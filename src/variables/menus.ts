type Menu = {
  label: string;
  icon?: string;
  name?: string;
  path?: string;
  children?: Menu[];
}

const menus: Menu[] = [
  {
    label: 'Dashboard',
    name : 'dashboard', 
    icon: 'solar:home-2-bold-duotone',
    path: '/dashboard'
  },
  {
    label: 'Checkin/Out',
    name: 'checkin',
    icon: 'solar:inbox-archive-bold-duotone',
    path: '/check-in'
  },
  {
    label: 'Kamar',
    name: 'room',
    icon: 'solar:bed-bold-duotone',
    children: [
      {
        label: 'Daftar Kamar',
        path: '/room'
      },
      {
        label: 'Tambah Kamar',
        path: '/room/create'
      }
    ]
  },
  {
    label: 'Transaksi',
    name: 'order',
    icon: 'solar:cart-3-bold-duotone',
    children: [
      {
        label: 'Transaksi',
        path: '/order/transaction'
      },
      {
        label: 'Laporan',
        path: '/order/report'
      }
    ]
  },
  {
    label: 'Komisi',
    name: 'comission',
    icon: 'solar:money-bag-bold-duotone',
    children: [
      {
        label: 'Afiliator',
        path: '/comission/afiliator'
      },
      {
        label: 'Platform',
        path: '/comission/vendor'
      },
    ]
  },
  {
    label: 'Penguna',
    name: 'user',
    icon: 'solar:users-group-rounded-bold-duotone',
    children: [
      {
        label: 'Admin',
        path: '/user/admin'
      },
      {
        label: 'Afiliator',
        path: '/user/afiliator'
      },
      {
        label: 'Pelanggan',
        path: '/user/customer'
      }
    ]
  },
  {
    label: 'Post',
    name: 'post',
    icon: 'solar:signpost-2-bold-duotone',
    children: [
      {
        label: 'Berita',
        path: '/post/info'
      },
      {
        label: 'Kategory',
        path: '/post/category'
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