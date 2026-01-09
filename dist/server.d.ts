import { Application } from 'express';
import http from 'http';
import 'dotenv/config';
declare const app: Application;
declare const server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
export { app, server };
//# sourceMappingURL=server.d.ts.map