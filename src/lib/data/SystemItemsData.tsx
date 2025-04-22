import AddBank from '../../components/common/banks/bankTypes/AddBank';

const systemItems = [
  {
    id: 1,
    title: 'structure',
    items: [
      {
        id: 1,
        title: 'structure',
        add: false,
        view: '/system/company-profile'
      },
      {
        id: 2,
        title: 'employees',
        add: '',
        view: '/system/employees'
      },
      {
        id: 3,
        title: 'branches',
        add: '',
        view: '/system/branches'
      }
    ]
  },
  {
    id: 2,
    title: 'bank',
    items: [
      {
        id: 1,
        title: 'banks',
        add: <AddBank />,
        view: '/system/banks'
      },
      {
        id: 2,
        title: 'accounts',
        add: '',
        view: '/system/bank-accounts'
      },
      {
        id: 3,
        title: 'types',
        add: '',
        view: '/system/bank-card-types'
      },
      {
        id: 4,
        title: 'cards',
        add: '',
        view: '/system/bank-cards'
      }
    ]
  },
  {
    id: 3,
    title: 'sales',
    items: [
      {
        id: 1,
        title: 'tax',
        add: true,
        view: '/system/tax-policy'
      },
      {
        id: 2,
        title: 'zakat',
        add: '/system/zakat-income/add',
        view: '/system/zakat-income'
      }
    ]
  },
  {
    id: 4,
    title: 'branchesManagement',
    items: [
      {
        id: 1,
        title: 'invoice',
        add: false,
        view: '/system/invoice-data'
      },
      {
        id: 2,
        title: 'decimal',
        add: true,
        view: '/system/decimal-number'
      },
      {
        id: 3,
        title: 'congratulatory',
        add: true,
        view: '/system/congratulatory'
      }
    ]
  },
  {
    id: 5,
    title: 'categories',
    items: [
      {
        id: 1,
        title: 'products',
        add: true,
        view: '/system/products'
      }
    ]
  }
];

export default systemItems;
