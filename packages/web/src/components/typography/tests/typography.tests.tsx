import * as React from 'react';
import { Title, Text } from '../typography';

describe('Title', () => {
  it('renders large title', () => {
    expect(<Title.Large>Large</Title.Large>).toMatchRenderedSnapshot();
  });

  it('renders medium title', () => {
    expect(<Title.Medium>Medium</Title.Medium>).toMatchRenderedSnapshot();
  });

  it('renders small title', () => {
    expect(<Title.Small>Small</Title.Small>).toMatchRenderedSnapshot();
  });
});

describe('Text', () => {
  it('renders medium text', () => {
    expect(<Text.Medium>Medium</Text.Medium>).toMatchRenderedSnapshot();
  });

  it('renders small text', () => {
    expect(<Text.Small>Medium</Text.Small>).toMatchRenderedSnapshot();
  });

  it('renders micro text', () => {
    expect(<Text.Micro>Micro</Text.Micro>).toMatchRenderedSnapshot();
  });
});
