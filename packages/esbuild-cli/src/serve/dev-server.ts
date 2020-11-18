import * as http from 'http';
import * as mime from 'mime';
import * as path from 'path';
import * as fs from 'fs';
import { green } from 'chalk';
import { Server } from 'socket.io';

export const enum ResultKind {
  BAD = 'BAD_REQUEST',
  NOT_FOUND = 'NOT_FOUND',
  STATIC_FILE = 'STATIC_FILE',
}
type RouteResult =
  | {
      kind: ResultKind.BAD;
    }
  | {
      kind: ResultKind.NOT_FOUND;
    }
  | {
      kind: ResultKind.STATIC_FILE;
      file: string;
    };

export class DevServerRouter {
  private readonly staticFolder: string;

  constructor({ staticFolder }: { staticFolder: string }) {
    this.staticFolder = staticFolder;
  }

  private returnStaticFile(file: string) {
    return {
      kind: ResultKind.STATIC_FILE,
      file,
    };
  }

  getRoutes(reqUrl: string | undefined): RouteResult {
    if (reqUrl == null) {
      return { kind: ResultKind.BAD };
    }
    if (reqUrl == null) {
      return { kind: ResultKind.NOT_FOUND };
    }
    const maybeFile = path.join(this.staticFolder, reqUrl);
    if (fs.existsSync(maybeFile)) {
      if (fs.lstatSync(maybeFile).isDirectory()) {
        if (fs.existsSync(path.join(maybeFile, 'index.html'))) {
          return this.returnStaticFile(path.join(maybeFile, 'index.html'));
        }
        return this.returnStaticFile(
          path.join(this.staticFolder, 'index.html'),
        );
      }
      return this.returnStaticFile(maybeFile);
    }
    if (path.extname(reqUrl) === '') {
      return this.returnStaticFile(path.join(this.staticFolder, 'index.html'));
    }
    return { kind: ResultKind.NOT_FOUND };
  }
}

export function handleRouteResult(
  routeResult: RouteResult,
  res: http.ServerResponse,
  mute = false,
) {
  switch (routeResult.kind) {
    case ResultKind.BAD:
      res.writeHead(400);
      return res.end('url is null?');
    case ResultKind.NOT_FOUND:
      res.writeHead(404);
      return res.end('resource does not exist');
    case ResultKind.STATIC_FILE:
      // eslint-disable-next-line no-case-declarations
      const mimeType = mime.getType(routeResult.file);
      mimeType && res.setHeader('Content-Type', mimeType);
      res.writeHead(200);
      return res.end(fs.readFileSync(routeResult.file));
    default:
      mute || console.error('wrong routeResult', routeResult);
      res.writeHead(500);
      return res.end('internal error');
  }
}

export function startDevServer({
  port,
  buildOutputFolder,
}: {
  port: number;
  buildOutputFolder: string;
}) {
  const router = new DevServerRouter({
    staticFolder: buildOutputFolder,
  });
  const server = http.createServer((req, res) => {
    const routeResult = router.getRoutes(req.url);
    handleRouteResult(routeResult, res);
  });
  server.listen(port);
  const hostLink = `http://localhost:${port}/`;
  console.log(green(`dev server start@${hostLink}`));
  return new Server(server);
}
