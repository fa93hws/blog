import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createHomePage } from 'pages/home/home';
import { NavItem } from './nav/nav-links/nav-links';
import { Nav } from './nav/nav';
import { createHeader } from './header/create-header';
import styles from './skeleton.css';

export const Skeleton = ({
  LeftNav,
  MainContent,
  Header,
}: {
  LeftNav: React.ComponentType;
  MainContent: React.ComponentType;
  Header: React.ComponentType;
}) => (
  <BrowserRouter>
    <>
      <aside className={styles.nav}>
        <LeftNav />
      </aside>
      <main className={styles.mainContent}>
        <div>
          <Header />
          <MainContent />
        </div>
      </main>
    </>
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
  const Header = createHeader();
  const SkeletonImpl = () => (
    <Skeleton Header={Header} LeftNav={LeftNav} MainContent={MainContent} />
  );
  return SkeletonImpl;
}
