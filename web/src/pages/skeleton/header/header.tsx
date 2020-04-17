import * as React from 'react';
import * as classnames from 'classnames';
import { Title, Text } from 'components/typography/typography';
import { Cross } from 'components/icons/icons';
import styles from './header.css';

export const Header = ({
  showShortBarTitle,
  onCloseClicked,
  titleRef,
}: {
  showShortBarTitle: boolean;
  onCloseClicked(): void;
  titleRef?: React.Ref<HTMLDivElement>;
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
      <div ref={titleRef}>
        <Title.Small>兴趣使然的博客</Title.Small>
      </div>
      <div className={styles.subTitle}>
        <Text.Micro>白嫖是我快乐</Text.Micro>
      </div>
    </div>
  </div>
);
