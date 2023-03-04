// CSS types

export const h1_type = 'text text_type_main-large';
export const h3_type = 'text text_type_main-medium';

export const letters = 'text text_type_main-default';
export const letters_grey = `${letters} text_color_inactive`;

export const digits = 'text text_type_digits-default';
export const digits_grey = `${digits} text_color_inactive`;

// data types

export type TUser = {
  name: string
  email: string;
}

export type TTypeIngredient = 'blank' | 'bun' | 'main' | 'sauce'| undefined;

export type TIngredient = {
  carbohydrates?: number;
  calories?: number;
  fat?: number;
  image: string;
  image_large?: string;
  image_mobile?: string;
  name?: string;
  price: number;
  proteins?: number,
  type: TTypeIngredient;
  __v?: number;
  _id: string;
  count: number;
  key: number;
}
