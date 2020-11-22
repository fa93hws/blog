import { render } from '@testing-library/react';
import { ReactElement } from 'react';

export function toMatchRenderedSnapshot(
  this: jest.MatcherUtils,
  jsx: ReactElement<unknown>,
): { message(): string; pass: boolean } {
  try {
    expect(render(jsx).container.firstElementChild).toMatchSnapshot();

    return {
      message: () => 'expected JSX not to match snapshot',
      pass: true,
    };
  } catch (e) {
    return {
      message: () => `expected JSX to match snapshot: ${e.message}`,
      pass: false,
    };
  }
}
