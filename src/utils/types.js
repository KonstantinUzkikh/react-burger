import PropTypes from 'prop-types';

const ingredientType = PropTypes.shape({
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  fat: PropTypes.number,
  image: PropTypes.string,
  image_large: PropTypes.string,
  image_mobile: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  proteins: PropTypes.number,
  type: PropTypes.string,
  __v: PropTypes.number,
  _id: PropTypes.string,
  count: PropTypes.number
}).isRequired;

export { ingredientType }


