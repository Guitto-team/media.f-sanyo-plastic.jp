import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss'
import Image from 'next/image';
import classnames from 'classnames';
import { TagList } from '../tag-list';
import { CategoryList } from '../category-list';

export interface SidebarProps {
  categories: any,
  tags: any
}

export const Sidebar: React.FC<SidebarProps> = ({
  categories,
  tags
}) => {
  const sidebarRef = useRef<HTMLElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [activeButton, setActiveButton] = useState('category');

  // buttonのonClickイベントで、isActiveの状態を切り替えるための関数
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const buttonDataToggle = event.currentTarget.getAttribute('data-toggle');
    setActiveButton(buttonDataToggle);
    setIsActive(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // sidebar の外側をクリックしたら isActive を false
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // isActiveの値に応じて、buttonに適用するクラス名を動的に変更するための変数
  const activeClass = isActive ? styles.isShow : styles.isHide;

  return (
    <aside className={styles.sidebar} ref={sidebarRef}>

      <ul className={classnames(styles.switch)}>
        <li className={styles.switchItem}>
          <button className={classnames(styles.button, activeButton === 'category' ? styles.isActive : '')} onClick={handleClick} data-toggle='category'>
            <i className={styles.buttonIcon}>
              <Image src={'/images/category.svg'} alt={'カテゴリアイコン'}  width={25} height={17} />
            </i>
            <span className={styles.buttonText}>カテゴリ</span>
          </button>
        </li>
        <li className={styles.switchItem}>
          <button className={classnames(styles.button, activeButton === 'tag' ? styles.isActive : '')} onClick={handleClick} data-toggle='tag'>
            <i className={styles.buttonIcon}>
              <Image src={'/images/tag.svg'} alt={'タグアイコン'}  width={24} height={24} />
            </i>
            <span className={styles.buttonText}>タグ一覧</span>
          </button>
        </li>
      </ul>

      <nav className={classnames(styles.navigation, activeClass)}>
        <ul className={styles.navigationList}>
          <li className={styles.navigationItem}>
            <button className={classnames(styles.button, activeButton === 'category' ? styles.isActive : '')} onClick={handleClick} data-toggle='category' data-content='navs'>
              <i className={styles.buttonIcon}>
                <Image src={'/images/category.svg'} alt={'カテゴリアイコン'}  width={18} height={13} />
              </i>
              <span className={styles.buttonText}>カテゴリ</span>
            </button>
          </li>
          <li className={styles.navigationItem}>
            <button className={classnames(styles.button, activeButton === 'tag' ? styles.isActive : '')} onClick={handleClick} data-toggle='tag' data-content='navs'>
              <i className={styles.buttonIcon}>
                <Image src={'/images/tag.svg'} alt={'タグアイコン'}  width={18} height={18} />
              </i>
              <span className={styles.buttonText}>タグ一覧</span>
            </button>
          </li>
        </ul>
        <ul className={styles.navigationContent}>
          <li className={classnames(styles.content, activeButton === 'category' ? styles.isActive : '')} data-toggle='category'>
            <CategoryList contents={categories} />
          </li>
          <li className={classnames(styles.content, activeButton === 'tag' ? styles.isActive : '')} data-toggle='tag'>
            <TagList contents={tags} justifyContent='j-flex-start' />
          </li>
        </ul>
      </nav>

    </aside>
  );
}

export default React.memo(Sidebar);