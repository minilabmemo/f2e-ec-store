// https://on.cypress.io/api

describe('My First Test', () => {
  it.skip('visits the app root url', () => {
    cy.visit('/')
    cy.contains(':nth-child(1) > .details > h3', 'Documentation')
  })
})

//  it.skip 跳過 