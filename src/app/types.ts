export interface IUser {
  address: [];
  cart: ICart[];
  uid: string;
  id: string;
  email: string;
  photo: string;
  orders: IOrders[];

}

export interface ICart {
  id: string;
  amount: string;
}

export interface IOrders {
  id: string;
  date: string;
}
