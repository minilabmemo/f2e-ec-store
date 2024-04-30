// https://on.cypress.io/api

describe('Login Test', () => {
  //FIXME: secret env setting
  it.skip('visits the product,need login and check failed.', () => {
    cy.visit('#/admin/dashboard/products')
    cy.url().should('contain', '/login')
    cy.get('#inputEmail').type('john_doe')
    cy.get('#inputPassword').type('password123')
    cy.get('.btn').click()

    cy.get('#inputEmail').should('have.focus')
  })
})
