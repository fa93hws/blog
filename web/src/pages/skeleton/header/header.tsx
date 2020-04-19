import * as React from 'react';
import * as classnames from 'classnames';
import { Title, Text } from 'components/typography/typography';
import { GhostButton } from 'components/buttons/button';
import { Cross, Menu } from 'components/icons/icons';
import styles from './header.css';

const iconMap = { Cross, Menu };
const IconButtonImpl = React.memo(
  ({ type, onClick }: { type: 'Cross' | 'Menu'; onClick(): void }) => {
    const Icon = iconMap[type];
    return (
      <div className={styles.iconButton}>
        <GhostButton size="large" onClick={onClick} circle>
          <Icon size="small" className={styles.icon} />
        </GhostButton>
      </div>
    );
  },
);

export const Header = React.memo(
  ({
    showShortBarTitle,
    onIconClicked,
    titleRef,
    icon,
  }: {
    showShortBarTitle: boolean;
    onIconClicked(): void;
    titleRef?: React.Ref<HTMLDivElement>;
    icon: 'Cross' | 'Menu';
  }) => (
    <div className={styles.container}>
      <div
        className={classnames(styles.shortBar, {
          [styles.withBottomShadow]: showShortBarTitle,
        })}
      >
        <IconButtonImpl type={icon} onClick={onIconClicked} />
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
