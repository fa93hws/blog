import * as React from 'react';
import * as classnames from 'classnames';
import { Link } from 'react-router-dom';
import * as Icons from 'components/icons/icons';
import { RipplableProps, withRipple, RippleColor } from './ripple/ripple';
import styles from './button.css';

type ButtonSize = 'medium' | 'large' | undefined;
type ButtonType = 'primary' | 'ghost';
type BaseButtonProps = {
  prefixIcon?: keyof typeof Icons;
  onClick?(e: React.MouseEvent<HTMLElement, MouseEvent>): void;
  onMouseDown?(e: React.MouseEvent<HTMLElement, MouseEvent>): void;
  circle?: boolean;
  children?: React.ReactNode;
  size?: ButtonSize;
  link?: string;
  type: ButtonType;
};

const sizeClassNameMap: Record<NonNullable<ButtonSize>, string> = {
  medium: styles.medium,
  large: styles.large,
};
const rippleColorMap: Record<ButtonType, RippleColor> = {
  primary: 'white',
  ghost: 'blue',
};

function getButtonClassName({
  size = 'medium',
  type,
  circle = false,
}: {
  size?: ButtonSize;
  type: ButtonType;
  circle?: boolean;
}) {
  return classnames(styles.baseButton, sizeClassNameMap[size], styles[type], {
    [styles.circle]: circle,
  });
}

function generateAttributes(props: BaseButtonProps & RipplableProps) {
  return {
    onClick: props.onClick,
    onMouseDown: props.onMouseDown,
    className: getButtonClassName({
      size: props.size,
      circle: props.circle,
      type: props.type,
    }),
  };
}
const ButtonChildren = React.memo((props: BaseButtonProps & RipplableProps) => {
  const PrefixIcon = props.prefixIcon == null ? null : Icons[props.prefixIcon];
  return (
    <>
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
    </>
  );
});

const ButtonStateless = (props: BaseButtonProps & RipplableProps) => {
  const attributes = generateAttributes(props);
  return (
    <button {...attributes}>
      <ButtonChildren {...props} />
    </button>
  );
};
const LinkButtonStateless = (
  props: BaseButtonProps & RipplableProps & { link: string },
) => {
  const attributes = generateAttributes(props);
  if (props.link.startsWith('http')) {
    return (
      <a {...attributes} href={props.link}>
        <ButtonChildren {...props} />
      </a>
    );
  }
  return (
    <Link {...attributes} to={props.link}>
      <ButtonChildren {...props} />
    </Link>
  );
};

function createButton(type: ButtonType) {
  return React.memo((props: Omit<BaseButtonProps & RipplableProps, 'type'>) => {
    if (props.link == null) {
      return <ButtonStateless type={type} {...props} />;
    }
    return <LinkButtonStateless type={type} {...props} link={props.link} />;
  });
}

export const PrimaryButton = withRipple(createButton('primary'));
export const GhostButton = withRipple(createButton('ghost'));
