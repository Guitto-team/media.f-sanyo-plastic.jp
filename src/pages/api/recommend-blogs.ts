import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from 'libs/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { categoryId } = req.query;

    // フィルター条件を構築
    let filters = 'recommend[equals]true';
    if (categoryId && categoryId !== 'ALL') {
      filters = `recommend[equals]true[and]category[equals]${categoryId}`;
    }

    // 記事を取得（新着順でソート、6件まで）
    const data = await client.get({
      endpoint: 'blog',
      queries: {
        filters: filters,
        limit: 6,
        orders: '-publishedAt', // 新着順
      },
    });

    return res.status(200).json({ blogs: data.contents });
  } catch (error) {
    console.error('Error fetching recommend blogs:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

