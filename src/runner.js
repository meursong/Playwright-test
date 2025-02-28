const path = require('path');
const { loadTestConfig } = require('./config-loader');
const { runTest } = require('./playwright-helper');
const fs = require('fs-extra');

const main = async () => {
    const testFile = process.argv[2]; // 실행할 테스트 파일을 CLI에서 입력받음
    if (!testFile) {
        console.error('사용법: node src/runner.js <테스트 파일 경로>');
        process.exit(1);
    }

    const testConfig = loadTestConfig(testFile);
    console.log(`Running test: ${testConfig.name}`);

    await runTest(testConfig.steps);

    // 결과 저장
    const resultPath = path.join(__dirname, '../results/test-results.json');
    fs.ensureFileSync(resultPath);
    fs.writeJsonSync(resultPath, { name: testConfig.name, status: 'completed' });

    console.log('Test Success!');
}

main();
