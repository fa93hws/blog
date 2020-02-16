import * as React from 'react';
import styles from './nav.css';

export function createNav() {
  const Nav = () => (
    <nav className={styles.nav}>
      <div className={styles.avatar}>This is avatar</div>
      <div className={styles.content}>This is content</div>
    </nav>
  );
  return Nav;
}
