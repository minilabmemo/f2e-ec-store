// https://on.cypress.io/api

describe('Login Test', () => {
  it('visits the product,need login and check failed.', () => {
    cy.visit('/admin/dashboard/products')
    cy.url().should('contain', '/login');
    cy.get('#inputEmail').type('john_doe');
    cy.get('#inputPassword').type('password123');
    cy.get('.btn').click();
  //  cy.get('form').should('contain', '請在電子郵件地址包含'); get alert message
  })

})
