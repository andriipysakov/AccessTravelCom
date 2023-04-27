///<reference types = "Cypress" />

describe('hotel page sanity tests', () => {

  const hotel_url = 'https://www.accesstravel.com/en-US/Hotel/List'
  const destination_list = '#Filter_DestinationId'
  const number_of_adult = '#Filter_AdultNum'
  const number_of_adult_error = '[data-valmsg-for="Filter.AdultNum"]'
  const number_of_children = '#Filter_ChildrenNum'
  const number_of_children_error = '[data-valmsg-for="Filter.ChildrenNum"]'
  const ages_of_children = '[name="Filter.ChildrensAge[0]"]'
  const checkin = '[name="Filter.CheckIn"]'
  const checkin_error = '[data-valmsg-for="Filter.CheckIn"]'
  const checkout = '[name="Filter.CheckOut"]'
  const checkout_error = '[data-valmsg-for="Filter.CheckOut"]'
  const submit_button = '[type="submit"]'
  

  beforeEach(() => {
    cy.viewport(1400, 947)
    cy.visit(hotel_url)
  })

  it('navigate hotel page', () => {
    cy.url().should('eq', 'https://www.accesstravel.com/en-US/Hotel/List')
    cy.get('.sub-heading').should('be.visible')
    cy.get('.sub-heading').should('have.text', 'Find Your Inclusive Hotel!')
  })

  it('positive test chooses cities in list', () => {
    cy.get(destination_list).should('be.visible')
    cy.get(destination_list).select('Jerusalem', { force: true }).should('have.value', '8')
    cy.get(destination_list).select('London', { force: true }).should('have.value', '31')
    cy.get(destination_list).select('New York', { force: true }).should('have.value', '51')
  })

  it('positive test number of children', () => {
    cy.get(number_of_children).should('be.visible')
    cy.get(number_of_children).should('have.value', '0')
    cy.get(number_of_children).clear().type('1').should('have.value', '1', { force: true })
    cy.get('.hotels-wrap').click()
    cy.get('[class="row children-age"]').should('be.visible')
    cy.get(ages_of_children).clear().type('1', { force: true })
  })

  it('negative test invalid dates checkin', () => {
    cy.get(destination_list).select('Jerusalem')
    cy.get(checkin).clear().type('1943-01-01')
    cy.get(submit_button).click()
    cy.get(checkin).should('have.value', '1943-01-01')
    cy.get(checkin_error).should('be.visible')
    cy.get(checkin_error).should('have.text', 'Filter_CheckIn_MinValue_en-US')
  })

  it('negative test invalid dates checkout', () => {
    cy.get(destination_list).select('Jerusalem')
    cy.get(checkin).clear().type('2023-08-01')
    cy.get(checkout).clear().type('2023-06-01')
    cy.get(submit_button).click()
    cy.get(checkout).should('have.value', '2023-06-01')
    cy.get(checkout_error).should('be.visible')
    cy.get(checkout_error).should('have.text', 'Invalid Check out Date')
  })

  it('negative test invalid number of adults', () => {
    cy.get(destination_list).select('Jerusalem')
    cy.get(number_of_adult).clear().type('656')
    cy.get(submit_button).click()
    cy.get(number_of_adult).should('have.value', '656')
    cy.get(number_of_adult_error).should('be.visible')
    cy.get(number_of_adult_error).should('have.text', 'Invalid value')
  })

  it('negative test invalid number of children', () => {
    cy.get(destination_list).select('Jerusalem')
    cy.get(number_of_children).clear().type('656')
    cy.get(submit_button).click()
    cy.get(number_of_children).should('have.value', '656')
    cy.get(number_of_children_error).should('be.visible')
    cy.get(number_of_children_error).should('have.text', 'Invalid number')
  })

})