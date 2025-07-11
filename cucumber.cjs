// cucumber.cjs

module.exports = {
  default: {
    requireModule: ["ts-node/register", "tsconfig-paths/register"],

    require: [
      "tests/support/custom-world.ts",
      "tests/features/common/hooks/**/*.ts",
      "tests/features/**/steps/**/*.ts",
    ],

    paths: ["tests/features/**/*.feature"],
  },
};
