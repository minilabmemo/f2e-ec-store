Cypress.Commands.add('visitAndCheckPage', () => {
  cy.visit('/')
  cy.url().should('contain', '/#');
  cy.get('nav').should('be.visible');
  cy.get('#news').should('exist')
  cy.get('#news h4').should('contain', "連身裙")
  cy.get('#special').should('exist')
})