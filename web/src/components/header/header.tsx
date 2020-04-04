import * as React from 'react';
import * as classnames from 'classnames';
import styles from './header.css';
import { Title, Text } from '../typography/typography';
import { Cross } from '../icons/icons';

export const Header = ({
  showShortBarTitle,
  onCloseClicked,
}: {
  showShortBarTitle: boolean;
  onCloseClicked(): void;
}) => (
  <div className={styles.container}>
    <div
      className={classnames(styles.shortBar, {
        [styles.withBottomShadow]: showShortBarTitle,
      })}
    >
      <button className={styles.cross} onClick={onCloseClicked}>
        <Cross size="small" title="close" />
      </button>
      {showShortBarTitle && <Title.Small>夏目天子的博客</Title.Small>}
    </div>
    <div className={styles.content}>
      <div>
        <Title.Small>兴趣使然的博客</Title.Small>
      </div>
      <div className={styles.subTitle}>
        <Text.Micro>白嫖是我快乐</Text.Micro>
      </div>
    </div>
  </div>
);
