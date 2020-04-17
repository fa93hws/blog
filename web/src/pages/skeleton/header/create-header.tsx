import * as React from 'react';
import { observer } from 'mobx-react';
import { Header } from './header';
import { GlobalHeaderStore } from './header-presenter';
import headerStyles from './header.css';

const THRESHOLD = 0.9;

export function createHeader({
  onCloseClicked,
  onMenuClicked,
}: {
  onCloseClicked(): void;
  onMenuClicked(): void;
}) {
  const presenter = new GlobalHeaderStore();
  const intersectionObserver = new IntersectionObserver(
    entries => {
      presenter.setShowShortBarTitle(entries[0].intersectionRatio < THRESHOLD);
    },
    {
      // TODO Fix types
      rootMargin: `-${(headerStyles as any).shortHeaderHeight}`,
      threshold: THRESHOLD,
    },
  );
  const titleRef = React.createRef<HTMLDivElement>();
  const GlobalHeader = ({ icon }: { icon: 'cross' | 'menu' }) => {
    React.useEffect(() => {
      if (titleRef.current == null) {
        throw new Error('ref to title should not be null');
      }
      intersectionObserver.observe(titleRef.current);
    }, []);
    const onIconClicked = icon === 'cross' ? onCloseClicked : onMenuClicked;
    return (
      <Header
        showShortBarTitle={presenter.showShortBarTitle}
        onIconClicked={onIconClicked}
        titleRef={titleRef}
        icon={icon}
      />
    );
  };
  return observer(GlobalHeader);
}
