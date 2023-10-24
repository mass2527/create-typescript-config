import { COMPILER_OPTIONS } from "./options.js";

export const createTsConfigJson = (group: {
  transpiling: boolean;
  dom: boolean;
  purpose: string;
}) => {
  const tsConfig = {
    compilerOptions: {
      ...COMPILER_OPTIONS.base,
      ...COMPILER_OPTIONS.strictness,

      ...(group.transpiling
        ? COMPILER_OPTIONS.transpiling.true
        : COMPILER_OPTIONS.transpiling.false),

      ...(group.dom ? COMPILER_OPTIONS.dom.true : COMPILER_OPTIONS.dom.false),

      ...(group.purpose === "library"
        ? COMPILER_OPTIONS.library.default
        : group.purpose === "library-monorepo"
        ? COMPILER_OPTIONS.library.monorepo
        : {}),
    },
  };

  return JSON.stringify(tsConfig, null, 2);
};
