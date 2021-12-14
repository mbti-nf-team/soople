import { useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import GROUP_FIXTURE from '../../../fixtures/group';
import PROFILE_FIXTURE from '../../../fixtures/profile';

import DetailHeaderContainer from './DetailHeaderContainer';

describe('DetailHeaderContainer', () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      groupReducer: {
        group: given.group,
        writer: PROFILE_FIXTURE,
      },
    }));
  });

  const renderDetailHeaderContainer = () => render((
    <DetailHeaderContainer />
  ));

  context('group 정보가 존재하는 경우', () => {
    given('group', () => GROUP_FIXTURE);

    it('DetailHeaderContainer에 대한 내용이 나타나야만 한다', () => {
      const { container } = renderDetailHeaderContainer();

      expect(container).toHaveTextContent('title');
    });
  });

  context('group 정보가 존재하지 않는 경우', () => {
    given('group', () => null);

    it('아무것도 나타나지 말아야 한다', () => {
      const { container } = renderDetailHeaderContainer();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
