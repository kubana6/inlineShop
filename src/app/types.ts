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
  name: string;
  amount: string;
  totalOrder: string;
  price: string;
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
  productId: string;
  main_memory: string;
  camera: string[];
  flash_memory: string;
  img: string;
  model: string;
  name: string;
  operating_system: string;
  operating_system_version: string;
  screen_resolution: string;
  screen_size: string;
  type: string;
}
export interface IProducts {
  img: string;
  name: string;
  model: string;
  id: string;
  price: string;
  characteristic: string;
}
