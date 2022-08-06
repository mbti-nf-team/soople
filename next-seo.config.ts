import { DefaultSeoProps } from 'next-seo';

const defaultTitle = '스터디와 사이드 프로젝트, soople';
const defaultDescription = '스터디와 사이드 프로젝트 수플과 함께 시작하세요!';
const defaultUrl = 'https://soople.io';

const defaultNextSeoConfig: DefaultSeoProps = {
  title: defaultTitle,
  description: defaultDescription,
  canonical: defaultUrl,
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: defaultUrl,
    title: defaultTitle,
    description: defaultDescription,
  },
  twitter: {
    cardType: 'summary_large_image',
  },
};

export default defaultNextSeoConfig;
