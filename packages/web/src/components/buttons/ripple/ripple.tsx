import * as React from 'react';
import { observer } from 'mobx-react';
import * as classnames from 'classnames';
import styles from './ripple.css';
import { RippleStore } from './ripple-store';

export type RipplePosition = {
  top: number;
  left: number;
};
export type RippleColor = 'white' | 'blue';

export namespace Internal {
  export const Ripple = React.memo(
    ({ position, color }: { position: RipplePosition; color: RippleColor }) => (
      <div
        key={Math.random()}
        className={classnames(styles.ripple, styles[color])}
        style={{ top: position.top, left: position.left }}
      />
    ),
  );
}

export type RipplableProps = {
  onMouseDown(e: React.MouseEvent<HTMLElement, MouseEvent>): void;
  RippleSlot: React.ComponentType<{ color: RippleColor }>;
};

const defaultStoreFactory = () => new RippleStore();
export function withRipple<T extends RipplableProps>(
  Container: React.ComponentType<T>,
  storeFactory: () => RippleStore = defaultStoreFactory,
) {
  return React.memo((originalProps: Omit<T, keyof RipplableProps>) => {
    const store = React.useMemo(storeFactory, []);
    const onMouseDown = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        const offsetY = e.clientY - top;
        const offsetX = e.clientX - left;
        store.setRipple({ top: offsetY, left: offsetX });
      },
      [],
    );

    const RippleImpl = React.useMemo(
      () =>
        observer(({ color }: { color: RippleColor }) =>
          store.ripplePosition != null ? (
            <Internal.Ripple position={store.ripplePosition} color={color} />
          ) : null,
        ),
      [],
    );

    return (
      <Container
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(originalProps as any)}
        onMouseDown={onMouseDown}
        RippleSlot={RippleImpl}
      />
    );
  });
}
