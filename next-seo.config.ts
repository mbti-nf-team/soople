import { DefaultSeoProps } from 'next-seo';

const defaultTitle = '스터디와 사이드 프로젝트, soople';
const defaultDescription = '스터디와 사이드 프로젝트 수플과 함께 시작하세요!';
const defaultUrl = process.env.NEXT_PUBLIC_ORIGIN;

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
    images: [
      {
        url: `${defaultUrl}/meta_tag_default_image.png`,
        width: 1200,
        height: 630,
        alt: defaultTitle,
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
  },
};

export default defaultNextSeoConfig;
