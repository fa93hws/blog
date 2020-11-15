import * as React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { StorySection } from 'components/storybook/storybook';
import { Pagination } from '../pagination';

storiesOf('components.pagination', module)
  .addDecorator(StoryRouter())
  .add('pagination', () => {
    const getLink = (page: number) => `?page=${page}`;
    const ten = Array.from(new Array(10), (_, idx) => idx + 1);
    const seven = Array.from(new Array(7), (_, idx) => idx + 1);
    return (
      <>
        <StorySection name="1 ... 10">
          {ten.map(num => (
            <Pagination
              key={num}
              currentPage={num}
              totalPage={10}
              getLink={getLink}
            />
          ))}
        </StorySection>
        <StorySection name="1 ... 7">
          {seven.map(num => (
            <Pagination
              key={num}
              currentPage={num}
              totalPage={7}
              getLink={getLink}
            />
          ))}
        </StorySection>
      </>
    );
  });
