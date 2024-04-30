import './commands.cy'
describe('Product By ID Page  - visible Test', () => {
  it('navbar visible.', () => {
    cy.viewport('samsung-s10')
    cy.visit('/#/product/all/all')
    cy.get('.col-sm-3.justify-content-center > #logo').should('be.visible')
    cy.get('.navbar-toggler').should('be.visible')

    cy.viewport(992, 768)
    cy.get('.navbar-toggler').should('not.be.visible')
  })
  it('product recommendItems exist.', () => {
    cy.visit('/#/product/all/all')
    cy.get('[data-cy="product-item"]').first().click()
    cy.url().should('contain', '/#/product/all/all/id')
    cy.contains('h4', '您可能也喜歡').should('exist')
  })

})

describe('Product By ID Page  - button Test', () => {

  it('user save item and save page test.', () => {
    cy.visit('/#/product/all/all')
    cy.get('[data-cy="product-item"]').first().click()
    cy.url().should('contain', '/#/product/all/all/id')

    cy.contains('button', '加入收藏').click()
    cy.url().should('contain', '/#/product/all/all/id')
    cy.contains('button', '已收藏').should('be.visible')
    cy.get("img[alt='save']").first().click({force: true})
    cy.url().should('contain', '/#/user/saves')
    cy.get("[data-cy='item']").should('exist')
    cy.contains('button', '移出收藏').click()
    cy.contains('div', '無收藏商品').should('exist') // save action can re-work, only one saved
  })
  it('user checkout same item confirm.', () => {
    cy.deleteAllItems()
    cy.visit('/#/product/all/all')
    cy.get('[data-cy="product-item"]').first().click()
    cy.url().should('contain', '/#/product/all/all/id')
    cy.contains('button', '加入購物車').click()
    cy.url().should('contain', '/#/product/all/all/id')
    cy.contains('button', '立即結帳').click()
    cy.contains('.modal-title', '是否加入相同商品').should('be.visible')
  })
  it('no same items in carts, checkout then go to cart page', () => {
    cy.deleteAllItems()
    cy.visit('/#/product/all/all')
    cy.get('[data-cy="product-item"]').first().click()
    cy.url().should('contain', '/#/product/all/all/id')
    cy.contains('button', '立即結帳').click()
    cy.get('.modal-title').should('not.be.visible')
    cy.url().should('contain', '/#/user/cart/flow')
  })

})
