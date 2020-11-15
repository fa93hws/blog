import * as React from 'react';
import { Link } from 'react-router-dom';
import { Text } from 'components/typography/typography';
import styles from './nav-links.css';

const isExternalLink = (link: string) => link.startsWith('http');
const NavLink = ({
  link,
  children,
}: {
  link: string;
  children: React.ReactNode;
}) => {
  return isExternalLink(link) ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.link}
    >
      {children}
    </a>
  ) : (
    <Link to={link} className={styles.link}>
      {children}
    </Link>
  );
};

export type NavItem = {
  text: string;
  link: string;
};

export const NavLinks = ({ items }: { items: readonly NavItem[] }) => (
  <ul className={styles.list}>
    {items.map((item) => (
      <li key={item.link}>
        <NavLink link={item.link}>
          <Text.Micro>{item.text}</Text.Micro>
        </NavLink>
      </li>
    ))}
  </ul>
);
