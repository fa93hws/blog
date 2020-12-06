import type { Color } from '@material-ui/lab/Alert';
import type { Options } from '@components/alert/alert-store';

// TODO Move services to here as well
export type GlobalContext = {
  showGlobalMsg(severity: Color, msg: string, options?: Options): void;
};
