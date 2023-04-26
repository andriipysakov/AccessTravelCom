///<reference types = "Cypress" />

describe('main page sanity tests', () => {

  const category_hotels = '.hotels'
  const category_guides = '.guides'
  const category_tours = '.js-list-tours'
  const category_things = '.attraction-link'
  const login_link = ':nth-child(4) > .menu-link-new'
  const signup_link = ':nth-child(5) > .menu-link-new'

  beforeEach(() => {
    cy.viewport(1400, 947)
    cy.visit('https://www.accesstravel.com/en-US/Home/Index')
  })

  it('navigate main page', () => {
    cy.url().should('eq', 'https://www.accesstravel.com/en-US/Home/Index')
    cy.get('h1').should('be.visible')

  })

  it('verification category and options on main page', () => {
    cy.get(category_hotels).should('be.visible')
    cy.get(category_hotels).invoke('text').should('eq', ' Hotels')
    cy.get(category_hotels).should('have.text', ' Hotels')
    cy.get(category_guides).should('be.visible')
    cy.get(category_guides).contains('Guides')
    cy.get(category_tours).should('be.visible')
    cy.get(category_tours).contains('Tours')
    cy.get(category_things).should('be.visible')
    cy.get(category_things).contains('Things to do')
  })

  it('verification hotels link url', () => {
    cy.get(category_hotels).click()
    cy.url().should('eq', 'https://www.accesstravel.com/en-US/Hotel/List')
    cy.get('.sub-heading').should('have.text', 'Find Your Inclusive Hotel!')
  })

  it('verification guides link url', () => {
    cy.get(category_guides).click()
    cy.url().should('eq', 'https://www.accesstravel.com/en-US/Guide/List?DestinationId=2')
    cy.get('h2').should('have.text', ' Inclusive Travel Companions, Advisors and Guides')
  })

  it('verification tours link url', () => {
    cy.get(category_tours).click()
    cy.url().should('eq', 'https://www.accesstravel.com/en-US/Tour/List?DestinationId=2')
    cy.get('h2').should('have.text', 'Discover amazing accessible to all tours and services ')
  })

  it('verification things link url', () => {
    cy.get(category_things).click()
    cy.url().should('eq', 'https://www.accesstravel.com/en-US')
    cy.get('.attractions-search__head-title > h1').should('have.text', 'Universal Adventures')
  })

  it('verification login page url', () => {
    cy.get(login_link).click()
    cy.url().should('eq', 'https://www.accesstravel.com/en-US/Account/Login')
    cy.get('.login-headline').should('have.text', 'Sign in')
  })

  it('verification signup page url', () => {
    cy.get(signup_link).click()
    cy.url().should('eq', 'https://www.accesstravel.com/en-US/Account/Register')
    cy.get('.registration-headline').should('have.text', 'Registration')
  })
})