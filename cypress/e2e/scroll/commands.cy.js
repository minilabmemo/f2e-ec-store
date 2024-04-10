Cypress.Commands.add('scrollWidthTest', () => {
  cy.window().then((win) => {
    const scrollWidth = win.document.documentElement.scrollWidth
    cy.log('scrollWidth width:', scrollWidth)
    const clientWidth = win.document.documentElement.clientWidth
    cy.log('clientWidth width:', clientWidth)
    expect(scrollWidth).to.be.at.most(clientWidth) //應小於 clientWidth
  })
})