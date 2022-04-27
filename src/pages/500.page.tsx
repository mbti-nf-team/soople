import { ReactElement } from 'react';

import { NextSeo } from 'next-seo';

import EmptyStateArea from '@/components/common/EmptyStateArea';
import HeaderWrapper from '@/components/common/HeaderWrapper';

import UnknownErrorIcon from '../assets/icons/img_500.svg';

function Custom500(): ReactElement {
  return (
    <>
      <NextSeo
        title="Conners - 500"
      />
      <HeaderWrapper
        hasBackground
        isScrollTop
      />
      <EmptyStateArea
        svg={<UnknownErrorIcon />}
        emptyText="알 수 없는 오류가 발생했어요."
        buttonText="홈으로"
        href="/"
        marginTop="80px"
      />
    </>
  );
}

export default Custom500;
