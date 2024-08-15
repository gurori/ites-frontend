export interface IOrder {
    id: string;
    title: string;
    description: string;
    price: number;
    deadLine: string;
    memberId: string;
    clientId: string;
}

export type OrderProp = {
    order: IOrder
}

export type OrdersProp = {
    orders: IOrder[]
}