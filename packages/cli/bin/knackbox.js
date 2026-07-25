#!/usr/bin/env node
import { main } from "../lib/cli.js";

main(process.argv.slice(2))
  .then((code) => {
    process.exitCode = code;
  })
  .catch((error) => {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`knackbox: ${message}`);
    process.exitCode = 1;
  });
