#!/usr/bin/env node
// https://docs.npmjs.com/cli/v10/configuring-npm/package-json#bin

import * as p from "@clack/prompts";
import { writeFileSync } from "fs";

p.intro("create-typescript-config");

const group = await p.group(
  {
    transpiling: () =>
      p.confirm({ message: "Do you want to transpile with TypeScript?" }),
    dom: () => p.confirm({ message: "Does your code run in the DOM?" }),
    purpose: () =>
      p.select({
        message: "What is your purpose?",
        options: [
          { value: "project", label: "for a project" },
          { value: "library", label: "for a library" },
          { value: "library-monorepo", label: "for a library in a monorepo" },
        ],
        initialValue: "project",
      }),
  },
  {
    onCancel: () => {
      p.cancel("Operation cancelled.");
      process.exit(0);
    },
  }
);

export const COMPILER_OPTIONS = {
  base: {
    /* Base Options: */
    esModuleInterop: true,
    skipLibCheck: true,
    target: "es2022",
    verbatimModuleSyntax: true,
    allowJs: true,
    resolveJsonModule: true,
    moduleDetection: "force",
  },
  strictness: {
    /* Strictness */
    strict: true,
    noUncheckedIndexedAccess: true,
  },
  transpiling: {
    true: {
      /* If transpiling with TypeScript: */
      moduleResolution: "NodeNext",
      module: "NodeNext",
      outDir: "dist",
      sourceMap: true,
    },
    false: {
      /* If NOT transpiling with TypeScript: */
      moduleResolution: "Bundler",
      module: "ESNext",
      noEmit: true,
    },
  },
  dom: {
    true: {
      /* If your code runs in the DOM: */
      lib: ["es2022", "dom", "dom.iterable"],
    },
    false: {
      /* If your code doesn't run in the DOM: */
      lib: ["es2022"],
    },
  },
  library: {
    default: {
      /* If you're building for a library: */
      declaration: true,
    },
    monorepo: {
      /* If you're building for a library in a monorepo: */
      composite: true,
      declarationMap: true,
    },
  },
};

const tsConfig = {
  compilerOptions: {
    ...COMPILER_OPTIONS.base,
    ...COMPILER_OPTIONS.strictness,
  },
};

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

writeFileSync("tsconfig.json", JSON.stringify(tsConfig, null, 2));

p.outro(`tsconfig.json file is successfully created!`);
