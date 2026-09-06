export interface Order {
  id: string;
  title: string;
  description: string;
  price: number;
  deadLine: string;
  memberId: string;
  clientId: string;
}

export type OrderProp = {
  order: Order;
};

export type OrdersProp = {
  orders: Order[];
};
