import axios from 'axios';
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
  PROXY = 'PROXY',
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
    }
  | {
      kind: ResultKind.PROXY;
      actualUrl: string;
      originalReq: http.IncomingMessage;
    };

export class DevServerRouter {
  private readonly staticFolder: string;

  private readonly proxy: Record<string, string>;

  constructor({
    staticFolder,
    proxy,
  }: {
    staticFolder: string;
    proxy: Record<string, string>;
  }) {
    this.staticFolder = staticFolder;
    this.proxy = proxy;
  }

  private returnStaticFile(file: string) {
    return {
      kind: ResultKind.STATIC_FILE,
      file,
    } as const;
  }

  getRoutes(req: http.IncomingMessage): RouteResult {
    const { url: reqUrl } = req;
    if (reqUrl == null) {
      return { kind: ResultKind.BAD };
    }

    for (let idx = 0; idx < Object.keys(this.proxy).length; idx += 1) {
      const from = Object.keys(this.proxy)[idx];
      const to = this.proxy[from];
      if (reqUrl.startsWith(from)) {
        const actualUrl = to + reqUrl.slice(from.length);
        return {
          kind: ResultKind.PROXY,
          actualUrl,
          originalReq: req,
        };
      }
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

async function handleProxy(
  actualUrl: string,
  originReq: http.IncomingMessage,
  res: http.ServerResponse,
) {
  try {
    const actualRes = await axios.request({
      url: actualUrl,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      method: originReq.method as any,
      headers: originReq.headers,
    });
    res.writeHead(actualRes.status, actualRes.headers);
    return res.end(JSON.stringify(actualRes.data));
  } catch (e) {
    if ('response' in e) {
      const { response } = e;
      res.writeHead(response.status, response.headers);
      return res.end(JSON.stringify(response.data));
    }
    res.writeHead(500);
    console.error(e);
    return res.end(`internal error when send proxy request to ${actualUrl}`);
  }
}

export async function handleRouteResult(
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
    case ResultKind.PROXY:
      return handleProxy(routeResult.actualUrl, routeResult.originalReq, res);
    default:
      mute || console.error('wrong routeResult', routeResult);
      res.writeHead(500);
      return res.end('internal error');
  }
}

export function startDevServer({
  port,
  buildOutputFolder,
  proxy = {},
}: {
  port: number;
  buildOutputFolder: string;
  proxy?: Record<string, string>;
}) {
  const router = new DevServerRouter({
    staticFolder: buildOutputFolder,
    proxy,
  });
  const server = http.createServer(async (req, res) => {
    const routeResult = router.getRoutes(req);
    await handleRouteResult(routeResult, res);
  });
  server.listen(port);
  const hostLink = `http://localhost:${port}/`;
  console.log(green(`dev server start@${hostLink}`));
  return new Server(server);
}
