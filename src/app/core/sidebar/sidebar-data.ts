import {
  faBell,
  faBusAlt,
  faCogs,
  faCubes,
  faGift,
  faGifts,
  faGlobe,
  faHouse,
  faShoppingCart,
  faUserCog,
  faUserEdit,
  faUserGroup,
  faUsers,
  faWallet
} from '@fortawesome/free-solid-svg-icons'
import {faAccusoft} from "@fortawesome/free-brands-svg-icons";

export const SidebarMenu: any = [
  {
    title: 'General', data: [
      {name: 'Dashboard', link: '/dashboard', icon: faHouse},
      {name: 'Vouchers', link: '/vouchers', icon: faGift},
      {name: 'Delivery Methods', link: '/delivery-methods', icon: faBusAlt}
    ]
  },
  {
    title: 'Management', data: [
      {name: 'Roles', link: '/roles', icon: faUserCog},
      {name: 'Groups', link: '/groups', icon: faUserGroup},
      {name: 'Users', link: '/users', icon: faUsers}
    ]
  },
  {
    title: 'Items', data: [
      {name: 'Brands', link: '/brands', icon: faAccusoft},
      {name: 'Categories', link: '/categories', icon: faCubes},
      {name: 'Products', link: '/products', icon: faGifts},
      {name: 'Promotions', link: '/promotions', icon: faGlobe},
    ]
  },
  {
    title: 'Actions', data: [
      {name: 'Orders', link: '/orders', icon: faShoppingCart},
      {name: 'Payments', link: '/payments', icon: faWallet},
      {name: 'Notifications', link: '#', icon: faBell},
    ]
  },
  {
    title: 'Settings', data: [
      {name: 'Account', link: '/account', icon: faUserEdit},
      {name: 'Site Settings', link: '/settings', icon: faCogs},
    ]
  }
]
