describe('Post app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'testuser',
      username: 'testuser',
      password: 'testuser'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blog')
    cy.contains('This are your posts')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testuser', password: 'testuser' })
    })

    it('a new post can be created', function() {
      cy.contains('Add Post').click()
      cy.get('#post-title').type('Why you should switch to react')
      cy.get('#post-author').type('Sarah Dayan')
      cy.get('#post-url').type('vue.com')
      cy.get('#add-post').click()

      cy.contains('Why you should switch to react')
      cy.contains('Sarah Dayan')
    })
  })

})