import * as React from 'react';
import { mount } from 'enzyme';
import { setupIntersectionObserverMock } from 'utils/tests/mock-intersection-observer';
import { Skeleton, createSkeleton } from '../skeleton';
import 'mobx-react/batchingOptOut';

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

  it('mount the skeleton without error', () => {
    setupIntersectionObserverMock();
    const SkeletonImpl = createSkeleton();
    expect(() => mount(<SkeletonImpl />)).not.toThrow();
  });
});
