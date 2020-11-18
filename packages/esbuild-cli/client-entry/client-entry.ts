/* eslint-env browser */
import { io } from 'socket.io-client';

// eslint-disable-next-line no-underscore-dangle
declare let __ESBUILD_CLI_INTERNAL__: {
  PORT: number;
};

const socket = io(`http://localhost:${__ESBUILD_CLI_INTERNAL__.PORT}`);

socket.on('browserReload', () => {
  document.location.reload();
});
