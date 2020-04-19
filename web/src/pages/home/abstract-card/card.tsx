import * as React from 'react';
import { Text } from 'components/typography/typography';
import { AbstractTitle } from './title/title';
import styles from './card.css';

type CardProps = {
  title: string;
  linkTo: string;
  time: string;
  abstract: string;
};
export const AbstractCard = React.memo(
  ({ title, time, abstract, linkTo }: CardProps) => (
    <article className={styles.card}>
      <div className={styles.time}>
        <Text.Micro>{time}</Text.Micro>
      </div>
      <div className={styles.title}>
        <AbstractTitle linkTo={linkTo}>{title}</AbstractTitle>
      </div>
      <div className={styles.content}>
        <Text.Small>{abstract}</Text.Small>
      </div>
    </article>
  ),
);
