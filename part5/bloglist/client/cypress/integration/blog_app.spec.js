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
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testUserName', password: 'testPassword' })
    })
    it('Blog can be created', function () {
      cy.contains('New Blog').click()
      cy.get('#title').type('Test title created by cypress')
      cy.get('#author').type('Test author')
      cy.get('#url').type('Test url')
      cy.get('#crtBtn').click()
      cy.contains('Test title created by cypress')
    })
    it('Blog can be liked', function () {
      cy.contains('New Blog').click()
      cy.get('#title').type('Test title created by cypress')
      cy.get('#author').type('Test author')
      cy.get('#url').type('Test url')
      cy.get('#crtBtn').click()
      cy.get('.viewBtn').click()
      cy.get('.likeBtn').click()
      cy.contains(
        'added like to blog: Test title created by cypress. Total likes now at: 1'
      )
      cy.get('.likeBtn').click()
      cy.contains(
        'added like to blog: Test title created by cypress. Total likes now at: 2'
      )
    })
    describe.only('When blog exists', function () {
      beforeEach(function () {
        const blog = {
          title: 'cypress test 2',
          author: 'test author',
          url: 'test url',
        }
        cy.createBlog(blog)
      })
      it('Can delete', function () {
        cy.get('.viewBtn').click().get('.delBtn').click()
        cy.contains('Deleted blog: cypress test 2')
      })
      it('Can not delete', function () {
        const user = {
          username: 'testUserName2',
          name: 'testName2',
          password: 'testPassword',
        }
        cy.request('POST', 'http://localhost:3001/api/users', user)
        cy.login({ username: 'testUserName2', password: 'testPassword' })
        cy.get('.viewBtn').click().should('not.contain', 'delete')
      })
    })
  })
})
