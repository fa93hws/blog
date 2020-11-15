import { FileDescriptor } from 'webpack-manifest-plugin';

const isJs = (filename: string) => filename.endsWith('.js');
const isCss = (filename: string) => filename.endsWith('.css');
const isVendor = (filename: string) => filename.includes('vendors.');

export function generateManifest(_: object, files: FileDescriptor[]) {
  const initialChunks = files.filter(file => file.isInitial);
  const initialJs = initialChunks.filter(c => isJs(c.path));
  const initialCss = initialChunks.filter(c => isCss(c.path));
  const initialMainJs = initialJs.filter(j => !isVendor(j.path));
  const initialVendorJs = initialJs.filter(j => isVendor(j.path));

  return {
    initialVendorJs: initialVendorJs.map(j => j.path),
    initialMainJs: initialMainJs.map(j => j.path),
    initialCss: initialCss.map(c => c.path),
  };
}
