import * as React from 'react';
import styles from './home.css';

export function createHomePage() {
  const page = () => (
    <div className={styles.home}>
      <p>hello world</p>
    </div>
  );
  return page;
}
