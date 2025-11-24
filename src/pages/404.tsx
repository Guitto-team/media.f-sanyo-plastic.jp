import React, { Component } from 'react';
import Header from 'components/ui-projects/header';
import Footer from 'components/ui-projects/footer';
import { Main } from 'components/ui-projects/main';
import LayoutInner from 'components/foundation/layout-inner';
import LayoutStack from 'components/foundation/layout-stack';
import Seo from 'components/foundation/seo';
import { Typography } from 'components/ui-parts/typography';
import Link from 'next/link';
import styles from './index.module.scss'
import { Flex } from 'components/foundation/flex';

export default function Custom404() {
  return (
    <>
      <Seo title='Not Found' />

      <Header />
      <Main>
        <LayoutInner size='small'>
          <LayoutStack>
            <Typography html='h1' textAlign='center' weight='bold'>
              404 Not Found.
            </Typography>
            <Typography html='p' textAlign='center'>
              ページが見つかりません。
            </Typography>
            <Flex justifyContent='j-center'>
              <Link href={`/`} scroll={false} className={styles.button}>
                TOPに戻る
              </Link>
            </Flex>
          </LayoutStack>
        </LayoutInner>
      </Main>
      <Footer />
    </>
  );
}