import PropTypes from 'prop-types';

export const h1_type = 'text text_type_main-large';
export const h3_type = 'text text_type_main-medium';

export const letters = 'text text_type_main-default';
export const letters_grey = `${letters} text_color_inactive`;

export const digits = 'text text_type_digits-default';
export const digits_grey = `${digits} text_color_inactive`;

export const ingredientType = PropTypes.shape({
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
  count: PropTypes.number
});
