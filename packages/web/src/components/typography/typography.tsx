import * as React from 'react';
import styles from './typography.css';

type HeadingTagName = keyof Pick<
  JSX.IntrinsicElements,
  'h1' | 'h2' | 'h3' | 'h4' | 'h5'
>;
type TagName = HeadingTagName | keyof Pick<JSX.IntrinsicElements, 'p'>;

function createTextComponent({
  tagName,
  className,
}: {
  tagName: TagName;
  className: string;
}) {
  const TextElement = ({ children }: { children: React.ReactNode }) =>
    React.createElement(tagName, { className }, children);
  return React.memo(TextElement);
}

export const Title = {
  Large: createTextComponent({
    tagName: 'h2',
    className: styles.titleLarge,
  }),
  Medium: createTextComponent({
    tagName: 'h3',
    className: styles.titleMedium,
  }),
  Small: createTextComponent({
    tagName: 'h4',
    className: styles.titleSmall,
  }),
};

export const Text = {
  Medium: createTextComponent({
    tagName: 'p',
    className: styles.textMedium,
  }),
  Small: createTextComponent({
    tagName: 'p',
    className: styles.textSmall,
  }),
  Micro: createTextComponent({
    tagName: 'p',
    className: styles.textMicro,
  }),
};
