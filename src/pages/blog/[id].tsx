import React, { Component } from 'react';
import { client } from 'libs/client';
import styles from './index.module.scss';
import Header from 'components/ui-projects/header';
import Footer from 'components/ui-projects/footer';
import Sidebar from 'components/ui-projects/sidebar';
import { Main } from 'components/ui-projects/main';
import LayoutInner from 'components/foundation/layout-inner';
import LayoutStack from 'components/foundation/layout-stack';
import { Flex } from 'components/foundation/flex';
import Seo from 'components/foundation/seo';
import { CardList } from 'components/ui-projects/card-list';
import { TagList } from 'components/ui-projects/tag-list';
import { motion, useScroll } from 'framer-motion'
import { Typography } from 'components/ui-parts/typography';
import { Eyecatch } from 'components/ui-parts/eyecatch';
import { Category } from 'components/ui-parts/category';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { TwitterShareButton, FacebookShareButton, LineShareButton, PinterestShareButton, TwitterIcon, FacebookIcon, LineIcon, PinterestIcon } from "react-share";

export default function BlogId({ blog, recommendBlogs, categoryBlogs, category, tag }) {

  // 投稿日時の変換
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const published = blog && dayjs.utc(blog.publishedAt)?.tz('Asia/Tokyo').format('YYYY.MM.DD');

  // 共有用URLを取得
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return blog && (
    <>
      <Seo
        title={blog.title}
        description={blog.description}
        imageUrl={blog.eyecatch?.url}
      />

      <Header />
      <Sidebar categories={category} tags={tag} />

      <Main>

        <LayoutStack margin='s5'>

          <LayoutInner size='medium'>
            <LayoutStack>
              <motion.div
                initial={{ opacity: 0, y: 50 }} // 初期状態
                animate={{ opacity: 1, y: 0 }} // マウント時
                exit={{ opacity: 0, y: -50 }}    // アンマウント時
                transition={{ duration: 0.5 }}
              >
                <Typography html='h1'>{blog.title}</Typography>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }} // 初期状態
                animate={{ opacity: 1, x: 0 }} // マウント時
                exit={{ opacity: 0, x: 50 }}    // アンマウント時
                transition={{ duration: 0.5 }}
              >
                <Flex justifyContent='j-flex-end' gap='xsmall'>
                  <p className={styles.publishedAt}>{published}</p>

                  <FacebookShareButton url={shareUrl} quote={blog.title}>
                    <FacebookIcon size={30} round={true} />
                  </FacebookShareButton>

                  <TwitterShareButton url={shareUrl} title={blog.title}>
                    <TwitterIcon size={30} round={true} />
                  </TwitterShareButton>


                  <PinterestShareButton url={shareUrl} title={blog.title} media={blog.eyecatch}>
                    <PinterestIcon size={30} round={true} />
                  </PinterestShareButton>

                  <LineShareButton url={shareUrl} title={blog.title}>
                    <LineIcon size={30} round={true} />
                  </LineShareButton>
                </Flex>
              </motion.div>
                {/* {blog.recommend && (<span className={styles.recommend}>おすすめ</span>)} */}
              
            </LayoutStack>
          </LayoutInner>

          {blog.eyecatch && (
            <LayoutInner size='large'>
              <LayoutStack>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }} // 初期状態
                  animate={{ opacity: 1, scale: 1 }} // マウント時
                  exit={{ opacity: 0, scale: 0.9 }}    // アンマウント時
                  transition={{ duration: 0.5 }}
                >
                  <div className={styles.eyecatch}>
                    <Eyecatch eyecatch={blog.eyecatch} alt={blog.title} objectFit='contain' />
                  </div>
                </motion.div>
              </LayoutStack>
            </LayoutInner>
          )}

          <LayoutInner size='medium'>
            <motion.div
              initial={{ opacity: 0, y: 50 }} // 初期状態
              animate={{ opacity: 1, y: 0 }} // マウント時
              exit={{ opacity: 0, y: -50 }}    // アンマウント時
              transition={{ duration: 0.5 }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: `${blog.content}`,
                }}
                className={styles.post}
              />

            </motion.div>
          </LayoutInner>

          <LayoutInner size='medium'>
            <LayoutStack>
              <Flex justifyContent='j-flex-start' alignItems='a-center' gap='small' flexWrap='wrap'>
                {blog.category && <Category content={blog.category.name} />}
                <TagList contents={blog.tag} />
              </Flex>

              <Flex justifyContent='j-flex-end' gap='xsmall'>
                <FacebookShareButton url={shareUrl} quote={blog.title}>
                  <FacebookIcon size={30} round={true} />
                </FacebookShareButton>

                <TwitterShareButton url={shareUrl} title={blog.title}>
                  <TwitterIcon size={30} round={true} />
                </TwitterShareButton>


                <PinterestShareButton url={shareUrl} title={blog.title} media={blog.eyecatch}>
                  <PinterestIcon size={30} round={true} />
                </PinterestShareButton>

                <LineShareButton url={shareUrl} title={blog.title}>
                  <LineIcon size={30} round={true} />
                </LineShareButton>
              </Flex>

            </LayoutStack>
          </LayoutInner>

          <LayoutInner size='large'>
            <LayoutStack margin='s5'>
              {categoryBlogs.length > 0 && (
                <LayoutStack margin='s3'>
                  <Typography html='h3' textAlign='left'>同じカテゴリーの記事</Typography>
                  <CardList contents={categoryBlogs} />
                </LayoutStack>
              )}
              {recommendBlogs.length > 0 && (
                <LayoutStack margin='s3'>
                  <Typography html='h3' textAlign='left'>おすすめ記事</Typography>
                  <CardList contents={recommendBlogs} />
                </LayoutStack>
              )}
            </LayoutStack>
          </LayoutInner>

        </LayoutStack>


      </Main>
      <Footer />

    </>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: 'blog' });

  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: true };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: 'blog', contentId: id });
  const recommend = await client.get({
    endpoint: 'blog',
    queries: { filters: `recommend[equals]true[and]id[not_equals]${id}` },
  });
  const categoryId = data.category.id;
  const category = await client.get({
    endpoint: 'blog',
    queries: { filters: `category[equals]${categoryId}[and]id[not_equals]${id}` },
  });
  const categoryData = await client.get({ endpoint: 'categories' });
  const tagData = await client.get({ endpoint: 'tags' });

  return {
    props: {
      blog: data,
      recommendBlogs: recommend.contents,
      categoryBlogs: category.contents,
      category: categoryData.contents,
      tag: tagData.contents,
    },
  };
};
