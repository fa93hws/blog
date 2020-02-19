import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createHomePage } from './home/home';
import { NavItem } from '../components/nav/nav-links/nav-links';
import { Nav } from '../components/nav/nav';
import styles from './page.css';

export const Skeleton = ({
  LeftNav,
  MainContent,
}: {
  LeftNav: React.ComponentType;
  MainContent: React.ComponentType;
}) => (
  <BrowserRouter>
    <div className={styles.container}>
      <aside className={styles.nav}>
        <LeftNav />
      </aside>
      <main className={styles.mainContent}>
        <MainContent />
      </main>
    </div>
  </BrowserRouter>
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
  const navLinkItems: readonly NavItem[] = [
    {
      text: 'Home',
      link: '/home',
    },
    {
      text: 'Archives',
      link: '/archives',
    },
    {
      text: 'Tags',
      link: '/tags',
    },
    {
      text: 'Github',
      link: '/github',
    },
    {
      text: 'Weibo',
      link: '/weibo',
    },
  ];

  const LeftNav = () => (
    <Nav
      author={author}
      navItems={navLinkItems}
      sourceCodeUrl="https://github.com/fa93hws/blog"
    />
  );

  const SkeletonImpl = () => (
    <Skeleton MainContent={MainContent} LeftNav={LeftNav} />
  );
  return SkeletonImpl;
}
