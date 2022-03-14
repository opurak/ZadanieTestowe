//Check whether proper error signs messages are shown while no credentials from user are introduced.
describe('No credentials', ()=>{
    //First test for login.
    it('Verify error signs when login without credentails', ()=>{
        cy.visit('https://staging.paymi.com/users/sign_up')
        cy.get('.register').click()
        cy.get('form').contains("Email can't be blank")
        cy.get('input#user_email').should('have.css', 'background-color', 'rgba(248, 111, 98, 0.2)')
        cy.get('form').contains("Password can't be blank")
        cy.get('input#user_password').should('have.css', 'background-color', 'rgba(248, 111, 98, 0.2)')
    })
    //Second test for sign up.
    it('Verify error signs when signing up without credentials and checking the T&C box.', ()=>{
        cy.visit('https://staging.paymi.com/users/sign_up')
        cy.get('.register').click()
        cy.get('form').contains("Email can't be blank")
        cy.get('input#user_email').should('have.css', 'background-color', 'rgba(248, 111, 98, 0.2)')
        cy.get('form').contains("Password can't be blank")
        cy.get('input#user_password').should('have.css', 'background-color', 'rgba(248, 111, 98, 0.2)')
        cy.get('form').contains("Terms and conditions must be accepted")
        cy.get('input#user_referral_sign_up_code').should('have.text','').and('have.css', 'background-color', 'rgb(242, 242, 242)')
        cy.get('#referral-error').should('not.be.visible')
    
    })
})
// Check whether user can intrduce incorrect credentials(i.e. short password, password without special characters, email without '@')
describe('Incorrect Credentials', ()=>{
    it('Check email without @', ()=>{
        cy.visit('https://staging.paymi.com/users/sign_up')
        cy.get('#terms-label').click()
        cy.get('#user_email').type('faketest.com')
        cy.get('.password-field')
            .type('test')
        cy.get('.register').click()
        cy.get('.error-text').should('have.text', 'Email is invalid')
    })
    it('Check Short Password', ()=>{
        cy.visit('https://staging.paymi.com/users/sign_up')
        cy.get('#terms-label').click()
        cy.get('#user_email').type('fake@test.com')
        cy.get('.password-field')
            .type('test')
        cy.get('.register').click()
        cy.get(".error-text").should('have.text', 'Password is too short (minimum is 8 characters)')
        cy.get('#user_password').invoke('attr', 'type').should('eq', 'password')
        cy.get('.fa-eye-slash').click()
        cy.get('#user_password').invoke('attr', 'type').should('eq', 'text')
         cy.get('.password-field')
            .type('testpass2')
         cy.get('.register').click()
    })
    it('Check Password without special characters', ()=>{
        cy.visit('https://staging.paymi.com/users/sign_up')
        cy.get('#terms-label').click()
        cy.get('#user_email').type('fake@test.com')
        cy.get('.password-field')
            .type('testooooo')
        cy.get('.register').click()
        cy.get("span.error-text").should('have.text', 'Password should be at least 8 characters long and include: 1 uppercase, 1 lowercase and 1 digit or special character');
    })

})
// Test Failed Login,Sign up, and successful Login
describe('Login/Sign up Flow', ()=>{
    it('Failed Login', ()=>{
        cy.visit('https://staging.paymi.com/users/sign_in')
        cy.get('#user_email')
            .type('fake@test.com')
        cy.get('.password-field')
            .type('1234')
        cy.get('.register').click()
        cy.get(".error-box__errors").should('be.visible')
        cy.get('#user_email').should('have.value', 'fake@test.com')
        cy.get('.password-field').should('have.value', '') 
    })
    it('Failed Sign up', ()=>{
        cy.contains('Create an account').click()
        cy.url().should('include', '/users/sign_up')
        cy.get('.form-group').eq(0)
            .type('gocak80455@tourcc.com')
        cy.get('.form-group').eq(1)
            .type('Testacc320')
        cy.get('.form-group').eq(2).should('have.value', '')
        cy.get('#terms-label').click()
        cy.get('.register').click()
        cy.get(".help-box").should('be.visible');
    })
    it('Sucessful Login', ()=>{
        cy.contains('Log In').click()
        cy.url().should('include', '/users/sign_in')
        cy.get('#user_email')
            .type('gocak80455@tourcc.com')
            .should('have.value', 'gocak80455@tourcc.com')
        cy.get('.password-field')
            .type('Testacc320')
        cy.get('.register').click()
        cy.url().should('include', '/dashboard/accounts')
    })
})
