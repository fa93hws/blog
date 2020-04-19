import * as React from 'react';
import {
  BlogListProto,
  BlogAbstractProto,
} from 'services/blog-list/blog-list.proto';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { createHomePage, HomePage } from '../home';

describe('HomePage', () => {
  const blogAbstracts: BlogAbstractProto[] = [
    {
      abstract: 'abstract1',
      time: '1999年2月2日',
      title: 'title1',
      id: 'guming1',
    },
    {
      abstract: 'abstract2',
      time: '1999年2月2日',
      title: 'title2',
      id: 'guming2',
    },
  ];

  it('renders the homepage at page 1', () => {
    const list: BlogListProto = {
      currentPage: 1,
      totalPage: 10,
      blogAbstracts,
    };
    expect(
      <MemoryRouter>
        <HomePage blogList={list} />
      </MemoryRouter>,
    ).toMatchRenderedSnapshot();
  });

  it('mounts the stateful homepage without error', async () => {
    const HomePageImpl = createHomePage();
    const mountPromise = act(async () => {
      mount(
        <MemoryRouter>
          <HomePageImpl />
        </MemoryRouter>,
      );
    });
    // linting is wrong
    // eslint-disable-next-line jest/valid-expect
    expect(mountPromise).resolves.toBe(undefined);
  });
});
