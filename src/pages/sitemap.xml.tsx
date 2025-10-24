import { GetServerSideProps } from 'next';
import { client } from 'libs/client';

const Sitemap = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = 'https://media.f-sanyo-plastic.jp';

  // ブログ記事を取得
  const blogData = await client.get({ endpoint: 'blog' });
  const blogs = blogData.contents;

  // カテゴリーデータを取得
  const categoryData = await client.get({ endpoint: 'categories' });
  const categories = categoryData.contents;

  // タグデータを取得
  const tagData = await client.get({ endpoint: 'tags' });
  const tags = tagData.contents;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${blogs.map(blog => `
  <url>
    <loc>${baseUrl}/blog/${blog.id}</loc>
    <lastmod>${new Date(blog.updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
  ${categories.map(category => `
  <url>
    <loc>${baseUrl}/category/${category.id}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
  ${tags.map(tag => `
  <url>
    <loc>${baseUrl}/tag/${tag.id}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`).join('')}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
