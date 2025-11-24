import Link from 'next/link';
import styles from './index.module.scss'

export const Pagination = ({ maxPageNumber, currentPageNumber }) => {
  currentPageNumber = Number(currentPageNumber);
  maxPageNumber = Number(maxPageNumber);
  const prevPage = currentPageNumber - 1;
  const nextPage = currentPageNumber + 1;
  const pageNumbers = [];

  for (let i = 1; i <= maxPageNumber; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      <div>
        {currentPageNumber !== 1 && (
          <Link href={`/blog/page/${prevPage}`} className={styles.arrow}>
            ← Previous
          </Link>
        )}
      </div>

      <ul className={styles.numberList}>
        {pageNumbers.map((pageNumber) => {
          const isActive = pageNumber === currentPageNumber;
          return (
            <li key={pageNumber} className={styles.numberItem}>
              <Link
                key={pageNumber}
                href={`/blog/page/${pageNumber}`}
                className={`${styles.number} ${isActive ? styles.isActive : ''}`}
              >
                {pageNumber}
              </Link>
            </li>
          );
        })}
      </ul>

      <div>
        {currentPageNumber !== maxPageNumber && (
          <Link href={`/blog/page/${nextPage}`} className={styles.arrow}>
            Next →
          </Link>
        )}
      </div>
    </div>
  );
};