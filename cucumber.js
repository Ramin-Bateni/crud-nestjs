module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: [
      'features/step-definitions/**/*.ts',
      'features/support/**/*.ts'
    ],
    requireModule: [
      'ts-node/register',
      'tsconfig-paths/register'
    ],
    format: ['@cucumber/pretty-formatter'],
    parallel: 0
  }
}; 