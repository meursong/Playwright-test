const path = require('path');
require('dotenv').config();

// 환경변수 로드 상태 자세히 확인
console.log('현재 작업 디렉토리:', process.cwd());
console.log('.env 파일 경로:', path.resolve(process.cwd(), '.env'));
console.log('환경변수 목록:', Object.keys(process.env));

// value-resolver.js 파일 생성
const resolveValue = (value, context = {}) => {
    // ENV_ 로 시작하는 환경 변수 처리
    if (typeof value === 'string' && value.startsWith('ENV_')) {
        console.log("ENV 처리중입니다.");
        const envKey = value.replace('ENV_', '');

        console.log("process.env[envKey] = ", process.env[envKey]);
        return process.env[envKey] || '';
    }

    // ${} 형식의 변수 처리
    if (typeof value === 'string' && value.includes('${')) {
        return value.replace(/\${([^}]+)}/g, (match, key) => {
            return context[key] || process.env[key] || match;
        });
    }

    // JSON 형식의 동적 값 처리
    if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
        try {
            const dynamicValue = JSON.parse(value);
            if (dynamicValue.type === 'timestamp') {
                return new Date().toISOString();
            }
            if (dynamicValue.type === 'random') {
                const length = dynamicValue.length || 8;
                return Math.random().toString(36).substring(2, length + 2);
            }
        } catch (e) {
            console.warn('동적 값 파싱 실패:', e);
        }
    }

    return value;
};

const resolveStepValue = (step, testContext = {}) => {
    return resolveValue(step.value, {
        ...testContext,
        LOGIN_USERNAME: process.env.LOGIN_USERNAME,
        LOGIN_PASSWORD: process.env.LOGIN_PASSWORD
    });
};

module.exports = { resolveValue, resolveStepValue };