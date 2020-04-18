import * as React from 'react';
import { mount } from 'enzyme';
import { setupIntersectionObserverMock } from 'utils/tests/mock-intersection-observer';
import { createHeader } from '../create-header';

describe('createHeader', () => {
  it('should mount the component without throwing error', () => {
    setupIntersectionObserverMock();
    const Header = createHeader({
      onCloseClicked: jest.fn(),
      onMenuClicked: jest.fn(),
    });
    const element = <Header icon="cross" />;
    expect(() => mount(element)).not.toThrow();
  });
});
