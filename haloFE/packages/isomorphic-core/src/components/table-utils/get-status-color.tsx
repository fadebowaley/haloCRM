export const shippingStatuses = {
  Approved: "Approved",
  InTransit: "In Transit",
  OutForDelivery: "Out For Delivery",
  Delivered: "Delivered",
  DeliveryFailed: "Delivery Failed",
};

export function getStatusColors(status: string) {
  if (shippingStatuses.Approved === status) {
    return "success";
  }
  if (shippingStatuses.InTransit === status) {
    return "secondary";
  }
  if (shippingStatuses.OutForDelivery === status) {
    return "info";
  }
  if (shippingStatuses.Delivered === status) {
    return "success";
  }
  if (shippingStatuses.DeliveryFailed === status) {
    return "danger";
  }
}
