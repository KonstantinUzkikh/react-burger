import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '..//burger-constructor/burger-constructor';

describe('Приложение запущено', function () {
  //beforeEach(() => {
  //  cy.visit('http://localhost:3000');
  //})

  it('renders', () => {
    cy.mount(<BurgerIngredients />);
    cy.mount(<BurgerConstructor />);
  })

  it('вход в личный кабинет', function () {

    cy.get('h1').should('exist').and('contain','Соберите бургер');
  })

});

export { }
