import React, { Component } from 'react';
import { client } from 'libs/client';
import Header from 'components/ui-projects/header';
import Footer from 'components/ui-projects/footer';
import Sidebar from 'components/ui-projects/sidebar';
import { Main } from 'components/ui-projects/main';
import LayoutInner from 'components/foundation/layout-inner';
import LayoutStack from 'components/foundation/layout-stack';
import Seo from 'components/foundation/seo';
import { CardList } from 'components/ui-projects/card-list';
import { motion } from 'framer-motion'
import { Pagination } from 'components/ui-projects/pagination';

export default function Home({ blogs, totalCount, category, tag }) {
  return (
    <>
      <Seo />

      <Header />
      <Sidebar categories={category} tags={tag} />
      <Main>
        <LayoutInner size='large'>
          <LayoutStack>
            <motion.div
              initial={{ opacity: 0, y: "10%" }} // 初期状態
              whileInView={{ opacity: 1, y: "0%" }} // マウント時
              exit={{ opacity: 0, y: "10%" }}    // アンマウント時
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <CardList contents={blogs} size="large" />
            </motion.div>
            <Pagination currentPageNumber={1} maxPageNumber={Math.ceil(totalCount / 5)} />
          </LayoutStack>
        </LayoutInner>
      </Main>
      <Footer />

    </>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const offset = 0;
  const limit = 5;
  const queries = { offset: offset, limit: limit };
  const data = await client.get({ endpoint: 'blog', queries: queries });
  const categoryData = await client.get({ endpoint: 'categories' });
  const tagData = await client.get({ endpoint: 'tags' });

  return {
    props: {
      blogs: data.contents,
      totalCount: data.totalCount,
      category: categoryData.contents,
      tag: tagData.contents,
    },
  };
};
