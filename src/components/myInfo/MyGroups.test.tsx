import { render, screen } from '@testing-library/react';

import FIXTURE_GROUP from '../../../fixtures/group';

import MyGroups from './MyGroups';

describe('MyGroups', () => {
  const handleClick = jest.fn();
  const lastItemRef = jest.fn();

  const MockComponent = () => <>Component</>;

  const renderMyGroups = () => render((
    <MyGroups
      onClickGroup={handleClick}
      groups={given.groups}
      refState={{
        lastItemRef,
      }}
      isLoading={given.isLoading}
    >
      <MockComponent />
    </MyGroups>
  ));

  context('로딩중인 경우', () => {
    given('groups', () => [{
      items: [FIXTURE_GROUP],
    }]);
    given('isLoading', () => true);

    it('skeleton loading이 나타나야만 한다', () => {
      renderMyGroups();

      expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument();
    });
  });

  context('group이 존재하지 않는 경우', () => {
    given('groups', () => []);

    it('자식 컴포넌트가 나타나야만 한다', () => {
      const { container } = renderMyGroups();

      expect(container).toHaveTextContent('Component');
    });
  });

  context('group이 존재하는 경우', () => {
    given('groups', () => [{
      items: [FIXTURE_GROUP],
    }]);

    it('팀에 대한 내용이 나타나야만 한다', () => {
      const { container } = renderMyGroups();

      expect(container).toHaveTextContent(FIXTURE_GROUP.title);
    });
  });
});
