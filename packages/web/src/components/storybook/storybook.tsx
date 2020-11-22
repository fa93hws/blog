import * as React from 'react';
import * as classnames from 'classnames';
import styles from './storybook.css';

export const StorySection = ({
  name,
  children,
  stripeBackground,
}: {
  name: string;
  children: React.ReactNode;
  stripeBackground?: 'light' | 'dark';
}) => (
  <fieldset className={styles.section}>
    <legend>{name}</legend>
    <div
      className={classnames({
        [styles.stripeLight]: stripeBackground === 'light',
        [styles.stripeDark]: stripeBackground === 'dark',
      })}
    >
      {children}
    </div>
  </fieldset>
);

export const StorySubSection = ({
  children,
}: {
  children: React.ReactNode;
}) => <section className={styles.subSection}>{children}</section>;
