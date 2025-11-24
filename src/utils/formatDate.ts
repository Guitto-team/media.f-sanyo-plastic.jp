import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * 投稿日時を日本時間に変換してフォーマットする
 * @param publishedAt - 投稿日時（UTC形式の文字列）
 * @param format - フォーマット文字列（デフォルト: 'YYYY-MM-DD'）
 * @returns フォーマットされた日付文字列、またはundefined
 */
export const formatPublishedDate = (
  publishedAt: string | undefined | null,
  format: string = 'YYYY-MM-DD'
): string | undefined => {
  if (!publishedAt) {
    return undefined;
  }

  return dayjs.utc(publishedAt)?.tz('Asia/Tokyo').format(format);
};

/**
 * 投稿日時が現在から1ヶ月以内かどうかを判定する
 * @param publishedAt - 投稿日時（UTC形式の文字列）
 * @returns 1ヶ月以内の場合true、それ以外の場合false
 */
export const isWithinOneMonth = (publishedAt: string | undefined | null): boolean => {
  if (!publishedAt) return false;
  const publishedDate = dayjs.utc(publishedAt).tz('Asia/Tokyo');
  const now = dayjs().tz('Asia/Tokyo');
  const oneMonthAgo = now.subtract(1, 'month');
  return publishedDate.isAfter(oneMonthAgo);
};

