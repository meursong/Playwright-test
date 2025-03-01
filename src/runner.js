const path = require('path');
const { loadTestConfig } = require('./config-loader');
const { runTest } = require('./playwright-helper');
const fs = require('fs-extra');

async function main() {
    const targetPath = process.argv[2]; // 실행할 테스트 또는 디렉토리
    if (!targetPath) {
        console.error('사용법: node src/runner.js <테스트 파일 또는 디렉토리>');
        process.exit(1);
    }
    async function runTestsInDirectory(directory) {
        const files = fs.readdirSync(directory)
            .filter(file => file.endsWith('.json'))
            .map(file => path.join(directory, file));
        let testResults = [];
        for (const file of files) {
            console.log(`테스트 실행 : ${file}`);
            let startTime = new Date(); // 테스트 시작 시간 기록
            try {
                const testConfig = loadTestConfig(file);
                await runTest(testConfig.steps);
                let endTime = new Date(); // 테스트 종료 시간 기록
                let executionTime = endTime - startTime; // 실행 시간 계산
                testResults.push({ name: testConfig.name, status: 'success', executionTime: executionTime });
            } catch (error) {
                console.error(`❌ 테스트 실패!!: ${file}`);
                console.error(error.message);
                testResults.push({ name: file, status: 'failed', error: error.message });
            }
        }
        // 결과 JSON 파일 저장
        fs.writeFileSync('results/test-results.json', JSON.stringify(testResults, null, 2));
        console.log('모든 테스트 완료!');
    }
    const fullPath = path.resolve(targetPath);

    if (fs.existsSync(fullPath)) {
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            await runTestsInDirectory(fullPath);
        } else if (stat.isFile()) {
            console.log(`테스트 실행 : ${fullPath}`);
            const testConfig = loadTestConfig(fullPath);
            await runTest(testConfig.steps);
        }
    } else {
        console.error(`❌ 경로를 찾을 수 없음: ${targetPath}`);
    }
}

main();
