import { TypeAnimation } from 'react-type-animation';

import styled from '@emotion/styled';

import { h1Font, h2Font } from '@/styles/fontStyles';
import Layout from '@/styles/Layout';
import { mobileMediaQuery, mq2 } from '@/styles/responsive';

function BrandingTypeAnimation() {
  return (
    <div style={{ backgroundColor: '#ffffff', marginBottom: '25px' }}>
      <BrandingTypeAnimationLayout>
        <TypeAnimation
          sequence={[
            '스터디 멤버를',
            1000,
            '프로젝트 멤버를',
            1000,
          ]}
          speed={50}
          wrapper="div"
          className="type-animation"
          repeat={Infinity}
        />
        <div className="addition-branding-description">
          쉽고 빠르게 모집해보세요
        </div>
      </BrandingTypeAnimationLayout>
    </div>
  );
}

export default BrandingTypeAnimation;

const BrandingTypeAnimationLayout = styled(Layout)`
  ${mobileMediaQuery} {
    ${h2Font(true)};
  }

  ${h1Font(true)};
  ${mq2({
    width: ['calc(100% - 40px)', 'calc(100% - 40px)', 'calc(100% - 40px)', '800px', '1040px'],
  })};

  padding-top: 84px;
  padding-bottom: 148px;
  height: 336px;
  box-sizing: border-box;

  .type-animation::after {
    font-weight: 400;
    color: ${({ theme }) => theme.accent4};
  }
`;
