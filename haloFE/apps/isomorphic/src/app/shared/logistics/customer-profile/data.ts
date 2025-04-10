import { avatarIds } from '@core/utils/get-avatar';
import { getRandomArrayElement } from '@core/utils/get-random-array-element';
import CargoDamaged from '@core/components/icons/cargo-damaged';
import MagnifyingGlassIconColor from '@core/components/icons/magnifying-glass-color';
import TransactionIcon from '@core/components/icons/transactions';
import InvoicePrint from '@core/components/icons/invoice-print';
import RefundIcon from '@core/components/icons/refund';
import TurtleIcon from '@core/components/icons/turtle';
import ShipWithContainer from '@core/components/icons/ship-with-container';

export const customer = {
  avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
    avatarIds
  )}.png`,
  name: 'Irene Powlowski',
  email: 'johnson.olson@yahoo.com',
  phone: '(440) 701-6597',
  address: '49001 Mossie Row Berkshire',
  branch: 'Main-Branch',
};

export const stats = [
  {
    icon: TransactionIcon,
    label: 'Transactions',
    value: 2890,
    isCurrency: true,
  },
  { icon: InvoicePrint, label: 'Due', value: 2890, isCurrency: true },
  { icon: RefundIcon, label: 'Refund', value: 310, isCurrency: true },
  { icon: ShipWithContainer, label: 'Shipments', value: 120 },
  { icon: CargoDamaged, label: 'Damaged', value: 8 },
  { icon: TurtleIcon, label: 'Late Delivery', value: 34 },
  { icon: MagnifyingGlassIconColor, label: 'Lost Shipment', value: 2 },
];
