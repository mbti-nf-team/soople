import { render, screen } from '@testing-library/react';

import { lightTheme } from '@/styles/theme';
import MockTheme from '@/test/MockTheme';

import Label from './Label';

describe('Label', () => {
  const renderLabel = () => render((
    <MockTheme>
      <Label
        labelText="label"
        labelOptionText="optionText"
        isError={given.isError}
      />
    </MockTheme>
  ));

  context('error가 존재하는 경우', () => {
    given('isError', () => true);

    it(`label 색상이 ${lightTheme.warning}이어야만 한다`, () => {
      renderLabel();

      expect(screen.getByTestId('label')).toHaveStyle({
        color: lightTheme.warning,
      });
    });
  });

  context('error가 존재하지 않는 경우', () => {
    given('isError', () => false);

    it(`label 색상이 ${lightTheme.accent6}이어야만 한다`, () => {
      renderLabel();

      expect(screen.getByTestId('label')).toHaveStyle({
        color: lightTheme.accent6,
      });
    });
  });
});
