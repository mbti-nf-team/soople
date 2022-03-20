import { render, screen } from '@testing-library/react';

import SkeletonItem from './SkeletonItem';

describe('SkeletonItem', () => {
  const dataTestId = 'skeleton-item';

  const renderSkeletonItem = () => render((
    <SkeletonItem
      circle={given.circle}
      data-testid={dataTestId}
    />
  ));

  context('circle이 true인 경우', () => {
    given('circle', () => true);

    it('border-radius 속성은 "50%"가 되야만 한다', () => {
      renderSkeletonItem();

      expect(screen.getByTestId(dataTestId)).toHaveStyle({
        borderRadius: '50%',
      });
    });
  });

  context('circle이 true가 아닌 경우', () => {
    given('circle', () => false);

    it('border-radius 속성은 "4px"이 되야만 한다', () => {
      renderSkeletonItem();

      expect(screen.getByTestId(dataTestId)).toHaveStyle({
        borderRadius: '4px',
      });
    });
  });
});
