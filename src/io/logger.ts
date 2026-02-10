import fs from 'node:fs';
import path from 'node:path';
import pino from 'pino';

const LOG_DIR = path.resolve('src/logs');
const LOG_PATH = path.resolve(LOG_DIR, 'app.log');

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

const streams = [
  { stream: pino.destination(1) },
  { stream: pino.destination(LOG_PATH) },
];

export const logger = pino(
  {
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  },
  pino.multistream(streams),
);
