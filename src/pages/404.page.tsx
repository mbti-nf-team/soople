import { ReactElement } from 'react';

import { NextSeo } from 'next-seo';

import EmptyStateArea from '@/components/common/EmptyStateArea';
import HeaderWrapper from '@/components/common/HeaderWrapper';

import NotFoundIcon from '../assets/icons/img_404.svg';

function Custom404(): ReactElement {
  return (
    <>
      <NextSeo
        title="404 - soople"
      />
      <HeaderWrapper
        hasBackground
        isScrollTop
      />
      <EmptyStateArea
        svg={<NotFoundIcon />}
        emptyText="페이지가 존재하지 않아요."
        buttonText="홈으로"
        href="/"
        marginTop="80px"
      />
    </>
  );
}

export default Custom404;
