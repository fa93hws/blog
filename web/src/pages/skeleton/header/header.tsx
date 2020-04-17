import * as React from 'react';
import * as classnames from 'classnames';
import { Title, Text } from 'components/typography/typography';
import { Cross, Menu } from 'components/icons/icons';
import styles from './header.css';

const IconButton = React.memo(
  ({ type, onClicked }: { type: 'cross' | 'menu'; onClicked(): void }) => (
    <button className={styles.icon} onClick={onClicked}>
      {type === 'cross' && <Cross size="small" title="close" />}
      {type === 'menu' && <Menu size="small" title="menu" />}
    </button>
  ),
);

export const Header = React.memo(
  ({
    showShortBarTitle,
    onCloseClicked,
    onMenuClicked,
    titleRef,
    icon,
  }: {
    showShortBarTitle: boolean;
    onCloseClicked(): void;
    onMenuClicked(): void;
    titleRef?: React.Ref<HTMLDivElement>;
    icon: 'cross' | 'menu';
  }) => (
    <div className={styles.container}>
      <div
        className={classnames(styles.shortBar, {
          [styles.withBottomShadow]: showShortBarTitle,
        })}
      >
        <IconButton
          type={icon}
          onClicked={icon === 'cross' ? onCloseClicked : onMenuClicked}
        />
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
  ),
);
