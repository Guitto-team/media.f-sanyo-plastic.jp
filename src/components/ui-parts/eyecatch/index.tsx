import React from 'react';
import styles from './index.module.scss';
import classnames from 'classnames';
import Image from 'next/image';

export interface EyecatchProps {
  eyecatch?: { url: string },
  alt: string,
  objectFit?: 'cover' | 'contain',
  aspectRatio?: 'ar1' | 'ar2' | 'ar3'
}

export const Eyecatch: React.FC<EyecatchProps> = ({
    eyecatch,
    alt,
    objectFit = 'cover',
    aspectRatio = 'ar1'
  }) => {

  const imageUrl = eyecatch?.url ?? '/images/placehold.png';

  return (
    <figure
      className={classnames(styles.eyecatch, styles[aspectRatio])}
    >
      <Image src={imageUrl} layout='fill' alt={`${alt}のアイキャッチ画像`} objectFit={objectFit} className={classnames(styles.image)} />
    </figure>
  );
}

export default React.memo(Eyecatch);