import * as React from 'react';
import styles from './page.css';

export const Skeleton = ({
  Nav,
  MainContent,
}: {
  Nav: React.ComponentType;
  MainContent: React.ComponentType;
}) => (
  <div className={styles.container}>
    <Nav />
    <main className={styles.mainContent}>
      <MainContent />
    </main>
  </div>
);
