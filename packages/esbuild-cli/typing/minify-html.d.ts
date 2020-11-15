declare module '@minify-html/js' {
  type Configuration = {};

  export function createConfiguration(options: {
    minifyJs: boolean;
  }): Configuration;

  export function minify(html: string, configuration: Configuration): string;
}
