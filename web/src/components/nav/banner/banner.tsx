import * as React from 'react';
import { Text } from '../../typography/typography';
import styles from './banner.css';

export const SourceCodeBanner = ({
  sourceCodeUrl,
}: {
  sourceCodeUrl: string;
}) => (
  <div className={styles.banner}>
    <a href={sourceCodeUrl}>
      <Text.Micro>源代码</Text.Micro>
    </a>
  </div>
);
