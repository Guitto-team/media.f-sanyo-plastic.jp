import React from 'react';
import styles from './index.module.scss';
import classnames from 'classnames';
import Card from 'components/ui-parts/card';
import { CardProps } from 'components/ui-parts/card';

export interface CardListProps {
  contents: any,
  columnPc?: 'col1' | 'col2' | 'col3',
  columnSp?: 'col1' | 'col2' | 'col3',
  cardProps?: Omit<CardProps, 'content'>
}

export const CardList: React.FC<CardListProps> = ({
  contents,
  columnPc = 'col2',
  columnSp = 'col1',
  cardProps,
}) => {
  return (
    <ul className={classnames(styles.CardList, styles[`${columnSp}-sp`], styles[`${columnPc}-pc`])}>
      {contents.map((content) => (
        <li key={content.id}>
          <Card content={content} {...cardProps} />
        </li>
      ))}
    </ul>
  );
}

export default React.memo(CardList);