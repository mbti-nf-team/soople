import { render, screen } from '@testing-library/react';

import palette from '@/styles/palette';

import Label from './Label';

describe('Label', () => {
  const renderLabel = () => render((
    <Label
      labelText="label"
      labelOptionText="optionText"
      isError={given.isError}
    />
  ));

  context('error가 존재하는 경우', () => {
    given('isError', () => true);

    it(`label 색상이 ${palette.warning}이어야만 한다`, () => {
      renderLabel();

      expect(screen.getByTestId('label')).toHaveStyle({
        color: palette.warning,
      });
    });
  });

  context('error가 존재하지 않는 경우', () => {
    given('isError', () => false);

    it(`label 색상이 ${palette.accent6}이어야만 한다`, () => {
      renderLabel();

      expect(screen.getByTestId('label')).toHaveStyle({
        color: palette.accent6,
      });
    });
  });
});
