// https://on.cypress.io/api
import './commands.cy'
describe('Home Test - Window should not have x scrollbar', () => {
  it('default device', () => {

    cy.visit('/')
    cy.url().should('contain', '/')
    cy.get('#footer').should('exist')
    cy.scrollWidthTest()
  })
  it('macbook device', () => {
    cy.viewport('macbook-13')
    cy.visit('/')
    cy.url().should('contain', '/')
    cy.get('#footer').should('exist')
    cy.scrollWidthTest()
  })
  it('iphone device', () => {
    cy.viewport('iphone-6')
    cy.visit('/')
    cy.url().should('contain', '/')
    cy.get('#footer').should('exist')
    cy.scrollWidthTest()
  })
  it('samsung device', () => {
    cy.viewport('samsung-s10')
    cy.visit('/')
    cy.url().should('contain', '/')
    cy.get('#footer').should('exist')
    cy.scrollWidthTest()
  })
})
