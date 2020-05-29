// Cypress tests use Mocha under the hood. As per Mocha docs,
// avoid using arrow functions as they may cause issues in certain circumstances
describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Peter Liu',
      username: 'peetaliu',
      password: 'password',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2020'
    )
  })

  it('user can log in', function () {
    cy.contains('login').click()
    cy.get('#username').type('peetaliu')
    cy.get('#password').type('password')
    cy.get('#login-button').click()

    cy.contains('Peter Liu logged in')
  })

  it('login fails with wrong password', function () {
    cy.contains('login').click()
    cy.get('#username').type('peetaliu')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
    cy.get('html').should('not.contain', 'Peter Liu logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'peetaliu', password: 'password' })
    })

    it('a new note can be created', function () {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()

      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('it can be made important', function () {
        cy.contains('second note').parent().find('button').click()
        cy.contains('second note')
          .parent()
          .find('button')
          .should('contain', 'make not important')
      })
    })
  })
})
