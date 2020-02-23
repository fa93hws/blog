import { S3ActionStep, CommonStep } from '../serializer/types';

const BUCKET_NAME = 'github-cd';
const REGION = 'ap-northeast-2';
const WEBHOOK_URL =
  'https://3zrr015ofi.execute-api.ap-northeast-2.amazonaws.com/default/deploy-github-build-to-s3';
export type S3SyncStep = CommonStep & S3ActionStep;
export function createDeploySteps({
  sourceDir,
  app,
}: {
  sourceDir: string;
  app: string;
}): [S3SyncStep, CommonStep] {
  const destDir = `$GITHUB_REPOSITORY/$GITHUB_REF/$GITHUB_SHA/${app}`;
  const deployUrl = `${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${destDir}/index.html`;
  return [
    {
      id: 'deploy-to-s3',
      uses: 'jakejarvis/s3-sync-action@v0.5.1',
      name: 'Deploy to s3',
      with: {
        args: '--acl public-read --delete',
      },
      env: {
        AWS_S3_BUCKET: BUCKET_NAME,
        // eslint-disable-next-line no-template-curly-in-string
        AWS_ACCESS_KEY_ID: '${{ secrets.AWS_ACCESS_KEY_ID }}',
        // eslint-disable-next-line no-template-curly-in-string
        AWS_SECRET_ACCESS_KEY: '${{ secrets.AWS_ACCESS_KEY_VALUE }}',
        AWS_REGION: REGION,
        SOURCE_DIR: sourceDir,
        DEST_DIR: destDir,
      },
    },
    {
      id: 'display-url',
      name: 'Display deployed url',
      run: `curl "${WEBHOOK_URL}?name=${app}&commitHash=$GITHUB_SHA&url=${deployUrl}`,
    },
  ];
}
