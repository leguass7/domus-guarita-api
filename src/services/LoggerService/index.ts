import { join } from 'path';
import { Logger, createLogger, transports, format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};
const levels = { error: 0, warn: 1, info: 2, http: 3, debug: 4 };

const customFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] ${message}`;
});

export interface LoggerServiceOptions {
  pathVolume: string;
  appName: string;
  appVersion: string;
}

export class LoggerService {
  public filelogger: Logger;
  public logger: Logger;

  constructor({ pathVolume, appName, appVersion }: LoggerServiceOptions) {
    const transportDaily: DailyRotateFile = new DailyRotateFile({
      dirname: join(pathVolume, 'logs'),
      filename: `${appName}-${appVersion}-%DATE%.log`,
      auditFile: join(pathVolume, 'logs', 'winston-daily-rotate-config-audit.json'),
      datePattern: 'YYYY-MM-DD',
      // frequency: '1d',
      zippedArchive: true,
      maxSize: '2m',
      maxFiles: '1d',
    });

    this.logger = createLogger({
      exitOnError: false,
      format: format.combine(format.colorize({ all: true, colors }), format.simple()),
      transports: [new transports.Console()],
      levels,
    });

    this.filelogger = createLogger({
      exitOnError: false,
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-dd HH:mm:ss' }),
        customFormat,
        //
      ),
      transports: [transportDaily],
      levels,
    });
  }

  logging(...args: any[]) {
    this.logger.info(args.join(' '));
    this.filelogger.info(args.join(' '));
  }

  logError(...args: any[]) {
    this.logger.error(args.join(' '));
    this.filelogger.error(args.join(' '));
  }
}

export const DevLogger = createLogger({
  exitOnError: false,
  format: format.combine(format.colorize({ all: true, colors }), format.timestamp({ format: 'YYYY-MM-dd HH:mm:ss' }), customFormat),
  transports: [new transports.Console()],
  levels,
});

export function logDev(...args: any[]) {
  // const isTesting = ['testing', 'test'].includes(process.env.NODE_ENV);
  // if (!isTesting) DevLogger.info(args.join(' '));
  // return isDevMode && Logger.info(args.join(' '));
  DevLogger.info(args.join(' '));
}
