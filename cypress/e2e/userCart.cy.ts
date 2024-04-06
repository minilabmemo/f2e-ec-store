// https://on.cypress.io/api
// import {userProductsApi} from '@/utils/const/path' //FIXME import can't work
describe('user cartflow Test', () => {
  it('navbar visible.', () => {
    cy.viewport('samsung-s10')
    cy.visit('/#/user/cartflow')
    cy.get('.col-sm-3.justify-content-center > #logo').should('be.visible');
    cy.get('.navbar-toggler').should('be.visible');
    cy.viewport(992, 768)
    cy.get('.navbar-toggler').should('not.be.visible');
  })

  it('user cartflow.', () => {
    cy.viewport('samsung-s10')
    cy.visit('/#/user/cartflow')
    cy.get('.btn > .nav-link').click()
    cy.get(':nth-child(1) > .nav-link > .flex-column > .flex-image').click()
    cy.get(':nth-child(2) > .h-100').click()
    cy.visit('/#/user/cartflow')
    cy.contains('button.btn-danger', '填寫訂單').click();
    cy.get('#email').type('cypass_test@gmail.com');
    cy.get('#name').type('cypass_test');
    cy.get('#tel').type('0912345678');
    cy.get('#address').type('test');
    // cy.contains('button.btn-danger', '送出訂單').click();
    // cy.contains('button.btn-danger', '確認付款去').click();
  })

})
