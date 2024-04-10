// https://on.cypress.io/api
//  it.skip 跳過
describe('My First Test', () => {
  it.skip('Window should not have horizontal scrollbar', () => {
    cy.visit('your_page_url')

    cy.window().then((win) => {
      const windowWidth = win.innerWidth
      const documentWidth = document.documentElement.scrollWidth

      cy.log('Window width:', windowWidth)
      cy.log('Document width:', documentWidth)

      expect(documentWidth).to.be.at.most(windowWidth)
    })
  })

  it('Window should not have horizontal scrollbar', () => {
    cy.viewport('samsung-s10')
    cy.visit('/')
    cy.url().should('contain', '/')

    cy.get('#footer').should('exist')

    //const documentWidth3 = document.documentElement.scrollWidth
    // cy.log('scrollWidth width:', documentWidth3)//0 直接抓 document 是抓不到的

    cy.window().then((win) => {
      const windowWidth = win.innerWidth
      cy.log('innerWidth width:', windowWidth) //360 正確
      //const scrollWidth = document.documentElement.scrollWidth
      //cy.log('Window width:', scrollWidth)//0 直接抓 document scrollWidth 是抓不到的
      //試試抓其他內容
      // cy.log('win.scrollX:', win.scrollX)//0
      //cy.log('win.screenX:', win.screenX) //2363??
      //cy.log('win.screenX:', win.outerWidth) //1599?
      const scrollWidth = win.document.documentElement.scrollWidth
      cy.log('scrollWidth width:', scrollWidth) //358? 不知道為什麼不等於 document.documentElement.clientWidth=371
      const clientWidth = win.document.documentElement.clientWidth
      cy.log('clientWidth width:', clientWidth) //345? 不知道為什麼不等於 document.documentElement.clientWidth=360
      //expect(scrollWidth).to.be.at.most(windowWidth) 原本預期是應小於 windowWidth 但是因為抓到的數值竟然小於 windowWidth
      expect(scrollWidth).to.be.at.most(clientWidth) //改為應小於 clientWidth
    })

    cy.document().then((doc) => {
      // work with document element
      cy.log('scrollWidth width:', doc.documentElement.scrollWidth) //358
      cy.log('clientWidth width:', doc.documentElement.clientWidth) //345
      cy.log('offsetWidth width:', doc.documentElement.offsetWidth) //345
      cy.log('body scrollWidth:', doc.body.scrollWidth) //358 跟上面一樣
      cy.log('innerWidth width:', doc.documentElement)
    })

    //cy.window().then(($el) => expect($el.document.body.style.overflow).to.eq('hidden'))
  })
})
