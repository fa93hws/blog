import * as React from 'react';
import styles from './nav.css';
import { Author, AuthorProps } from './author/author';
import { SourceCodeBanner } from './banner/banner';
import { NavItem, NavLinks } from './nav-links/nav-links';

export const Nav = ({
  author,
  sourceCodeUrl,
  navItems,
}: {
  author: AuthorProps;
  sourceCodeUrl: string;
  navItems: readonly NavItem[];
}) => (
  <nav className={styles.nav}>
    <SourceCodeBanner sourceCodeUrl={sourceCodeUrl} />
    <Author name={author.name} email={author.email} avatar={author.avatar} />
    <NavLinks items={navItems} />
  </nav>
);
