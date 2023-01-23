import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
import { ConstructorElement, Button, DragIcon, CurrencyIcon, Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import componentsLayout from './burger-constructor.module.css';
import currency from '../../images/currency-icon.svg';

  // Временные константы, используемые для отладки
  const order = '034536'

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
      {props.isDrag ? (<DragIcon type={props.typeDrag} />) : (<div></div>)}
    </div>
  );
}

BurgerComponent.propTypes = {
  isDrag: PropTypes.bool,
  type: PropTypes.oneOf(["top", "bottom"]),
  isLocked: PropTypes.bool,
  text: PropTypes.string,
  price: PropTypes.number,
  thumbnail: PropTypes.string,
  extraClass: PropTypes.string,
  handleClose: PropTypes.func
};

const BurgerComponents = ({arr}) => {

  return (
    <div className={componentsLayout.components}>
      {arr.map((item, index) => {
          // временное условие (на период разработки)
          if ((item._id !== "60d3b41abdacab0026a733c6") && (item._id !==  "60d3b41abdacab0026a733c7")) {
          return (
            <BurgerComponent
              isDrag = {true}
              text = {item.name}
              price = {item.price}
              thumbnail = {item.image}
              key={index}
            />
          )
        }
      })}
    </div>
  );
}

BurgerComponents.propTypes = {
  arr: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number
  })).isRequired
};

function BurgerConstructor({ top, bottom, data }) {

  let total = data.reduce((previousValue, item) => { return previousValue + item.price }, top.price + bottom.price);

  const [isModal, setIsModal] = React.useState(false)

  return (
    <div className={componentsLayout.boxConstructor}>
      <BurgerComponent
        isDrag = {false}
        type = "top"
        isLocked = {true}
        text = {top.name}
        price = {top.price}
        thumbnail = {top.image}
        extraClass = "mb-4"
      />

      <div style={{ maxHeight: 464, overflow: 'auto' }} >
        <BurgerComponents arr={data} />
      </div>

      <BurgerComponent
        isDrag = {false}
        type = "bottom"
        isLocked = {true}
        text = {bottom.name}
        price = {bottom.price}
        thumbnail = {bottom.image}
        extraClass = "mt-4 mb-9"
      />

      <div className={componentsLayout.total} style={{overflow: 'hidden'}}>
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
        <ModalOverlay isActive={isModal} setIsActive={setIsModal} >
          <Modal title="" isActive={isModal} setIsActive={setIsModal} >
            <OrderDetails order={order} />
          </Modal>
        </ModalOverlay>
      )}
    </div>
  )
}

BurgerConstructor.propTypes = {
  top: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number
  }),
  bottom: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number
  }),
  data: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number
  })),
};

export default BurgerConstructor;
