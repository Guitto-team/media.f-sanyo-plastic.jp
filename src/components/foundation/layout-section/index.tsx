import React from 'react'
import classnames from 'classnames'
import styles from './index.module.scss'

export interface LayoutSectionProps {
  backgroundColor?: 'none' | 'lightbrown' | 'white',
  children: React.ReactNode,
}

export const LayoutSection: React.FC<LayoutSectionProps> = ({
   backgroundColor = 'none',
   children,
  }) => {
    const classProps:string = classnames(styles.LayoutSection, styles[backgroundColor])
  return (
    <section className={classProps}>
      {children}
    </section>
  );
}

export default React.memo(LayoutSection);