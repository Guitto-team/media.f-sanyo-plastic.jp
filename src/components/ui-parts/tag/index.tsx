import React from 'react';
import Link from 'next/link';
import styles from './index.module.scss';
import classnames from 'classnames';

export interface TagProps {
  content: any;
  spSize?: 'small' | 'medium' | 'large';
  pcSize?: 'small' | 'medium' | 'large';
}

export const Tag: React.FC<TagProps> = ({ content, spSize = 'medium', pcSize = 'medium' }) => {
  return (
    <Link href={`/tag/${content.id}`} scroll={false} className={classnames(styles.Tag, styles[`${spSize}-sp`], styles[`${pcSize}-pc`])}>
      #{content.name}
    </Link>
  );
};

export default React.memo(Tag);
