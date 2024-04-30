Cypress.Commands.add('deleteAllItems', () => {
  cy.visit('/#/product/all/all')
  cy.url().should('contain', '/#/product/all/all')
  cy.get('[data-cy="product-item"]').first().click()
  cy.contains('button', '加入購物車').click({force: true})
  cy.visit('/#/user/cart/flow')
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(1000)
  cy.contains('button', '清空購物車').click()
  cy.contains('.modal button', '清空購物車').click()
  cy.contains('div', '您的購物車是空的，請先將商品放入購物車。')
})