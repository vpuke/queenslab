/// <reference types="cypress" />
describe('E2E test that tests the form with correct data', () => {
  it('should visit', () => {
    cy.visit('/')
    cy.get('[data-cy=cardContainer]')
      .invoke('attr', 'class')
      .should('not.contain', 'flipped')
    cy.wait(500)
    cy.get('[data-cy=input-cardNumber]').type('4111 1111 1111 1111')
    cy.wait(500)
    cy.get('[data-cy=input-cardName]').type('Viktor Puke')
    cy.wait(500)
    cy.get('[data-cy=select-cardMonth]').select('11')
    cy.wait(500)
    cy.get('[data-cy=select-cardYear]').select('2025')
    cy.wait(500)
    cy.get('[data-cy=input-cardCVV]').type('1337')
    cy.get('[data-cy=cardContainer]')
      .invoke('attr', 'class')
      .should('contain', 'flipped')
    cy.wait(2000)
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy^=error-]').should('not.exist')
  })
})
