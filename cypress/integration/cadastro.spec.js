/// <reference types="cypress" />

var Chance = require('chance')
var chance = new Chance()

var firstName = chance.first()
var lastName = chance.last()

describe('Go to my account ', () => {
    it('When user selects Sign in option, Authentication page is loaded', () => {
        cy.visit('http://automationpractice.com/index.php')

        cy.get('a.login').click()

        cy.url().should('contain', 'authentication&back=my-account')
    });
});


describe('Open Create account page', () => {
    it('When user enter his email and click create an account, a new registration page will be opened and he will be able to registrate himself', () => {
        cy.visit('http://automationpractice.com/index.php?controller=authentication&back=my-account')

        cy.get('#email_create').type(chance.email())
        cy.get('#SubmitCreate').click()

        cy.url().should('contain', 'account-creation')

        cy.get('input#id_gender2').check()
        cy.get('#customer_firstname').type(firstName)
        cy.get('#customer_lastname').type(lastName)
        cy.get('#passwd').type(chance.string({ length: 5 }))

        cy.get('select#days').select('21', {force: true})
        cy.get('select#months').select('July', {force: true})
        cy.get('select#years').select('1990', {force: true})

        cy.get('#address1').type(chance.address())
        cy.get('#city').type(chance.city())
        cy.get('select#id_state').select('Illinois', {force: true})
        cy.get('#postcode').type(chance.zip())
        cy.get('#phone_mobile').type(chance.phone({ formatted: false }))

        cy.get('#alias').type('Home')

        cy.get('#submitAccount').click()

        cy.url().should('contain', 'controller=my-account')


    });
});


