import React from 'react'
import Head from 'next/head';

export interface SeoProps {
  title?: string;
  description?: string;
  imageUrl?: string;
}

export const Seo: React.FC<SeoProps> = ({
    title = '福島三洋プラスチック工業株式会社: メディアサイト',
    description = '福島三洋プラスチック工業は車載部品 ・ 弱電部品等のプラスチック成形品及び2材成形品の製造をしております。試作、量産、また塗装・メッキ・印刷等の外観品・加飾品・二次加工・組立加工までワンストップで対応可能です。単色はもちろん、樹詣成形の事なら何でもご相談下さい。',
    imageUrl = 'https://media.f-sanyo-plastic.jp/images/ogp.png'
  }) => {

  const url = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <Head>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <title key="title">{`${title} |  fukushima sanyo plastic, Inc.`}</title>
      <meta
        name='description'
        content={description}
      />
      <meta property='og:title' content={title} />
      <meta property="og:site_name" content={title} />
      <meta
        property='og:description'
        content={description}
      />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:type" content="website" />
      <link rel="canonical" href={url} />
    </Head>
  );
}

export default React.memo(Seo);