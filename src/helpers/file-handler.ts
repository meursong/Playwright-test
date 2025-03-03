// 파일 처리 유틸리티

import { ensureDir, writeFile } from 'fs-extra';
import path from 'path';
import { env } from '../config/env-config';

export class FileHandler {
  static async saveScreenshot(testName: string, data: Buffer): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `${testName}_${timestamp}.png`;
    const filePath = path.join(env.SCREENSHOT_DIR, fileName);

    await ensureDir(env.SCREENSHOT_DIR);
    await writeFile(filePath, data);

    return filePath;
  }
}