// https://on.cypress.io/api
// import {userProductsApi} from '@/utils/const/path' //FIXME import can't work
describe('Product List Test', () => {
  it('navbar visible.', () => {
    cy.viewport('samsung-s10')
    cy.visit('/#/product/all/all')
    cy.get('.col-sm-3.justify-content-center > #logo').should('be.visible')
    cy.get('.navbar-toggler').should('be.visible')

    cy.viewport(992, 768)
    cy.get('.navbar-toggler').should('not.be.visible')
  })

  it('product list number test.', () => {
    cy.visit('/#/product/all/all')
    const userProductsApi = 'https://vue3-course-api.hexschool.io/api/boot-api/products/all'
    let pageItem = 0
    cy.request('GET', userProductsApi).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('products')

      if (response.body.products.length < 12) {
        pageItem = response.body.products.length
      } else {
        pageItem = 12
      }
      cy.get('[data-cy="products"]').within(() => {
        cy.get('[data-cy="item"]').should('have.length', pageItem)
      })
    })
  })
})
