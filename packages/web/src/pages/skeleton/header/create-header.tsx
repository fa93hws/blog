import * as React from 'react';
import { observer } from 'mobx-react';
import { Header } from './header';
import { HeaderStore } from './header-store';
import headerStyles from './header.css';

const THRESHOLD = 0.9;

export function createHeader({
  onCloseClicked,
  onMenuClicked,
}: {
  onCloseClicked(): void;
  onMenuClicked(): void;
}) {
  const store = new HeaderStore();
  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].intersectionRatio < THRESHOLD) {
        store.hideShortBarTitle();
      } else {
        store.showShortBarTitle();
      }
    },
    {
      rootMargin: `-${headerStyles.shortHeaderHeight}`,
      threshold: THRESHOLD,
    },
  );
  const titleRef = React.createRef<HTMLDivElement>();
  const GlobalHeader = ({ icon }: { icon: 'Cross' | 'Menu' }) => {
    React.useEffect(() => {
      if (titleRef.current == null) {
        throw new Error('ref to title should not be null');
      }
      intersectionObserver.observe(titleRef.current);
    }, []);
    const onIconClicked = icon === 'Cross' ? onCloseClicked : onMenuClicked;
    return (
      <Header
        showShortBarTitle={store.isShortBarTitleHidden}
        onIconClicked={onIconClicked}
        titleRef={titleRef}
        icon={icon}
      />
    );
  };
  return observer(GlobalHeader);
}
