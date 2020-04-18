import * as React from 'react';
import * as classnames from 'classnames';
import { observer } from 'mobx-react';
import styles from './ripple.css';
import { RippleStore } from './ripple-store';

export type RipplePosition = {
  top: number;
  left: number;
};

export namespace Internal {
  export const Ripple = React.memo(
    ({
      position,
      useAnimation = true,
    }: {
      position: RipplePosition;
      useAnimation?: boolean;
    }) => (
      <div
        key={Math.random()}
        className={classnames(styles.ripple, {
          [styles.useAnimation]: useAnimation,
        })}
        style={{ top: position.top, left: position.left }}
      />
    ),
  );
}

export type RipplableProps = {
  onMouseDown(e: React.MouseEvent<HTMLElement, MouseEvent>): void;
  RippleSlot: React.ComponentType;
};

export function withRipple<
  T extends {
    onMouseDown?(e: React.MouseEvent<HTMLElement, MouseEvent>): void;
  }
>(Container: React.ComponentType<T & RipplableProps>) {
  return React.memo(
    (
      originalProps: T & {
        store?: RippleStore;
        useAnimation?: boolean;
      },
    ) => {
      const store = React.useMemo(
        () => originalProps.store ?? new RippleStore(),
        [],
      );
      const onMouseDown = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          const { left, top } = e.currentTarget.getBoundingClientRect();
          const offsetY = e.clientY - top;
          const offsetX = e.clientX - left;
          store.setRipple({ top: offsetY, left: offsetX });
          originalProps.onMouseDown && originalProps.onMouseDown(e);
        },
        [originalProps.onMouseDown],
      );

      const RippleImpl: React.ComponentType = React.useMemo(
        () =>
          observer(() =>
            store.ripplePosition != null ? (
              <Internal.Ripple
                position={store.ripplePosition}
                useAnimation={originalProps.useAnimation ?? true}
              />
            ) : null,
          ),
        [],
      );

      return (
        <Container
          {...originalProps}
          onMouseDown={onMouseDown}
          RippleSlot={RippleImpl}
        />
      );
    },
  );
}
