import * as React from 'react';
import * as classnames from 'classnames';
import { Title, Text } from 'components/typography/typography';
import { Cross, Menu } from 'components/icons/icons';
import { IconButton } from 'components/buttons/icon-button';
import styles from './header.css';

const IconButtonImpl = React.memo(
  ({ type, onClick }: { type: 'cross' | 'menu'; onClick(): void }) => {
    const Icon =
      type === 'cross'
        ? () => <Cross size="small" />
        : () => <Menu size="small" />;
    return (
      <div className={styles.icon}>
        <IconButton size="small" onClick={onClick} Icon={Icon} circle />
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
    icon: 'cross' | 'menu';
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
