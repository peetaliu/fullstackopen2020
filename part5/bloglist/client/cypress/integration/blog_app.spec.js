describe('Blog App', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'testUserName',
      name: 'testName',
      password: 'testPassword',
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function () {
    cy.contains('Login').click()
    cy.contains('Username:')
    cy.contains('Password:')
  })
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('Login').click()
      cy.get('#username').type('testUserName')
      cy.get('#password').type('testPassword')
      cy.get('.LoginBtn').click()
      cy.contains('Logged in as testName')
    })
    it('fails with incorrect credentials', function () {
      cy.contains('Login').click()
      cy.get('#username').type('testUserName')
      cy.get('#password').type('wrongPW')
      cy.get('.LoginBtn').click()
      cy.contains('Wrong Credentials')
    })
  })
})
