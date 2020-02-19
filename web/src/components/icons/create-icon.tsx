import * as React from 'react';

export type Size = 'small' | 'medium' | 'large';
type IconProps = {
  size: Size;
  title: string;
  svgContent: string;
  className?: string;
};

const sizeRatioMap: Record<Size, number> = {
  small: 1,
  medium: 2,
  large: 3,
};

function createSvgString(svgContent: string, size: Size) {
  const ratio = sizeRatioMap[size];
  const width = 8 * 2 * ratio;
  const openTag = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="${width}" height="${width}" viewBox="0 0 ${width} ${width}"><g transform="scale(${ratio})">`;
  return `${openTag}${svgContent}</g></svg>`;
}

const BaseIcon = ({ size, svgContent, title, className }: IconProps) => {
  const svg = createSvgString(svgContent, size);
  return (
    <span
      aria-hidden="true"
      className={className}
      title={title}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export function createIcon(svgContent: string) {
  const Icon = ({ size, title, className }: Omit<IconProps, 'svgContent'>) => (
    <BaseIcon
      size={size}
      title={title}
      svgContent={svgContent}
      className={className}
    />
  );
  return Icon;
}
