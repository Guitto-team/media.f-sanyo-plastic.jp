import React from 'react'
import styles from './index.module.scss'
import classnames from 'classnames';

export interface MainProps {
  children: React.ReactNode,
  noPadding?: boolean,
}

export const Main: React.FC<MainProps> = ({
  children,
  noPadding = false,
  }) => {
  return (
    <main className={classnames(styles.main, noPadding && styles.noPadding)}>
      {children}
    </main>
  );
}

export default React.memo(Main);