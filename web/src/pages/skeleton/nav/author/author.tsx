import * as React from 'react';
import { Text } from '../../../../components/typography/typography';
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
    <div className={styles.name}>
      <Text.Micro>{name}</Text.Micro>
    </div>
    <div className={styles.email}>
      <Text.Micro>{email}</Text.Micro>
    </div>
  </div>
);
