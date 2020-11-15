import * as React from 'react';
import { Text } from 'components/typography/typography';
import styles from './nav.css';
import { NavItem, NavLinks } from './nav-links/nav-links';

export const Nav = ({ navItems }: { navItems: readonly NavItem[] }) => (
  <nav className={styles.nav}>
    <div className={styles.sourceCodeBanner}>
      <a
        href="https://github.com/fa93hws/blog"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Text.Micro>源代码</Text.Micro>
      </a>
    </div>
    <div className={styles.authorContainer}>
      <a
        href="https://github.com/fa93hws/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://avatars0.githubusercontent.com/u/10626756"
          alt="avatar"
          className={styles.avatarImg}
        />
      </a>
      <div className={styles.name}>
        <Text.Micro>夏目天子</Text.Micro>
      </div>
      <div className={styles.email}>
        <Text.Micro>wjun0912@gmail.com</Text.Micro>
      </div>
    </div>
    <NavLinks items={navItems} />
  </nav>
);
