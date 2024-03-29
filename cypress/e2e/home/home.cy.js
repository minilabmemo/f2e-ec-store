import './commands.cy'

describe('Home Layout Test', () => {

  it('visits the landing page website at 360px.', () => {
    cy.viewport('samsung-s10')
    cy.visit('/')
    cy.get('.col-sm-3.justify-content-center > #logo').should('be.visible');
    cy.visitAndCheckPage()
  })
  it('visits the landing page website at 375px.', () => {
    cy.viewport('iphone-6')
    cy.visit('/')
    cy.get('.col-sm-3.justify-content-center > #logo').should('be.visible');


    cy.visitAndCheckPage()
  })
  it('visits the landing page website at 1440px.', () => {
    cy.viewport('macbook-13')
    cy.visit('/')
    cy.get('.mx-auto #logo').should('be.visible');
    cy.visitAndCheckPage()
  })
  it('visits the landing page website at 1536px.', () => {
    cy.viewport('macbook-16')
    cy.visit('/')
    cy.get('.mx-auto #logo').should('be.visible');
    cy.visitAndCheckPage()
  })
})

describe('Home Action Test', () => {

  it('click nav link and back to home', () => {
    cy.visit('/')
    cy.url().should('contain', '/#');
    cy.contains('.nav-link', '熱銷').click();
    cy.url().should('contain', '/#/product/hot/all');  //FIXME 確認無資料時顯示
    cy.get('#logo',).first().click();
    cy.location().should((loc) => {
      expect(loc.hash).to.eq('#/')
    })
  })

  it('click save link', () => {
    cy.visit('/')
    cy.url().should('contain', '/#');
    cy.get('img[alt="save"]').first().click();
    cy.url().should('contain', '/#/user/saves');

  })
  it('click cart link ', () => {
    cy.visit('/')
    cy.url().should('contain', '/#');

    cy.get('img[alt="cart"]').first().click();
    cy.url().should('contain', '/#/user/cartflow');

  })
  it('click order link ', () => {
    cy.visit('/')
    cy.url().should('contain', '/#');
    cy.get('#dropdownMenuButton').first().click();
    cy.contains('a', '查詢訂單').click();
    cy.url().should('contain', '/#/user/orders');

  })

})
