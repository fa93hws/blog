import * as React from 'react';
import { Skeleton } from '../skeleton';

describe('Skeleton', () => {
  it('should match the snapshot', () => {
    const LeftNav = () => <div>Nav</div>;
    const MainContent = () => <div>MainContent</div>;
    expect(
      <Skeleton LeftNav={LeftNav} MainContent={MainContent} />,
    ).toMatchRenderedSnapshot();
  });
});
