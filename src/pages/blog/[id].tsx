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
import { motion, useScroll } from 'motion/react'
import { Typography } from 'components/ui-parts/typography';
import { Eyecatch } from 'components/ui-parts/eyecatch';
import { Category } from 'components/ui-parts/category';
import { TwitterShareButton, FacebookShareButton, LineShareButton, PinterestShareButton, TwitterIcon, FacebookIcon, LineIcon, PinterestIcon } from "react-share";
import { formatPublishedDate } from 'utils/formatDate';
import Tag from 'components/ui-parts/tag';

export default function BlogId({ blog, categoryBlogs, category, tag }) {

  // 投稿日時の変換
  const published = formatPublishedDate(blog?.publishedAt);

  // 共有用URLを取得
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  // 構造化データ（JSON-LD）
  const structuredData = blog ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title || '',
    "description": blog.description || '',
    "image": blog.eyecatch?.url || '',
    "author": {
      "@type": "Organization",
      "name": "福島三洋プラスチック工業株式会社"
    },
    "publisher": {
      "@type": "Organization",
      "name": "福島三洋プラスチック工業株式会社",
      "logo": {
        "@type": "ImageObject",
        "url": "https://media.f-sanyo-plastic.jp/images/logo.png"
      }
    },
    "datePublished": blog.publishedAt || '',
    "dateModified": blog.updatedAt || '',
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": shareUrl
    }
  } : null;

  return blog && (
    <>
      <Seo
        title={blog.title}
        description={blog.description}
        imageUrl={blog.eyecatch?.url}
        article={true}
        publishedTime={blog.publishedAt}
        modifiedTime={blog.updatedAt}
        author="福島三洋プラスチック工業株式会社"
        tags={blog.tag?.map(tag => tag.name) || []}
      />

      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}

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
              <Flex justifyContent='j-flex-start' alignItems='a-center' gap='xsmall' flexWrap='wrap'>
                {blog.category && <Category content={blog.category.name} />}
                {blog.tag.map((content) => (
                  <Tag key={content.id} content={content} />
                ))}
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
                  <CardList
                    contents={categoryBlogs}
                    columnPc='col3'
                    columnSp='col2'
                    cardProps={{
                      cardType: 'column',
                      info: 'title',
                      spSize: 'small',
                      pcSize: 'medium'
                    }}
                  />
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
  try {
    const data = await client.get({ endpoint: 'blog' });

    if (!data || !data.contents) {
      return {
        paths: [],
        fallback: true,
      };
    }

    const paths = data.contents.map((content) => `/blog/${content.id}`);
    return {
      paths,
      fallback: true
    };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return {
      paths: [],
      fallback: true,
    };
  }
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  try {
    const id = context.params.id;

    // ブログデータの取得
    const data = await client.get({ endpoint: 'blog', contentId: id });

    // データが存在しない場合は404を返す
    if (!data) {
      return {
        notFound: true,
      };
    }

    // 同じカテゴリーの記事の取得
    let category = { contents: [] };
    if (data.category && data.category.id) {
      category = await client.get({
        endpoint: 'blog',
        queries: { filters: `category[equals]${data.category.id}[and]id[not_equals]${id}` },
      });
    }

    // カテゴリーデータの取得
    const categoryData = await client.get({ endpoint: 'categories' });

    // タグデータの取得
    const tagData = await client.get({ endpoint: 'tags' });

    return {
      props: {
        blog: data,
        categoryBlogs: category.contents || [],
        category: categoryData.contents || [],
        tag: tagData.contents || [],
      },
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      notFound: true,
    };
  }
};
