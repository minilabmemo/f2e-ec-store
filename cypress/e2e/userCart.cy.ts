// https://on.cypress.io/api
describe('user /cart/flow Page Test', () => {
  it('navbar visible.', () => {
    cy.viewport('samsung-s10')
    cy.visit('/#/user/cart/flow')
    cy.get('.col-sm-3.justify-content-center > #logo').should('be.visible')
    cy.get('.navbar-toggler').should('be.visible')
    cy.viewport(992, 768)
    cy.get('.navbar-toggler').should('not.be.visible')
  })

  it('user remove cart item.', () => {
    cy.viewport('samsung-s10')

    cy.visit('/#/product/all/all')
    cy.url().should('contain', '/#/product/all/all')
    cy.get('[data-cy="item"]').first().click()
    cy.contains('button', '加入購物車').click()
    cy.visit('/#/user/cart/flow')
    cy.get('.bi-x').first().click()
    cy.contains('button', '移出購物車').click()
  })

  it('fill order.', () => {
    cy.viewport('samsung-s10')
    cy.visit('/#/product/all/all')
    cy.url().should('contain', '/#/product/all/all')
    cy.get('[data-cy="item"]').first().click()
    cy.contains('button', '加入購物車').click()
    cy.visit('/#/user/cart/flow')

    cy.contains('button.btn-danger', '填寫訂單').click()
    cy.get('#email').type('cypress_test@gmail.com')
    cy.get('#name').type('cypress_test')
    cy.get('#tel').type('0912345678')
    cy.get('#address').type('test')
    // cy.contains('button.btn-danger', '送出訂單').click()
    // cy.contains('button.btn-danger', '確認付款去').click()
    // cy.contains('button', '稍後付款').click()
  })
})
