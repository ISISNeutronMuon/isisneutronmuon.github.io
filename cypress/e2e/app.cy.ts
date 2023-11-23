describe('Navigation', () => {
  it('should navigate to the about page', () => {
    cy.visit('http://localhost:3000/')
    cy.get('a[href*="about"]').click()
    cy.url().should('include', '/about')
    cy.get('h1').contains('About')
  })
  it('should navigate to the releases page', () => {
    cy.visit('http://localhost:3000/')
    cy.get('a[href*="releases"]').click()
    cy.url().should('include', '/releases')
    cy.get('h1').contains('Releases')
  })
  it('should navigate to the radar page', () => {
    cy.visit('http://localhost:3000/')
    cy.get('a[href*="technology-radar"]').click()
    cy.url().should('include', '/technology-radar')
  })
})

// Prevent TypeScript from reading file as legacy script
export { }
