import React from 'react';
import classnames from 'classnames';
import styles from './index.module.scss';

type Category = {
  id: string;
  name: string;
};

export interface TabNavigationProps {
  categories: Category[];
  selectedCategory: string;
  onChange: (categoryId: string) => void;
  isLoading?: boolean;
  includeAllTab?: boolean;
  allLabel?: string;
  className?: string;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  categories,
  selectedCategory,
  onChange,
  isLoading = false,
  includeAllTab = true,
  allLabel = 'ALL',
  className,
}) => {
  const renderButton = (categoryId: string, label: string, key?: string) => (
    <button
      type="button"
      key={key ?? categoryId}
      className={classnames(styles.tab, selectedCategory === categoryId && styles.isActive)}
      onClick={() => onChange(categoryId)}
      disabled={isLoading}
      aria-pressed={selectedCategory === categoryId}
    >
      {label}
    </button>
  );

  return (
    <div className={classnames(styles.tabNavigation, className)}>
      {includeAllTab && renderButton('ALL', allLabel, 'tab-all')}
      {categories.map((category) => renderButton(category.id, category.name))}
    </div>
  );
};

export default React.memo(TabNavigation);

