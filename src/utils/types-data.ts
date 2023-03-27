export type TUser = {
  name: string
  email: string;
}

export type TIngredient = {
  carbohydrates: number;
  calories: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number,
  type: string;
  __v: number;
  _id: string;
  count: number;
  key: string;
}

export type TOrder = {
  name: string;
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}

export type TOrdersData = {
  orders: TOrder[];
  total: number;
  totalToday: number;
}
