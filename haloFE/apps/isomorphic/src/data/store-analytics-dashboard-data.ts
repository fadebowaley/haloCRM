export const VISITOR_COLORS = {
  green: {
    default: '#34C759',
    light: '#34c7594d',
  },
  red: {
    default: '#E74C3C',
    light: '#e74c3c4d',
  },
  yellow: {
    default: '#EE6D3D',
    light: '#ee6c3d4d',
  },
  skyBlue: {
    default: '#29CCB1',
    light: '#29ccb14d',
  },
};

export type VisitorStatType = {
  title: string;
  value: string;
  color: keyof typeof VISITOR_COLORS;
  lastMonthValue: string;
  increasedOrDecreased: {
    state: boolean;
    value: number;
  };
};

export const visitorStatData: VisitorStatType[] = [
  {
    title: 'Total Sales',
    color: 'skyBlue',
    value: '$14.89M',
    lastMonthValue: '$12.89M',
    increasedOrDecreased: {
      state: true,
      value: 13.2,
    },
  },
  {
    title: 'Total Visitors',
    color: 'yellow',
    value: '$31.42M',
    lastMonthValue: '$12.89M',
    increasedOrDecreased: {
      state: false,
      value: 56.2,
    },
  },
  {
    title: 'Total Products',
    color: 'green',
    value: '$21.73M',
    lastMonthValue: '$12.89M',
    increasedOrDecreased: {
      state: true,
      value: 72.2,
    },
  },
  {
    title: 'Total Transaction',
    color: 'red',
    value: '$54.62M',
    lastMonthValue: '$12.89M',
    increasedOrDecreased: {
      state: false,
      value: 89.3,
    },
  },
];

export type ReportAnalyticsProductItemKey =
  | 'dribbble'
  | 'snapchat'
  | 'figma'
  | 'playstore'
  | 'ripple';

export type ReportAnalyticsProduct = {
  id: number;
  product: {
    key: ReportAnalyticsProductItemKey;
    title: string;
  };
  soldAmount: number;
  unitPrice: number;
  revenue: number;
  rating: {
    type: string;
    values: number[];
  };
};

export const reportAnalyticsData: ReportAnalyticsProduct[] = [
  {
    id: 1,
    product: {
      key: 'dribbble',
      title: 'Product 1',
    },
    soldAmount: 100,
    unitPrice: 10,
    revenue: 1000,
    rating: {
      type: 'Perfect',
      values: [4, 5, 3, 4],
    },
  },
  {
    id: 2,
    product: {
      key: 'snapchat',
      title: 'Product 2',
    },
    soldAmount: 200,
    unitPrice: 20,
    revenue: 2000,
    rating: {
      type: 'Very Good',
      values: [4, 5, 4, 5, 5],
    },
  },
  {
    id: 3,
    product: {
      key: 'figma',
      title: 'Product 2',
    },
    soldAmount: 200,
    unitPrice: 20,
    revenue: 2000,
    rating: {
      type: 'Very Good',
      values: [4, 5, 4, 5, 5],
    },
  },
  {
    id: 4,
    product: {
      key: 'ripple',
      title: 'Product 2',
    },
    soldAmount: 200,
    unitPrice: 20,
    revenue: 2000,
    rating: {
      type: 'Good',
      values: [3, 4, 2, 2],
    },
  },
  {
    id: 5,
    product: {
      key: 'playstore',
      title: 'Product 2',
    },
    soldAmount: 200,
    unitPrice: 20,
    revenue: 2000,
    rating: {
      type: 'Good',
      values: [3, 4, 2, 2],
    },
  },
];
