import * as React from 'react';
import { MemoryRouter } from 'react-router';
import { PrimaryButton, GhostButton } from '../button';

const ButtonMap = { PrimaryButton, GhostButton };
type TestCase = keyof typeof ButtonMap;
const testCases = Object.keys(ButtonMap) as TestCase[];

describe.each(testCases)('%s', (name: TestCase) => {
  const Button = ButtonMap[name];

  it('renders the default', () => {
    expect(<Button>Default</Button>).toMatchRenderedSnapshot();
  });

  it('renders the circle', () => {
    expect(<Button circle>Circle</Button>).toMatchRenderedSnapshot();
  });

  it('renders with icon', () => {
    expect(<Button prefixIcon="Github">Icon</Button>).toMatchRenderedSnapshot();
  });

  it('renders button with internal link', () => {
    expect(
      <MemoryRouter>
        <Button link="/a">Default</Button>
      </MemoryRouter>,
    ).toMatchRenderedSnapshot();
  });

  it('renders button with external link', () => {
    expect(
      <MemoryRouter>
        <Button link="http://a">Default</Button>
      </MemoryRouter>,
    ).toMatchRenderedSnapshot();
  });
});
