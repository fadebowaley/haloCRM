import { Metadata } from 'next';
import logoImg from '@public/logo.svg';
import { LAYOUT_OPTIONS } from '@/config/enums';
import logoIconImg from '@public/logo-short.svg';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'Halo - CRM for Data Insight and Artificial Intelligence',
  description: `Halo is a powerful CRM app designed for data insight 
  and artificial intelligence, featuring a wide range of tools to enhance 
  productivity and streamline your workflow.`,
  logo: logoImg,
  icon: logoIconImg,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.BERYLLIUM,
  // TODO: favicon
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - Halo CRM` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - Halo CRM` : title,
      description,
      url: 'https://isomorphic-furyroad.vercel.app',
      siteName: 'Halo CRM', // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: 'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/itemdep/isobanner.png',
        width: 1200,
        height: 630,
      },
      locale: 'en_US',
      type: 'website',
    },
  };
};
