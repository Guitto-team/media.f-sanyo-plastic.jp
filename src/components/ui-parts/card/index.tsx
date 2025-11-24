import React from 'react';
import Link from 'next/link';
import styles from './index.module.scss';
import classnames from 'classnames';
import { Eyecatch } from '../eyecatch';
import { Typography } from '../typography';
import { Flex } from 'components/foundation/flex';
import { Category } from '../category';
import { formatPublishedDate, isWithinOneMonth } from 'utils/formatDate';
import { Tag } from '../tag';

export interface BlogContent {
  id: string;
  title: string;
  eyecatch?: {
    url: string;
    height?: number;
    width?: number;
  };
  publishedAt: string;
  category: {
    name: string;
  };
  tag?: Array<{
    id: string;
    name: string;
  }>;
}

export interface CardProps {
  content: BlogContent;
  info?: 'title' | 'full';
  cardType?: 'row' | 'column';
  spSize?: 'small' | 'medium' | 'large';
  pcSize?: 'small' | 'medium' | 'large';
}

interface CardBodyProps {
  content: BlogContent;
  info: 'title' | 'full';
  cardType: 'row' | 'column';
  published: string;
  spSize?: 'small' | 'medium' | 'large';
  pcSize?: 'small' | 'medium' | 'large';
}

const CardBody: React.FC<CardBodyProps> = ({ content, info, cardType, published, spSize, pcSize }) => {
  if (info === 'title') {
    return (
      <Typography html='p' weight='bold'>
        <span className={styles.title}>{content.title}</span>
      </Typography>
    );
  }

  const isRowFull = cardType === 'row' && info === 'full';
  const isColumnFull = cardType === 'column' && info === 'full';
  const justifyContent = isColumnFull ? 'j-between' : 'j-flex-start';

  return (
    <>
      {isRowFull && (
        <>
          <p className={styles.publishedAt}>{published}</p>
          <h3 className={styles.title}>{content.title}</h3>
        </>
      )}
      <Flex
        justifyContent={justifyContent}
        alignItems='a-center'
        gap='xsmall'
        flexWrap='wrap'
      >
        <Category content={content.category.name} pcSize={pcSize} spSize={spSize} />
        {cardType === 'row' && content.tag && (
          content.tag.map((content) => (
            <Tag key={content.id} content={content} spSize={spSize} pcSize={pcSize} />
          ))
        )}
        {isColumnFull && <p className={styles.publishedAt}>{published}</p>}
      </Flex>
      {isColumnFull && <h3 className={styles.title}>{content.title}</h3>}
    </>
  );
};

export const Card: React.FC<CardProps> = ({
  content,
  info = 'title',
  cardType = 'column',
  spSize = 'medium',
  pcSize = 'medium',
}) => {
  const published = formatPublishedDate(content.publishedAt);
  const isNew = isWithinOneMonth(content.publishedAt);

  return (
    <div
      className={classnames(styles.card, {
        [styles.full]: info === 'full',
        [styles.row]: cardType === 'row',
        [styles[`${spSize}-sp`]]: spSize,
        [styles[`${pcSize}-pc`]]: pcSize,
      })}
    >
      <div className={styles.head}>
        {isNew && <span className={styles.newBadge}>NEW</span>}
        <Eyecatch eyecatch={content.eyecatch} alt={content.title} aspectRatio={cardType === 'row' ? 'ar2' : 'ar3'} />
      </div>
      <div className={styles.body}>
        <CardBody
          content={content}
          info={info}
          cardType={cardType}
          published={published}
          spSize={spSize}
          pcSize={pcSize}
        />
      </div>
      <Link href={`/blog/${content.id}`} scroll={false} className={styles.link} />
    </div>
  );
};

export default React.memo(Card);
