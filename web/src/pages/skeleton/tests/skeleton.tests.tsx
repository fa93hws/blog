import * as React from 'react';
import { Skeleton } from '../skeleton';

describe('Skeleton', () => {
  const LeftNav = () => <div>Nav</div>;
  const MainContent = () => <div>MainContent</div>;
  const Header = () => <div>Header</div>;

  it('renders the skeleton when menu is hidden', () => {
    expect(
      <Skeleton
        LeftNav={LeftNav}
        MainContent={MainContent}
        Header={Header}
        isMenuHidden={false}
      />,
    ).toMatchRenderedSnapshot();
  });

  it('renders the skeleton when menu is open', () => {
    expect(
      <Skeleton
        LeftNav={LeftNav}
        MainContent={MainContent}
        Header={Header}
        isMenuHidden={true}
      />,
    ).toMatchRenderedSnapshot();
  });
});
