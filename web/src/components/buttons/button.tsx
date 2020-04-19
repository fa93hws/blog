import * as React from 'react';
import * as classnames from 'classnames';
import { UnreachableException } from 'utils/exceptions/unreachable';
import * as Icons from 'components/icons/icons';
import { RipplableProps, withRipple, RippleColor } from './ripple/ripple';
import styles from './button.css';

type ButtonSize = 'medium' | 'large' | undefined;
type ButtonType = 'primary' | 'ghost';
type BaseButtonProps = {
  prefixIcon?: keyof typeof Icons;
  onClick?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  onMouseDown?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  circle?: boolean;
  children?: React.ReactNode;
  size?: ButtonSize;
  type: ButtonType;
};

function getSizeClassName(size: ButtonSize) {
  switch (size) {
    case undefined:
    case 'medium':
      return styles.medium;
    case 'large':
      return styles.large;
    default:
      throw new UnreachableException(size);
  }
}
const rippleColorMap: Record<ButtonType, RippleColor> = {
  primary: 'white',
  ghost: 'blue',
};

const ButtonStateless = (props: BaseButtonProps & RipplableProps) => {
  const PrefixIcon = props.prefixIcon == null ? null : Icons[props.prefixIcon];
  return (
    <button
      onClick={props.onClick}
      onMouseDown={props.onMouseDown}
      className={classnames(
        styles.baseButton,
        getSizeClassName(props.size),
        styles[props.type],
        {
          [styles.circle]: props.circle,
        },
      )}
    >
      {PrefixIcon && <PrefixIcon size="small" />}
      {props.children && (
        <span
          className={classnames(styles.text, {
            [styles.withIcon]: PrefixIcon != null,
          })}
        >
          {props.children}
        </span>
      )}
      <div className={styles.rippleContainer}>
        <props.RippleSlot color={rippleColorMap[props.type]} />
      </div>
    </button>
  );
};

function createButton(type: ButtonType) {
  return React.memo((props: Omit<BaseButtonProps & RipplableProps, 'type'>) => (
    <ButtonStateless type={type} {...props} />
  ));
}

export const PrimaryButton = withRipple(createButton('primary'));
export const GhostButton = withRipple(createButton('ghost'));
