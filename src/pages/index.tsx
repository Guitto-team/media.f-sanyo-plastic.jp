import React, { useState, useEffect } from 'react';
import { client } from 'libs/client';
import Header from 'components/ui-projects/header';
import Footer from 'components/ui-projects/footer';
import Sidebar from 'components/ui-projects/sidebar';
import { Main } from 'components/ui-projects/main';
import LayoutInner from 'components/foundation/layout-inner';
import LayoutStack from 'components/foundation/layout-stack';
import LayoutSection from 'components/foundation/layout-section';
import Seo from 'components/foundation/seo';
import { CardList } from 'components/ui-projects/card-list';
import { motion } from 'framer-motion'
import { Pagination } from 'components/ui-projects/pagination';
import { Typography } from 'components/ui-parts/typography';
import { TagList } from 'components/ui-projects/tag-list';
import { Carousel } from 'components/ui-projects/carousel';
import styles from './index.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import classnames from 'classnames';
import router from 'next/router';

export default function Home({
  limit,
  newlyBlogs,
  recommendBlogs,
  newlyTotalCount,
  recommendTotalCount,
  categories,
  tags
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 記事を取得する関数
  const fetchBlogs = async (categoryId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/recommend-blogs?categoryId=${categoryId}`);
      const data = await response.json();
      setFilteredBlogs(data.blogs || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setFilteredBlogs([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 初期表示時にALLタブの記事を取得
  useEffect(() => {
    fetchBlogs('ALL');
  }, []);

  // カテゴリーが変更されたときに記事を取得
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    fetchBlogs(categoryId);
  };

  const moreButtonClick = () => {
    if (selectedCategory === 'ALL') {
      const newly = document.getElementById('newly');
      // headerの高さを引く
      const headerHeight = document.querySelector('header').offsetHeight;
      const newlyTop = newly.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: newlyTop, behavior: 'smooth' });
    } else {
      const href = `/category/${selectedCategory}`;
      router.push(href);
    }
  };

  return (
    <>
      <Seo />

      <Header />
      <Sidebar categories={categories} tags={tags} />
      <Main noPadding>
        <div className={styles.carouselContainer}>
          <motion.div
            initial={{ opacity: 0, y: "10%" }} // 初期状態
            whileInView={{ opacity: 1, y: "0%" }} // マウント時
            exit={{ opacity: 0, y: "10%" }}    // アンマウント時
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Carousel contents={recommendBlogs} />
          </motion.div>
        </div>

        <LayoutSection backgroundColor='none'>
          <LayoutInner size='large'>

            {/* カテゴリー別タブナビゲーション */}
            <motion.div
              initial={{ opacity: 0, y: "10%" }} // 初期状態
              whileInView={{ opacity: 1, y: "0%" }} // マウント時
              exit={{ opacity: 0, y: "10%" }}    // アンマウント時
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className={styles.titlePickup}>PICKUP<span>以下ダミーテキスト以下ダミーテキスト</span></h2>

              <div className={styles.tabNavigation}>
                <button
                  className={classnames(styles.tab, selectedCategory === 'ALL' && styles.isActive)}
                  onClick={() => handleCategoryChange('ALL')}
                  disabled={isLoading}
                >
                  ALL
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={classnames(styles.tab, selectedCategory === category.id && styles.isActive)}
                    onClick={() => handleCategoryChange(category.id)}
                    disabled={isLoading}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* カテゴリー別記事一覧 */}
              {isLoading ? (
                <Typography>読み込み中...</Typography>
              ) : filteredBlogs.length > 0 ? (

                <CardList contents={filteredBlogs} columnPc='col3' columnSp='col1' cardProps={{ cardType: 'column', info: 'full' }} />
              ) : (
                <Typography>該当する記事がありません</Typography>
              )}

              <button onClick={moreButtonClick} className={styles.moreButton}>
                + もっと見る
              </button>
            </motion.div>

          </LayoutInner>
        </LayoutSection>

        <LayoutSection backgroundColor='lightbrown'>
          <motion.div
            initial={{ opacity: 0, y: "10%" }} // 初期状態
            whileInView={{ opacity: 1, y: "0%" }} // マウント時
            exit={{ opacity: 0, y: "10%" }}    // アンマウント時
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <LayoutInner size='large'>
              <div className={styles.newlyGrid}>
                <LayoutStack margin='s6'>
                  <div className={styles.tagContainer}>
                    <h2 className={styles.titleLg}>タグから探す</h2>
                    <TagList contents={tags} justifyContent='j-flex-start' />
                  </div>

                  <div className={styles.newlyContainer}>
                    <div id='newly'>
                      <h2 className={styles.title}>新着<span>以下ダミーテキスト以下ダミーテキスト</span></h2>
                    </div>

                    <CardList contents={newlyBlogs} columnPc='col1' columnSp='col2' cardProps={{ cardType: 'row', info: 'full', spSize: 'small' }} />
                  </div>
                </LayoutStack>

                <div className={styles.bannerContainer}>
                  <ul className={styles.bannerList}>
                    <li className={styles.bannerItem}>
                      <Link
                        href={`https://www.f-sanyo-plastic.jp/`}
                        scroll={false}
                        className={styles.banner}
                        target='_blank'
                      >
                        <Image src={'/images/banner-official.webp'} alt={'公式バナー'} width={300} height={141} />
                      </Link>
                    </li>
                    <li className={styles.bannerItem}>
                      <Link
                        href={`https://bekopla.mirai-work.org/`}
                        scroll={false}
                        className={styles.banner}
                        target='_blank'
                      >
                        <Image src={'/images/banner-online-shop.webp'} alt={'公式オンラインショップバナー'} width={300} height={171} />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className={styles.paginationContainer}>
                <Pagination currentPageNumber={1} maxPageNumber={Math.ceil(newlyTotalCount / limit)} />
              </div>
            </LayoutInner>
          </motion.div>
        </LayoutSection>
      </Main>
      <Footer lightbrownBackground />

    </>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const offset = 0;
  const limit = 10;
  const newlyQueries = { offset: offset, limit: limit };
  const newlyData = await client.get({ endpoint: 'blog', queries: newlyQueries });

  // recommend=trueの記事を取得
  const recommendQueries = { offset: 0, limit: 6, filters: 'recommend[equals]true' };
  const recommendData = await client.get({ endpoint: 'blog', queries: recommendQueries });

  const categoryData = await client.get({ endpoint: 'categories' });
  const tagData = await client.get({ endpoint: 'tags' });

  return {
    props: {
      limit: limit,
      newlyBlogs: newlyData.contents,
      recommendBlogs: recommendData.contents,
      newlyTotalCount: newlyData.totalCount,
      recommendTotalCount: recommendData.totalCount,
      categories: categoryData.contents,
      tags: tagData.contents,
    },
  };
};
