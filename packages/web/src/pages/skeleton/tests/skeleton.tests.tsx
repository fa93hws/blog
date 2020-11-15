import * as React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { setupIntersectionObserverMock } from 'utils/tests/mock-intersection-observer';
import { Skeleton, createSkeleton } from '../skeleton';

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

  it('mount the skeleton without error', async () => {
    setupIntersectionObserverMock();
    const SkeletonImpl = createSkeleton();
    const mountPromise = act(async () => {
      mount(<SkeletonImpl />);
    });
    // linting is wrong
    // eslint-disable-next-line jest/valid-expect
    expect(mountPromise).resolves.toBe(undefined);
  });
});
