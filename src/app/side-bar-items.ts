export interface SideBarItem {
  level: number;
  title: string;
  icon?: string;
  path?: string;
  items?: Array<SideBarItem>;
  open: boolean;
  selected: boolean;
}

const sideBarItems: SideBarItem[] = [
  {
    level: 1,
    title: 'Dashboard',
    icon: 'dashboard',
    path: '/home',
    open: false,
    selected: false,
  },
  {
    level: 1,
    title: 'Docs',
    icon: 'folder',
    open: false,
    selected: false,
    items: [
      {
        level: 2,
        title: 'Form',
        icon: 'form',
        path: '/form',
        open: false,
        selected: false,
      },
      {
        level: 2,
        title: 'PDFs',
        icon: 'file-pdf',
        open: false,
        selected: false,
        items: [
          {
            level: 3,
            title: 'Invoices',
            path: '/',
            open: false,
            selected: false,
          },
        ],
      },
      {
        level: 2,
        title: 'Spreadsheets',
        icon: 'borderless-table',
        open: false,
        selected: false,
      },
    ],
  },
  {
    level: 1,
    title: 'Graphs',
    icon: 'line-chart',
    open: false,
    selected: false,
    items: [
      {
        level: 2,
        title: 'Bar',
        icon: 'bar-chart',
        path: '/',
        open: false,
        selected: false,
      },
    ],
  },
  {
    level: 1,
    title: 'Users',
    icon: 'team',
    path: '/users',
    open: false,
    selected: false,
  },
  {
    level: 1,
    title: 'About',
    icon: 'info-circle',
    path: '/about',
    open: false,
    selected: false,
  },
];

export default sideBarItems;
