const users = [
  {
    id: '0',
    name: 'Admin Toyland',
    email: 'admin@toyland.com',
    password: 'admin123',
    isAdmin: true,
    orders: [],
  },
  {
    id: '1',
    name: 'Jovana Đurić',
    email: 'jovana@toyland.com',
    password: '123456',
    orders: [
      {
        id: '1',
        status: 'Isporučeno',
        totalPrice: 44.49,
        items: ['Plišani medo', 'Puzzle životinje'],
      },
      {
        id: '2',
        status: 'U obradi',
        totalPrice: 28.5,
        items: ['Muzički ksilofon'],
      },
    ],
  },
  {
    id: '2',
    name: 'Marko Petrović',
    email: 'marko@toyland.com',
    password: 'lozinka',
    orders: [
      {
        id: '3',
        status: 'Isporučeno',
        totalPrice: 41.98,
        items: ['Set za crtanje', 'Lopta duginih boja', 'Plastelin za djecu'],
      },
    ],
  },
];

export default users;
