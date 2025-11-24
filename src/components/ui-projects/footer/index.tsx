import React from 'react';
import styles from './index.module.scss';
import Image from 'next/image';
import Link from 'next/link';

type FooterProps = {
  lightbrownBackground?: boolean;
};

export default function Footer({ lightbrownBackground = false }: FooterProps) {
  const footerClassNames = [styles.footer];
  if (lightbrownBackground) {
    footerClassNames.push(styles.footerLightbrown);
  }

  return (
    <footer className={footerClassNames.join(' ')}>
      <div className={styles.footerContainer}>
        <div className={styles.footerInner}>
          <figure className={styles.logo}>
            <Image
              src={'/images/sun-pla-logo.svg'}
              alt={'SUN-PLA'}
              width={202}
              height={59}
            />
          </figure>
          <ul className={styles.bannerList}>
            <li className={styles.bannerItem}>
              <Link
                href={`https://www.f-sanyo-plastic.jp/`}
                scroll={false}
                className={styles.banner}
                target='_blank'
              >
                <Image src={'/images/banner-official.webp'} alt={'公式バナー'} width={189} height={90} />
              </Link>
            </li>
            <li className={styles.bannerItem}>
              <Link
                href={`https://bekopla.mirai-work.org/`}
                scroll={false}
                className={styles.banner}
                target='_blank'
              >
                <Image src={'/images/banner-online-shop.webp'} alt={'公式オンラインショップバナー'} width={159} height={90} />
              </Link>
            </li>
          </ul>
          <p className={styles.copyright}>Copyright (c) fukushima sanyo plastic, Inc. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}