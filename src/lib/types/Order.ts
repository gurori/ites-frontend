export interface Order {
  id: string;
  title: string;
  description: string;
  price: number;
  deadLine: string;
  memberId: string;
  clientId: string;
}

export type OrderProps = {
  order: Order;
};

export type OrdersProps = {
  orders: Order[];
};
