describe('Main Page', () => {
  it('"모집 마감 안보기" 문구가 보인다', () => {
    cy.visit('/');

    cy.contains('모집 마감 안보기');
  });
});
