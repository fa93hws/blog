import * as React from 'react';
import { Link } from 'react-router-dom';
import { Title } from 'components/typography/typography';
import styles from './title.css';

export const AbstractTitle = React.memo(
  ({ children, linkTo }: { children: React.ReactNode; linkTo: string }) => (
    <div className={styles.title}>
      <Link to={linkTo}>
        <Title.Small>{children}</Title.Small>
      </Link>
      <div className={styles.underline} />
    </div>
  ),
);
