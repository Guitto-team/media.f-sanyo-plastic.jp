import React from 'react';
import styles from './index.module.scss';
import classnames from 'classnames';

export interface CategoryProps {
  content: any,
  pcSize?: 'small' | 'medium' | 'large',
  spSize?: 'small' | 'medium' | 'large',
}

export const Category: React.FC<CategoryProps> = ({
  content,
  pcSize = 'medium',
  spSize = 'medium',
}) => {
  return (
    <span className={classnames(styles.Category, styles[`${pcSize}-pc`], styles[`${spSize}-sp`])}>
      {content}
    </span>
  );
}

export default React.memo(Category);