import { TypeAnimation } from 'react-type-animation';

import styled from '@emotion/styled';

import HeaderContainer from '@/containers/common/HeaderContainer';
import Layout from '@/styles/Layout';

function test() {
  return (
    <>
      <HeaderContainer />
      <TestLayout>
        <TypeAnimation
          sequence={[
            '스터디 멤버를',
            1000,
            '프로젝트 멤버를',
            1000,
          ]}
          speed={50}
          style={{
            fontWeight: 700,
            fontSize: '56px',
            lineHeight: '72px',
          }}
          wrapper="div"
          className="type-animation"
          repeat={Infinity}
        />
        <div style={{
          fontWeight: 700,
          fontSize: '56px',
          lineHeight: '72px',
        }}
        >
          쉽고 빠르게 모집해보세요
        </div>
      </TestLayout>
    </>
  );
}

export default test;

const TestLayout = styled(Layout)`
  margin-top: 120px;

  .type-animation::after {
    color: ${({ theme }) => theme.accent6};
  }
`;
