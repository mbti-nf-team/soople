const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js',
  ],
  testPathIgnorePatterns: [
    'node_modules',
    '<rootDir>.*/public',
    '<rootDir>/.next/',
    '<rootDir>/cypress',
  ],
  coveragePathIgnorePatterns: [
    // NOTE - 오픈소스에서 가져온 코드임으로 테스트코드를 작성할 이유가 없음.
    '<rootDir>/src/components/detail/RecruitCompleteCanvasConfetti.tsx',
    '<rootDir>/src/hooks/api/auth/useAuthIdToken.ts',
    '<rootDir>/src/hooks/api/auth/useAuthUser.ts',
  ],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = async () => ({
  ...await createJestConfig(customJestConfig)(),
  transformIgnorePatterns: [
    'node_modules/(?!(@firebase|nanoid|@hookform)/)',
  ],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
});
