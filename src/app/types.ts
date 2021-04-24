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
export interface IAuthValue {
  displayName: string;
  email: string;
  phoneNumber: null | string;
  photoURL: string;
  providerId: string;
  uid: string;
}

export interface IGoods {
  img: string;
  model: string;
  name: string;
  price: string;
  id?: string;
  amount: string;
}
