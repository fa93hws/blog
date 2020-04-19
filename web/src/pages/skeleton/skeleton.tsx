import * as React from 'react';
import { observer } from 'mobx-react';
import * as classnames from 'classnames';
import { BrowserRouter } from 'react-router-dom';
import { createHomePage } from 'pages/home/home';
import { NavItem } from './nav/nav-links/nav-links';
import { Nav } from './nav/nav';
import { createHeader } from './header/create-header';
import { SkeletonStore } from './skeleton-store';
import styles from './skeleton.css';

export const Skeleton = ({
  LeftNav,
  MainContent,
  Header,
  isMenuHidden,
}: {
  LeftNav: React.ComponentType;
  MainContent: React.ComponentType;
  Header: React.ComponentType<{ icon: 'Cross' | 'Menu' }>;
  isMenuHidden: boolean;
}) => (
  <BrowserRouter>
    <>
      <aside
        className={classnames(styles.nav, {
          [styles.hideMenu]: isMenuHidden,
        })}
      >
        <LeftNav />
      </aside>
      <main
        className={classnames(styles.mainContent, {
          [styles.hideMenu]: isMenuHidden,
        })}
      >
        <div>
          <Header icon={isMenuHidden ? 'Menu' : 'Cross'} />
          <MainContent />
        </div>
      </main>
    </>
  </BrowserRouter>
);

export function createSkeleton() {
  const MainContent = createHomePage();
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

  const LeftNav = () => <Nav navItems={navLinkItems} />;

  const store = new SkeletonStore();
  const Header = createHeader({
    onCloseClicked: () => store.hideMenu(),
    onMenuClicked: () => store.showMenu(),
  });
  const SkeletonImpl = () => (
    <Skeleton
      Header={Header}
      LeftNav={LeftNav}
      MainContent={MainContent}
      isMenuHidden={store.isMenuHidden}
    />
  );
  return observer(SkeletonImpl);
}
