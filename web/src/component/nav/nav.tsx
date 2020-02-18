import * as React from 'react';
import styles from './nav.css';
import { Author, AuthorProps } from './author/author';

export const Nav = ({ author }: { author: AuthorProps }) => (
  <nav className={styles.nav}>
    <Author name={author.name} email={author.email} avatar={author.avatar} />
    <div className={styles.content}>This is content</div>
  </nav>
);
