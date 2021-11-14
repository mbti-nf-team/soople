describe('sample', () => {
  it('Finds the content "Welcome to Next.js!"', () => {
    cy.visit('/');

    cy.contains('Welcome to Next.js!');
  });
});
