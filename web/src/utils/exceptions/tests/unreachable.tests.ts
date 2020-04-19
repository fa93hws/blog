import { UnreachableException } from '../unreachable';

describe('UnreachableException', () => {
  it('throws error', () => {
    expect(() => {
      throw new UnreachableException(('never!' as unknown) as never);
    }).toThrowErrorMatchingInlineSnapshot(`"unreachable condition: never!"`);
  });
});
