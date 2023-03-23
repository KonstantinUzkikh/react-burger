import { BASE_URL, endPoints } from '../../src/utils';
import { bun1_count0, bun2_count0, main_count0, sauce_count0 } from '../../src/utils/mock-ingredients'

describe('запускаем приложение', function () {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.intercept('POST', `${BASE_URL}${endPoints.login}`, { fixture: "user.json" });
    cy.intercept('POST', `${BASE_URL}${endPoints.orders}`, { fixture: "order.json" });
    cy.intercept('POST', `${BASE_URL}${endPoints.logout}`, { fixture: "logout.json" });
  })

  it('аутентификация пользователя и заказ бургера', function () {

    //проверка загрузки главной страницы
    cy.get('h1').should('exist').and('contain', 'Соберите бургер');

    //переход на страницу авторизации
    cy.get('[data-testid=profile]').should('exist').click();

    cy.get('h3').should('exist').and('contain', 'Вход');
    cy.get('[type="email"]').should('exist');
    cy.get('[type="password"]').should('exist');
    cy.get('[type="submit"]').should('exist').and('contain', 'Войти');

    //авторизация
    cy.get('.input__icon').first().click()
    cy.get('[type="email"]').type('test@mail.com').should('have.value', 'test@mail.com')
    cy.get('[type="password"]').type('TestPassword').should('have.value', 'TestPassword')
    cy.get('[type="submit"]').contains('Войти').click()

    cy.get(`[data-testid=notification]`).should('exist');
    cy.setCookie('accessToken', 'Bearer 123456789');
    cy.setCookie('refreshToken', '987654321');

    //прверка наличия булок и ингредиентов
    cy.get(`#${bun1_count0._id}`).should('exist');
    cy.get(`#${bun2_count0._id}`).should('exist');
    cy.get(`#${sauce_count0._id}`).should('exist');
    cy.get(`#${main_count0._id}`).should('exist');

    //формирование бургера
    cy.get(`#${bun1_count0._id}`).trigger('dragstart');
    cy.get('[data-testid=bunTopTarget]').trigger('drop');

    cy.get(`#${bun2_count0._id}`).trigger('dragstart');
    cy.get('[data-testid=bunBottomTarget]').trigger('drop');

    cy.get(`#${sauce_count0._id}`).trigger('dragstart');
    cy.get('[data-testid=bunIngredientTarget]').trigger('drop');

    cy.get(`#${main_count0._id}`).scrollIntoView().should('be.visible')
    cy.get(`#${main_count0._id}`).trigger('dragstart');
    cy.get('[data-testid=bunIngredientTarget]').trigger('drop');

    //оформление заказа
    cy.get(`[data-testid=buttonMakeOrder]`).should('exist').and('contain', 'Оформить заказ').click();
    cy.get(`[data-testid=notification]`).should('exist');
    cy.get(`[data-testid=orderId]`).should('exist').and('contain', '123452');

    //возврат на главную страницу
    cy.get('body').type('{esc}')
    cy.get('h1').should('exist').and('contain', 'Соберите бургер');

    //переход на страницу профиля
    cy.get('[data-testid=profile]').should('exist').click();

    //logout
    cy.get('#logout').should('exist').click();
    cy.get(`[data-testid=notification]`).should('exist');

    //возврат на главную страницу
    cy.get('body').type('{esc}')
    cy.get('h1').should('exist').and('contain', 'Соберите бургер');
  })

});

export { }
