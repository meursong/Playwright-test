import path from 'path';
import fs from 'fs-extra';
import { loadTestConfig } from '../core/config-loader';
import { runTest } from '../helpers/playwright-helper';
import { TestResult, TestConfig } from '../config/types';

const runTestsInDirectory = async (directory: string): Promise<void> => {
  const files = fs.readdirSync(directory)
    .filter(file => file.endsWith('.json'))
    .map(file => path.join(directory, file));

  const testResults: TestResult[] = [];

  for (const file of files) {
    console.log(`테스트 실행 : ${file}`);
    const startTime = new Date();

    try {
      const testConfig = loadTestConfig(file);
      await runTest(testConfig.steps);
      const endTime = new Date();
      const executionTime = endTime.getTime() - startTime.getTime();

      testResults.push({
        name: testConfig.name,
        status: 'success',
        executionTime
      });
    } catch (error) {
      console.error(`❌ 테스트 실패!!: ${file}`);
      console.error(error instanceof Error ? error.message : String(error));

      testResults.push({
        name: file,
        status: 'failed',
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  const dateTime = new Date()
    .toISOString()
    .replace(/[:.]/g, '-')
    .replace('T', '_')
    .slice(0, 19);

  await fs.writeJson(
    `results/test-results-${dateTime}.json`,
    testResults,
    { spaces: 2 }
  );

  console.log('모든 테스트 완료!');
};

const main = async (): Promise<void> => {
  const targetPath = process.argv[2];

  if (!targetPath) {
    console.error('사용법: ts-node src/runner.ts <테스트 파일 또는 디렉토리>');
    process.exit(1);
  }

  const fullPath = path.resolve(targetPath);

  if (await fs.pathExists(fullPath)) {
    const stat = await fs.stat(fullPath);

    if (stat.isDirectory()) {
      await runTestsInDirectory(fullPath);
    } else if (stat.isFile()) {
      console.log(`테스트 실행 : ${fullPath}`);
      const testConfig = loadTestConfig(fullPath);
      await runTest(testConfig.steps);
    }
  } else {
    console.error(`❌ 경로를 찾을 수 없음: ${targetPath}`);
    process.exit(1);
  }
};

main().catch(error => {
  console.error('예상치 못한 오류 발생:', error);
  process.exit(1);
});