#!/usr/bin/env node
// https://docs.npmjs.com/cli/v10/configuring-npm/package-json#bin

import * as p from "@clack/prompts";
import { writeFileSync } from "fs";
import { createTsConfigJson } from "./createTsConfigJson.js";

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

writeFileSync("tsconfig.json", createTsConfigJson(group));

p.outro(`tsconfig.json file is successfully created!`);
