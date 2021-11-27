describe('sample', () => {
  it('Finds the content "홈"', () => {
    cy.visit('/');

    cy.contains('홈');
  });
});
