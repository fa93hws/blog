import * as React from 'react';
import { Skeleton } from '../skeleton';

describe('Skeleton', () => {
  it('should match the snapshot', () => {
    const Nav = () => <div>Nav</div>;
    const MainContent = () => <div>MainContent</div>;
    expect(
      <Skeleton Nav={Nav} MainContent={MainContent} />,
    ).toMatchRenderedSnapshot();
  });
});
