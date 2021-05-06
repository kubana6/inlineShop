export interface IUser {
  address: [];
  cart: ICart[];
  uid: string;
  id: string;
  email: string;
  photo: string;
  orders: IOrders[];
  account_created: string;
  balance: string;
  name: string;
}

export interface ICart {
  id: string;
  name: string;
  amount: string;
  totalOrder: string;
  price: string;
  img: string;
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

export interface ICharacteristic {
  productId?: string;
  main_memory: string;
  camera: string[];
  flash_memory: string;
  img?: string;
  model: string;
  name: string;
  operating_system: string;
  operating_system_version: string;
  screen_resolution: string;
  screen_size: string;
  type: string;
  feedback: IFeedBack;
}

export interface IProducts {
  img: string;
  name: string;
  model: string;
  id: string;
  price: string;
  characteristic: string;
}

export interface IDetailsOrders {
  apartment: string;
  city: string;
  corps: string;
  date: string;
  email: string;
  entrance: string;
  floor: string;
  fullName: string;
  house: string;
  order: ICart[];
  phone: string;
  street: string;
  userId: string;
  img: string;
}

export interface IFeedBack {
  count: number;
  customers_feedback: ICustomersFeedback[];
  rating: number;
  sum: number;
}

export interface ICustomersFeedback {
  date: string;
  id: string;
  name: string;
  photo: string;
  rating: number;
  text: string;
}
