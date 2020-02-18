import * as React from 'react';
import styles from './author.css';

export type AuthorProps = {
  name: string;
  email: string;
  avatar: {
    img: string;
    alt: string;
    linkTo: string;
  };
};

export const Author = ({ name, email, avatar }: AuthorProps) => (
  <div className={styles.container}>
    <a href={avatar.linkTo}>
      <img src={avatar.img} alt={avatar.alt} className={styles.avatarImg} />
    </a>
    <p className={styles.name}>{name}</p>
    <p className={styles.email}>{email}</p>
  </div>
);
