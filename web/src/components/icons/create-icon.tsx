import * as React from 'react';
import styles from './icons.css';

export type Size = 'small' | 'medium' | 'large';
type IconProps = {
  size: Size;
  svgContent: string;
  className?: string;
};

const sizeRatioMap: Record<Size, number> = {
  small: 1,
  medium: 2,
  large: 3,
};

export function getWidthFromSize(size: Size) {
  return 8 * 2 * sizeRatioMap[size];
}

function createSvgString(svgContent: string, size: Size) {
  const ratio = sizeRatioMap[size];
  const width = getWidthFromSize(size);
  const openTag = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="${width}" height="${width}" viewBox="0 0 ${width} ${width}"><g transform="scale(${ratio})">`;
  return `${openTag}${svgContent}</g></svg>`;
}

const BaseIcon = ({ size, svgContent }: IconProps) => {
  const svg = createSvgString(svgContent, size);
  return (
    <span
      aria-hidden="true"
      className={styles.iconSpan}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export function createIcon(svgContent: string) {
  const Icon = ({ size }: Omit<IconProps, 'svgContent'>) => (
    <BaseIcon size={size} svgContent={svgContent} />
  );
  return Icon;
}
