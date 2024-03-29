import { useRouter } from 'next/router';

import { fireEvent, render, screen } from '@testing-library/react';

import { groupsConditionState } from '@/recoil/group/atom';
import InjectTestingRecoilState from '@/test/InjectTestingRecoilState';
import RecoilObserver from '@/test/RecoilObserver';
import { filteredWithSanitizeHtml } from '@/utils/filter';

import GROUP_FIXTURE from '../../../fixtures/group';

import DetailContentsSection from './DetailContentsSection';

jest.mock('@/utils/filter');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('DetailContentsSection', () => {
  const mockPush = jest.fn();
  const handleClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
    }));

    (filteredWithSanitizeHtml as jest.Mock).mockImplementation(() => GROUP_FIXTURE.content);
  });

  const renderDetailContentsSection = () => render((
    <InjectTestingRecoilState>
      <>
        <RecoilObserver node={groupsConditionState} onChange={handleClick} />
        <DetailContentsSection
          group={{
            ...GROUP_FIXTURE,
            tags: ['javascript'],
            thumbnail: '/image/test',
            message: given.message,
          }}
          isGroupMember={given.isGroupMember}
        />
      </>
    </InjectTestingRecoilState>
  ));

  describe('태그를 클릭한다', () => {
    it('클릭 이벤트가 호출해야만 한다', () => {
      renderDetailContentsSection();

      fireEvent.click(screen.getByText('#javascript'));

      expect(handleClick).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('해당 글의 내용이 나타나야만 한다', () => {
    const { container } = renderDetailContentsSection();

    expect(container).toHaveTextContent('content');
    expect(container).toHaveTextContent('javascript');
  });

  context('isGroupMember가 true인 경우', () => {
    given('isGroupMember', () => true);

    context('메시지가 존재하는 경우', () => {
      given('message', () => '메시지');

      it('"멤버들에게 보내는 메시지"가 나타나야만 한다', () => {
        const { container } = renderDetailContentsSection();

        expect(container).toHaveTextContent('멤버들에게 보내는 메시지');
      });
    });

    context('메시지가 존재하지 않는 경우', () => {
      given('message', () => '');

      it('"멤버들에게 보내는 메시지가 없어요."가 나타나야만 한다', () => {
        const { container } = renderDetailContentsSection();

        expect(container).toHaveTextContent('멤버들에게 보내는 메시지가 없어요.');
      });
    });
  });
});
