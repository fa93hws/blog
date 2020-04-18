import * as React from 'react';
import * as classnames from 'classnames';
import { Link } from 'react-router-dom';
import { Title } from 'components/typography/typography';
import styles from './title.css';

type TitleProps = {
  children: React.ReactNode;
  linkTo: string;
  _forceHover?: boolean;
};
export const AbstractTitle = React.memo(
  ({ children, linkTo, _forceHover = false }: TitleProps) => (
    <div
      className={classnames(styles.title, {
        [styles.forceHover]: _forceHover,
      })}
    >
      <Link to={linkTo}>
        <Title.Medium>{children}</Title.Medium>
      </Link>
      <div className={styles.underline} />
    </div>
  ),
);
