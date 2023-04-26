///<reference types = "Cypress" />

describe('hotel page sanity tests', () => {

  const hotel_url = 'https://www.accesstravel.com/en-US/Hotel/List'
  const destination_list = '#Filter_DestinationId'
  const number_of_children = '#Filter_ChildrenNum'
  const ages_of_children = '#Filter_ChildrensAge\[0\]'

  beforeEach(() => {
    cy.viewport(1400, 947)
    cy.visit(hotel_url)
  })

  it('navigate hotel page', () => {
    cy.url().should('eq', 'https://www.accesstravel.com/en-US/Hotel/List')
    cy.get('.sub-heading').should('be.visible')
    cy.get('.sub-heading').should('have.text', 'Find Your Inclusive Hotel!')

  })

  it('positive tests chooses cities in list', () => {
    cy.get(destination_list).should('be.visible')
    cy.get(destination_list).select('Jerusalem', { force: true }).should('have.value', '8')
    cy.get(destination_list).select('London', { force: true }).should('have.value', '31')
    cy.get(destination_list).select('New York', { force: true }).should('have.value', '51')

  })

  it('positive tests number of children', () => {
    cy.get(number_of_children).should('be.visible')
    cy.get(number_of_children).should('have.value', '0')
    cy.get(number_of_children).clear().type('1').should('have.value', '1', { force: true })
    cy.get('.hotels-wrap').click()
    cy.get('[class="row children-age"]').should('be.visible')
    cy.get('[name="Filter.ChildrensAge[0]').clear().type('1', { force: true })
  })

})