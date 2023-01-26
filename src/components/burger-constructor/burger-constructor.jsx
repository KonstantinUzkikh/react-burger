import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
import { ConstructorElement, Button, DragIcon, CurrencyIcon, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { order } from '../../utils/constants.js';
import { ingredientType } from '../../utils/types.js';
import currency from '../../images/currency-icon.svg';
import componentsLayout from './burger-constructor.module.css';

const BurgerComponent = (props) => {

  return (
    <div className={componentsLayout.component}>
        <ConstructorElement
          type={props.type}
          isLocked={props.isLocked}
          text={props.text}
          price={props.price}
          thumbnail={props.thumbnail}
          extraClass={props.extraClass}
          handleClose={props.handleClose}
        />
      {props.isDrag ? <DragIcon type={props.typeDrag} /> : null}
    </div>
  );
}

BurgerComponent.propTypes = {
  isDrag: PropTypes.bool,
  type: PropTypes.oneOf(["top", "bottom"]),
  isLocked: PropTypes.bool,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  extraClass: PropTypes.string,
  handleClose: PropTypes.func
};

const BurgerComponents = ({arr}) => {

  return (
    <div className={componentsLayout.components}>
      {arr.map((item) => {
          // временные константы (на период разработки). Заменить на динамические указатели
          if ((item._id !== "60d3b41abdacab0026a733c6") && (item._id !==  "60d3b41abdacab0026a733c7")) {
          return (
            <BurgerComponent
              isDrag = {true}
              text = {item.name}
              price = {item.price}
              thumbnail = {item.image}
              key={item._id}
            />
          )
        }
      })}
    </div>
  );
}

BurgerComponents.propTypes = {
  arr: PropTypes.arrayOf(ingredientType).isRequired
};

function BurgerConstructor({ bun, data }) {

  let total = data.reduce((previousValue, item) => { return previousValue + item.price }, 2 * bun.price);

  const [isModal, setIsModal] = React.useState(false)
  const onCloseModal = () => { setIsModal(false) }

  return (
    <div className={componentsLayout.boxMain}>
      <BurgerComponent
        isDrag = {false}
        type = "top"
        isLocked = {true}
        text = {`${bun.name} (верх)`}
        price = {bun.price}
        thumbnail = {bun.image}
        extraClass = "mb-4"
      />

      <BurgerComponents arr={data} />

      <BurgerComponent
        isDrag = {false}
        type = "bottom"
        isLocked = {true}
        text = {`${bun.name} (низ)`}
        price = {bun.price}
        thumbnail = {bun.image}
        extraClass = "mt-4 mb-9"
      />

      <div className={componentsLayout.total} >
        <Button
          htmlType="button"
          type="primary"
          size="large"
          extraClass="ml-10"
          onClick={(() => setIsModal(true))}
        >
          Оформить заказ
        </Button>
        <img src={currency} alt="алмазик" className={componentsLayout.icon} />
        <span className="text text_type_digits-medium">{total}</span>
      </div>
      {isModal && (
        <Modal title="" onClose={onCloseModal} >
          <OrderDetails order={order} />
        </Modal>
      )}
    </div>
  )
}

BurgerConstructor.propTypes = {
  bun: ingredientType,
  data: PropTypes.arrayOf(ingredientType).isRequired
};

export default BurgerConstructor;
