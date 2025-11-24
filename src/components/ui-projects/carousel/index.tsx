import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import styles from './index.module.scss';
import { Category } from 'components/ui-parts/category';
import { formatPublishedDate } from 'utils/formatDate';

export interface CarouselProps {
  contents: any[];
}

export const Carousel: React.FC<CarouselProps> = ({ contents }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!contents?.length) {
    return null;
  }

  let slides;
  if (contents.length < 6) {
    // スライド枚数が足りない場合は複製  
    slides = [...contents, ...contents, ...contents];
  } else {
    slides = contents
  }

  return (
    <div className={styles.carousel}>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={40}
        slidesPerView={1.2}
        loop={true}
        autoplay={{
          delay: 5000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        speed={800}
        navigation={true}
        centeredSlides={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        breakpoints={{
          768: {
            spaceBetween: 80,
            slidesPerView: 1.6,
          },
          1440: {
            spaceBetween: 125,
            slidesPerView: 2.2,
          }
        }}
        className={styles.swiper}
        aria-label='PICKUPカルーセル'
      >
        {slides.map((content, index) => {
          const imageUrl = content?.eyecatch?.url ?? '/images/placehold.png';
          const category = content?.category?.name;
          const publishedAt = formatPublishedDate(content.publishedAt);
          const isActive = activeIndex === index;

          return (
            <SwiperSlide key={index} className={styles.slide}>
              <Link href={`/blog/${content.id}`} className={styles.card}>
                <div className={styles.thumbnail}>
                  <Image
                    src={imageUrl}
                    alt={`${content.title}のアイキャッチ画像`}
                    fill
                    sizes='(max-width: 768px) 85vw, 360px'
                    className={styles.image}
                  />
                </div>

                <div className={`${styles.meta} ${isActive ? styles.active : ''}`}>
                  <div className={styles.meta_top}>
                    {category && <Category content={category} />}
                    {publishedAt && (
                      <time dateTime={content.publishedAt} className={styles.date}>
                        {publishedAt}
                      </time>
                    )}
                  </div>
                  <div className={styles.meta_bottom}>
                    <h3 className={styles.title}>{content.title}</h3>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default React.memo(Carousel);

