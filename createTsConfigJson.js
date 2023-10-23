import { COMPILER_OPTIONS } from "./options.js";

const tsConfig = {
  compilerOptions: {
    ...COMPILER_OPTIONS.base,
    ...COMPILER_OPTIONS.strictness,
  },
};

export const createTsConfigJson = (group) => {
  if (group.transpiling) {
    Object.assign(tsConfig.compilerOptions, COMPILER_OPTIONS.transpiling.true);
  } else {
    Object.assign(tsConfig.compilerOptions, COMPILER_OPTIONS.transpiling.false);
  }

  if (group.dom) {
    Object.assign(tsConfig.compilerOptions, COMPILER_OPTIONS.dom.true);
  } else {
    Object.assign(tsConfig.compilerOptions, COMPILER_OPTIONS.dom.false);
  }

  if (group.purpose === "library") {
    Object.assign(tsConfig.compilerOptions, COMPILER_OPTIONS.library.default);
  } else if (group.purpose === "library-monorepo") {
    Object.assign(tsConfig.compilerOptions, COMPILER_OPTIONS.library.monorepo);
  }

  return JSON.stringify(tsConfig, null, 2);
};
