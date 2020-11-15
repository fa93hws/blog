import { Resolve } from 'webpack';
import { getResolveOptionForCss } from '../postcss-options';

describe('getResolveOptionForCss', () => {
  it('add ~prefix to all keys', () => {
    const option: Resolve = {
      alias: {
        a: 'path_to_a',
        b: 'path_to_b',
      },
    };
    const cssOption = getResolveOptionForCss(option);
    expect(cssOption.alias).toEqual({
      '~a': 'path_to_a',
      '~b': 'path_to_b',
    });
  });

  it('overwrite extension to css only', () => {
    const option: Resolve = {
      extensions: ['js', 'ts', 'tsx', 'jsx'],
    };
    const cssOption = getResolveOptionForCss(option);
    expect(cssOption.extensions).toEqual(['css']);
  });
});
