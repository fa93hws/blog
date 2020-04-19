import * as React from 'react';
import { Link } from 'react-router-dom';
import { Text } from 'components/typography/typography';
import styles from './nav.css';
import { NavItem, NavLinks } from './nav-links/nav-links';

export const Nav = ({ navItems }: { navItems: readonly NavItem[] }) => (
  <nav className={styles.nav}>
    <div className={styles.sourceCodeBanner}>
      <Link to="https://github.com/fa93hws/blog">
        <Text.Micro>源代码</Text.Micro>
      </Link>
    </div>
    <div className={styles.authorContainer}>
      <Link to="https://github.com/fa93hws/">
        <img
          src="https://avatars0.githubusercontent.com/u/10626756"
          alt="avatar"
          className={styles.avatarImg}
        />
      </Link>
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
