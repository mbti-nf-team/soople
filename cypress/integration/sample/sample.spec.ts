describe('sample', () => {
  it('Finds the content "버튼"', () => {
    cy.visit('/');

    cy.contains('버튼');
  });
});
