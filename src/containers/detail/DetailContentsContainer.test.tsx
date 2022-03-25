import { render } from '@testing-library/react';

import useFetchApplicants from '@/hooks/api/applicant/useFetchApplicants';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useFetchGroup from '@/hooks/api/group/useFetchGroup';

import FIXTURE_APPLICANT from '../../../fixtures/applicant';
import GROUP_FIXTURE from '../../../fixtures/group';
import FIXTURE_PROFILE from '../../../fixtures/profile';

import DetailContentsContainer from './DetailContentsContainer';

jest.mock('@/hooks/api/group/useFetchGroup');
jest.mock('@/hooks/api/applicant/useFetchApplicants');
jest.mock('@/hooks/api/auth/useFetchUserProfile');
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    push: jest.fn(),
  })),
}));

describe('DetailContentsContainer', () => {
  beforeEach(() => {
    (useFetchGroup as jest.Mock).mockImplementation(() => ({
      data: given.group,
    }));
    (useFetchApplicants as jest.Mock).mockImplementation(() => ({
      data: [FIXTURE_APPLICANT],
    }));
    (useFetchUserProfile as jest.Mock).mockImplementation(() => ({
      data: FIXTURE_PROFILE,
    }));
  });

  const renderDetailContentsContainer = () => render((
    <DetailContentsContainer />
  ));

  context('모집완료되지 않은 글인 경우', () => {
    given('group', () => GROUP_FIXTURE);

    it('"멤버들에게 보내는 메시지"가 나타나지 않아야만 한다', () => {
      const { container } = renderDetailContentsContainer();

      expect(container).not.toHaveTextContent('멤버들에게 보내는 메시지');
    });
  });

  context('모집완료된 글이고 작성자이거나 승인된 팀원인 경우', () => {
    given('group', () => ({
      ...GROUP_FIXTURE,
      isCompleted: true,
    }));

    it('"멤버들에게 보내는 메시지"가 나타나야만 한다', () => {
      const { container } = renderDetailContentsContainer();

      expect(container).toHaveTextContent('멤버들에게 보내는 메시지');
    });
  });
});
