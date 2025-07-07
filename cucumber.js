export default [
    'test/features/**/*.feature',
    '--require-module ts-node/register',
    '--require test/step-definitions/**/*.ts',
].join(' ');