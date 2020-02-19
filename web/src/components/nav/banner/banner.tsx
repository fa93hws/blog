import * as React from 'react';
import styles from './banner.css';

export const SourceCodeBanner = ({
  sourceCodeUrl,
}: {
  sourceCodeUrl: string;
}) => (
  <div className={styles.banner}>
    <a href={sourceCodeUrl}>源代码</a>
  </div>
);
