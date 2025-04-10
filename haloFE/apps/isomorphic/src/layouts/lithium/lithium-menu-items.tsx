import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';

export type SubMenuItemType = {
  name: string;
  href: string;
};

export type DropdownItemType = {
  name: string;
  icon: string;
  description?: string;
  href?: string;
  subMenuItems?: SubMenuItemType[];
};

export type LithiumMenuItem = {
  [key: string]: {
    name: string;
    type: string;
    dropdownItems: DropdownItemType[];
  };
};

export const lithiumMenuItems: LithiumMenuItem = {
  overview: {
    name: 'Overview',
    type: 'link',
    dropdownItems: [
      {
        name: 'File Manager',
        href: '/',
        icon: 'FilesIcon',
      },
      {
        name: 'Appointment',
        href: routes.appointment.dashboard,
        icon: 'ScheduleIcon',
      },
      {
        name: 'Executive',
        href: routes.executive.dashboard,
        icon: 'BusinessIcon',
      },
      {
        name: 'Store Analytics',
        href: routes.storeAnalytics.dashboard,
        icon: 'StoreAnalysisColoredIcon',
      },
      {
        name: 'Bidding',
        href: routes.bidding.dashboard,
        icon: 'BiddingIcon',
      },
      {
        name: 'Project',
        href: routes.project.dashboard,
        icon: 'ProjectDashIcon',
      },
      {
        name: 'Social Media',
        href: routes.socialMedia.dashboard,
        icon: 'SocialMediaDashIcon',
      },
      {
        name: 'Job Board',
        href: routes.jobBoard.dashboard,
        icon: 'SuitcaseIcon',
      },
      {
        name: 'Financial',
        href: routes.financial.dashboard,
        icon: 'FinancialStatisticsIcon',
      },
      {
        name: 'CRM',
        href: routes.crm.dashboard,
        icon: 'CrmDashTwoIcon',
      },
      {
        name: 'Affiliate',
        href: routes.affiliate.dashboard,
        icon: 'AffiliateColoredIcon',
      },
      {
        name: 'Logistics',
        href: routes.logistics.dashboard,
        icon: 'TruckIcon',
      },
      {
        name: 'E-Commerce',
        href: routes.eCommerce.dashboard,
        icon: 'ShopIcon',
      },
      {
        name: 'Analytics',
        href: routes.analytics,
        icon: 'AnalyticsCircularIcon',
      },
      {
        name: 'Support',
        href: routes.support.dashboard,
        icon: 'WalkmanIcon',
      },
      {
        name: 'Podcast',
        href: routes.podcast.dashboard,
        icon: 'PodcastIcon',
      },
    ],
  },
  appsKit: {
    name: 'Apps Kit',
    type: 'enhance',
    dropdownItems: [
      {
        name: 'E-Commerce',
        description: '"Shop Smart, Click Quick: Your One-Stop Solution!"',
        icon: 'ShoppingCartIcon',
        subMenuItems: [
          {
            name: 'Products',
            href: routes.eCommerce.products,
          },
          {
            name: 'Product Details',
            href: routes.eCommerce.productDetails(DUMMY_ID),
          },
          {
            name: 'Create Product',
            href: routes.eCommerce.createProduct,
          },
          {
            name: 'Edit Product',
            href: routes.eCommerce.ediProduct(DUMMY_ID),
          },
          {
            name: 'Categories',
            href: routes.eCommerce.categories,
          },
          {
            name: 'Create Category',
            href: routes.eCommerce.createCategory,
          },
          {
            name: 'Edit Category',
            href: routes.eCommerce.editCategory(DUMMY_ID),
          },
          {
            name: 'Orders',
            href: routes.eCommerce.orders,
          },
          {
            name: 'Order Details',
            href: routes.eCommerce.orderDetails(DUMMY_ID),
          },
          {
            name: 'Create Order',
            href: routes.eCommerce.createOrder,
          },
          {
            name: 'Edit Order',
            href: routes.eCommerce.editOrder(DUMMY_ID),
          },
          {
            name: 'Reviews',
            href: routes.eCommerce.reviews,
          },
          {
            name: 'Shop',
            href: routes.eCommerce.shop,
          },
          {
            name: 'Cart',
            href: routes.eCommerce.cart,
          },
          {
            name: 'Checkout & Payment',
            href: routes.eCommerce.checkout,
          },
        ],
      },
      {
        name: 'Support',
        description: '"Effortless Assistance at your Fingertips!"',
        icon: 'WalkmanWithExclamationIcon',
        subMenuItems: [
          {
            name: 'Inbox',
            href: routes.support.inbox,
          },
          {
            name: 'Snippets',
            href: routes.support.snippets,
          },
          {
            name: 'Templates',
            href: routes.support.templates,
          },
        ],
      },
      {
        name: 'Invoice',
        description: 'Professional-looking invoices for each customer order',
        icon: 'InvoiceIcon',
        subMenuItems: [
          {
            name: 'List',
            href: routes.invoice.home,
          },
          {
            name: 'Details',
            href: routes.invoice.details(DUMMY_ID),
          },
          {
            name: 'Create',
            href: routes.invoice.create,
          },
          {
            name: 'Edit',
            href: routes.invoice.edit(DUMMY_ID),
          },
          {
            name: 'Invoice Builder',
            href: routes.invoice.builder,
          },
        ],
      },
      {
        name: 'Logistics',
        description:
          '"Streamline Shipments: Discover Efficiency with our Logistics!"',
        icon: 'ShipIcon',
        subMenuItems: [
          {
            name: 'Shipment List',
            href: routes.logistics.shipmentList,
          },
          {
            name: 'Shipment Details',
            href: routes.logistics.shipmentDetails(DUMMY_ID),
          },
          {
            name: 'Create Shipment',
            href: routes.logistics.createShipment,
          },
          {
            name: 'Edit Shipment',
            href: routes.logistics.editShipment(DUMMY_ID),
          },
          {
            name: 'Customer Profile',
            href: routes.logistics.customerProfile,
          },
          {
            name: 'Tracking',
            href: routes.logistics.tracking(DUMMY_ID),
          },
        ],
      },
      {
        name: 'File Manager',
        description:
          '"Organize, Access, and Share: Simplify your Digital World with us!"',
        icon: 'FileSettingsIcon',
        subMenuItems: [
          {
            name: 'Files',
            href: routes.file.dashboard,
          },
          {
            name: 'Manage Files',
            href: routes.file.manager,
          },
        ],
      },
    ],
  },
  widgets: {
    name: 'Widgets',
    type: 'link',
    dropdownItems: [
      {
        name: 'Cards',
        href: routes.widgets.cards,
        icon: 'DicesIcon',
      },
      {
        name: 'Icons',
        href: routes.widgets.icons,
        icon: 'GreenLeafIcon',
      },
      {
        name: 'Charts',
        href: routes.widgets.charts,
        icon: 'PieChartCurrencyIcon',
      },
      {
        name: 'Maps',
        href: routes.widgets.maps,
        icon: 'MapMarkerWithPathIcon',
      },
      {
        name: 'Image Viewer',
        href: routes.imageViewer,
        icon: 'NftIcon',
      },
    ],
  },
  forms: {
    name: 'Forms',
    type: 'link',
    dropdownItems: [
      {
        name: 'Account Settings',
        href: routes.forms.profileSettings,
        icon: 'UserSettingsIcon',
      },
      {
        name: 'Notification Preference',
        href: routes.forms.notificationPreference,
        icon: 'NotificationSettingsIcon',
      },
      {
        name: 'Personal Information',
        href: routes.forms.personalInformation,
        icon: 'UserInfoIcon',
      },
      {
        name: 'Newsletter',
        href: routes.forms.newsletter,
        icon: 'NewsletterAnnouncement',
      },
      {
        name: 'Multi Step',
        href: routes.multiStep,
        icon: 'MultiStepArrowIcon',
      },
      {
        name: 'Multi Step 2',
        href: routes.multiStep2,
        icon: 'MultiStepArrowIcon',
      },
      {
        name: 'Payment Checkout',
        href: routes.eCommerce.checkout,
        icon: 'OnlinePaymentIcon',
      },
    ],
  },
  tables: {
    name: 'Tables',
    type: 'enhance',
    dropdownItems: [
      {
        name: 'RC Table',
        description: 'RC Table is a highly customizable table',
        icon: 'TableBasicIcon',
        subMenuItems: [
          {
            name: 'Basic',
            href: routes.tables.basic,
          },
          {
            name: 'Collapsible',
            href: routes.tables.collapsible,
          },
          {
            name: 'Enhanced',
            href: routes.tables.enhanced,
          },
          {
            name: 'Sticky Header',
            href: routes.tables.stickyHeader,
          },
          {
            name: 'Pagination',
            href: routes.tables.pagination,
          },
          {
            name: 'Search',
            href: routes.tables.search,
          },
          {
            name: 'Resizable',
            href: routes.tables.resizable,
          },
          {
            name: 'Pinning',
            href: routes.tables.pinning,
          },
          {
            name: 'Drag & Drop',
            href: routes.tables.dnd,
          },
        ],
      },
    ],
  },
  pages: {
    name: 'Pages',
    type: 'link',
    dropdownItems: [
      {
        name: 'Real Estate',
        icon: 'RealEstateIcon',
        href: routes.searchAndFilter.realEstate,
      },
      {
        name: 'Find Flight',
        icon: 'FlightIcon',
        href: routes.searchAndFilter.flight,
      },
      {
        name: 'Point of Sell',
        href: routes.pos.index,
        icon: 'PointOfSellIcon',
      },
      {
        name: 'NFT',
        icon: 'NftIcon',
        href: routes.searchAndFilter.nft,
      },
      {
        name: 'Event Calendar',
        href: routes.eventCalendar,
        icon: 'CalenderIcon',
      },
      {
        name: 'Roles & Permissions',
        href: routes.rolesPermissions,
        icon: 'FolderLockIcon',
      },
      {
        name: 'Profile',
        href: routes.profile,
        icon: 'UserAvatarIcon',
      },
      {
        name: 'Welcome',
        href: routes.welcome,
        icon: 'ShootingStarIcon',
      },
      {
        name: 'Coming Soon',
        href: routes.comingSoon,
        icon: 'RocketFlamingIcon',
      },
      {
        name: 'Access Denied',
        href: routes.accessDenied,
        icon: 'BadgeNotAllowedIcon',
      },
      {
        name: 'Not Found',
        href: routes.notFound,
        icon: 'MagnifyingWithCrossIcon',
      },
      {
        name: 'Maintenance',
        href: routes.maintenance,
        icon: 'SettingsWarningIcon',
      },
      {
        name: 'Job Feeds',
        href: routes.jobBoard.jobFeed,
        icon: 'ScheduleIcon',
      },
      {
        name: 'Blank',
        href: routes.blank,
        icon: 'PageBlankIcon',
      },
    ],
  },
  authentication: {
    name: 'Authentication',
    type: 'enhance',
    dropdownItems: [
      {
        name: 'Sign Up',
        icon: 'UserPlusIcon',
        description: '"Shop Smart, Click Quick: Your One-Stop Solution!"',
        subMenuItems: [
          {
            name: 'Modern Sign Up',
            href: routes.auth.signUp1,
          },
          {
            name: 'Vintage Sign Up',
            href: routes.auth.signUp2,
          },
          {
            name: 'Trendy Sign Up',
            href: routes.auth.signUp3,
          },
          {
            name: 'Elegant Sign Up',
            href: routes.auth.signUp4,
          },
          {
            name: 'Classic Sign Up',
            href: routes.auth.signUp5,
          },
        ],
      },
      {
        name: 'Sign In',
        icon: 'UserLockIcon',
        description: '"Effortless Assistance at your Fingertips!"',
        subMenuItems: [
          {
            name: 'Modern Sign In',
            href: routes.auth.signIn1,
          },
          {
            name: 'Vintage Sign In',
            href: routes.auth.signIn2,
          },
          {
            name: 'Trendy Sign In',
            href: routes.auth.signIn3,
          },
          {
            name: 'Elegant Sign In',
            href: routes.auth.signIn4,
          },
          {
            name: 'Classic Sign In',
            href: routes.auth.signIn5,
          },
        ],
      },
      {
        name: 'Forgot Password',
        icon: 'LockExclamationIcon',
        description:
          '"Streamline Shipments: Discover Efficiency with our Logistics!"',
        subMenuItems: [
          {
            name: 'Modern Forgot Password',
            href: routes.auth.forgotPassword1,
          },
          {
            name: 'Vintage Forgot Password',
            href: routes.auth.forgotPassword2,
          },
          {
            name: 'Trendy Forgot Password',
            href: routes.auth.forgotPassword3,
          },
          {
            name: 'Elegant Forgot Password',
            href: routes.auth.forgotPassword4,
          },
          {
            name: 'Classic Forgot Password',
            href: routes.auth.forgotPassword5,
          },
        ],
      },
      {
        name: 'OTP Pages',
        icon: 'LockWildCardIcon',
        description:
          '"Organize, Access, and Share: Simplify your Digital World with us!"',
        subMenuItems: [
          {
            name: 'Modern OTP Page',
            href: routes.auth.otp1,
          },
          {
            name: 'Vintage OTP Page',
            href: routes.auth.otp2,
          },
          {
            name: 'Trendy OTP Page',
            href: routes.auth.otp3,
          },
          {
            name: 'Elegant OTP Page',
            href: routes.auth.otp4,
          },
          {
            name: 'Classic OTP Page',
            href: routes.auth.otp5,
          },
        ],
      },
    ],
  },
};

export type LithiumMenuItemsKeys = keyof typeof lithiumMenuItems;
