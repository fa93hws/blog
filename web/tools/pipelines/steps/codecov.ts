import { CommonStep, CodeCovStep } from '../serializer/types';

export function createCodeCovStep({
  name,
  file,
  yml,
}: {
  name: string;
  file: string;
  yml: string;
}): CommonStep & CodeCovStep {
  return {
    id: 'codecov_unittest',
    name: 'Upload unittest codecov',
    uses: 'codecov/codecov-action@v1',
    with: {
      file,
      yml,
      // eslint-disable-next-line no-template-curly-in-string
      token: '${{ secrets.CODECOV_TOKEN }}',
      flags: name,
    },
  };
}
