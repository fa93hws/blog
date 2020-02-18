import * as React from 'react';
import { createHomePage } from './home/home';
import { Nav } from '../component/nav/nav';
import styles from './page.css';

export const Skeleton = ({
  LeftNav,
  MainContent,
}: {
  LeftNav: React.ComponentType;
  MainContent: React.ComponentType;
}) => (
  <div className={styles.container}>
    <LeftNav />
    <main className={styles.mainContent}>
      <MainContent />
    </main>
  </div>
);

export function createSkeleton() {
  const MainContent = createHomePage();
  const author = {
    name: '夏目天子',
    email: 'wjun0912@gmail.com',
    avatar: {
      img: 'https://avatars0.githubusercontent.com/u/10626756',
      alt: "author's github page",
      linkTo: 'https://github.com/fa93hws',
    },
  };
  const LeftNav = () => <Nav author={author} />;
  const SkeletonImpl = () => (
    <Skeleton MainContent={MainContent} LeftNav={LeftNav} />
  );
  return SkeletonImpl;
}
