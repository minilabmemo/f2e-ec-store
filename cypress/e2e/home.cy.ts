

describe('Home Test', () => {
  it('visits the landing page website.', () => {
    cy.visit('/')
    cy.url().should('contain', '/#');
    cy.get('#logo').should('be.visible');
    cy.get('nav').should('be.visible');
    cy.get('#news').should('exist')
    cy.get('#news > .row > :nth-child(1) > :nth-child(2) > h4').should('contain',"連身裙") //首頁先固定會顯示的內容，之後結合商品管理一起修正。
    cy.get('#special').should('exist')
  })
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
