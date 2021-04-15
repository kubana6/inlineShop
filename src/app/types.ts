export interface IUser {
  address: [];
  cart: ICart[];
  uid: string;
  id: string;
  email:string;
  photo:string;

}

export interface ICart {
  id: string;
  amount: string;
}
