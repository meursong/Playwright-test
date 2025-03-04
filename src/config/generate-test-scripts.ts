import fs from 'fs-extra';
import path from 'path';

interface ServiceConfig {
  name: string;
  environments: string[];
  hasUi?: boolean;
}

// 서비스 설정
const services: ServiceConfig[] = [
  {
    name: 'saasdaService',
    environments: ['dev', 'staging', 'prod'],
    hasUi: true
  },
  {
    name: 'saasdaLearn',
    environments: ['dev', 'staging', 'prod'],
    hasUi: true
  },
  {
    name: 'saasdaAdmin',
    environments: ['dev', 'staging', 'prod'],
    hasUi: true
  },
  {
    name: 'prpt',
    environments: ['dev', 'prod'],
    hasUi: true
  },
  // 새로운 서비스는 여기에 추가
];

async function generateScripts() {
  const packageJsonPath = path.resolve(process.cwd(), 'package.json');
  const packageJson = await fs.readJson(packageJsonPath);

  const scripts: Record<string, string> = {};

  services.forEach((service) => {
    service.environments.forEach((env) => {
      // 기본 테스트 스크립트
      scripts[`test:${service.name}:${env}`] =
        `cross-env NODE_ENV=${env} playwright test -c src/tests/${service.name}/config.ts`;

      // UI 테스트 스크립트 (UI 모드가 필요한 경우)
      if (service.hasUi) {
        scripts[`test:${service.name}:${env}:ui`] =
          `cross-env NODE_ENV=${env} playwright test -c src/tests/${service.name}/config.ts --ui`;
      }
    });

    // 전체 환경 실행 스크립트
    scripts[`test:${service.name}:all`] =
      `npm-run-all -s ${service.environments.map(env => `test:${service.name}:${env}`).join(' ')}`;
  });

  // 모든 서비스의 특정 환경 테스트 실행 스크립트
  ['dev', 'staging', 'prod'].forEach((env) => {
    scripts[`test:all:${env}`] =
      `npm-run-all -s ${services.map(service => `test:${service.name}:${env}`).join(' ')}`;
  });

  // 모든 테스트 실행 스크립트
  scripts['test:all'] =
    `npm-run-all -s ${services.map(service => `test:${service.name}:all`).join(' ')}`;

  packageJson.scripts = {
    ...packageJson.scripts,
    ...scripts
  };

  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
  console.log('Test scripts generated successfully!');
}

generateScripts().catch(console.error);