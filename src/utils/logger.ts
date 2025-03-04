import fs from 'fs-extra';
import path from 'path';

export class Logger {
  private static logDir = 'logs';
  private static dateStr = new Date().toISOString().split('T')[0];

  static async init(): Promise<void> {
    await fs.ensureDir(this.logDir);
  }

  static async info(message: string): Promise<void> {
    await this.writeLog('INFO', message);
  }

  static async error(message: string, error?: Error): Promise<void> {
    await this.writeLog('ERROR', message, error);
  }

  private static async writeLog(
    level: string,
    message: string,
    error?: Error
  ): Promise<void> {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} [${level}] ${message}${
      error ? '\n' + error.stack : ''
    }\n`;

    await fs.appendFile(
      path.join(this.logDir, `${this.dateStr}.log`),
      logMessage
    );
  }
}