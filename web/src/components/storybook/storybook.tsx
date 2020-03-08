import * as React from 'react';
import styles from './storybook.css';

export const StorySection = ({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) => (
  <fieldset className={styles.section}>
    <legend>{name}</legend>
    {children}
  </fieldset>
);
