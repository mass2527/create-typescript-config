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
