export interface DeliverySettings {
  baseRate: number;
  perKmRate: number;
  minimumOrder: number;
  waitingTimeRate: number; // per minute
  rushHourMultiplier: number;
  maxDeliveryRadius: number; // in kilometers
  rushHours: {
    start: string;
    end: string;
  }[];
}

export interface NotificationSettings {
  enablePush: boolean;
  enableEmail: boolean;
  enableSMS: boolean;
  events: {
    orderCreated: boolean;
    orderAccepted: boolean;
    orderPickedUp: boolean;
    orderDelivered: boolean;
    orderCancelled: boolean;
    driverAssigned: boolean;
  };
}