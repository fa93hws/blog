import * as React from 'react';
import * as classnames from 'classnames';
import { RipplableProps, withRipple } from './ripple/ripple';
import styles from './icon-button.css';

type BaseButtonProps = {
  onClick?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  onMouseDown?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  circle?: boolean;
};

type IconButtonProps = BaseButtonProps & {
  Icon: React.ComponentType;
  size: 'small' | 'large';
};

const IconButtonStateless = React.memo(
  (props: IconButtonProps & RipplableProps) => (
    <button
      onClick={props.onClick}
      onMouseDown={props.onMouseDown}
      className={classnames(styles.iconButton, styles[props.size], {
        [styles.circle]: props.circle,
      })}
    >
      <props.Icon />
      <props.RippleSlot />
    </button>
  ),
);

export const IconButton = withRipple(IconButtonStateless);
