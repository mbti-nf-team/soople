describe('Main Page', () => {
  context('로그인 하지 않은 경우', () => {
    context('"시작하기" 버튼을 클릭하면', () => {
      it('로그인 팝업창이 나타나며 "소셜 계정으로 계속하기" 문구가 보인다', () => {
        cy.visit('/');

        cy.contains('button', '시작하기').click();

        cy.contains('소셜 계정으로 계속하기');
      });
    });
  });
});
