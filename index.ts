#!/usr/bin/env node

import { green } from "colorette";
import { Command } from "commander";
import shell from "shelljs";
import { configAction } from "./bin/config.js";
import pkg from "./package.json" assert { type: "json" };
import { defaults } from "./bin/constants.js";
import { deployAction } from "./bin/deploy.js";

export const program = new Command();

program
  .name(`${pkg.name}`)
  .description(`${pkg.description}`)
  .version(`${pkg.version}`);

program
  .command("deploy")
  .description(
    green(
      "This command is used to publish to gh-pages by entering arguments via the command line",
    ),
  )
  .option(
    "-d, --dir <dir>",
    "Base directory for all source files",
    defaults.dir,
  )
  .option(
    "-s, --src <src>",
    "Pattern used to select which files to publish",
    defaults.src,
  )
  .option(
    "-b, --branch <branch>",
    "Name of the branch you are pushing to",
    defaults.branch,
  )
  .option(
    "-e, --dest <dest>",
    "Target directory within the destination branch (relative to the root)",
    defaults.dest,
  )
  .option(
    "-a, --add",
    "Only add, and never remove existing files",
    defaults.add,
  )
  .option("-x, --silent", "Do not output the repository url", defaults.silent)
  .option("-m, --message <message>", "commit message", defaults.message)
  .option("-g, --tag <tag>", "add tag to commit", defaults.tag)
  .option("-t, --dotfiles", "Include dotfiles", defaults.dotfiles)
  .option("-r, --repo <repo>", "URL of the repository you are pushing to")
  .option("-o, --remote <name>", "The name of the remote", defaults.remote)
  .option(
    "-u, --user <address>",
    'The name and email of the user (defaults to the git config).  Format is "name email".',
  )
  .option(
    "-v, --remove <pattern>",
    "Remove files that match the given pattern " +
      "(ignored if used together with --add).",
    defaults.remove,
  )
  .option("-n, --no-push", "Commit only (with no push)", defaults.push)
  .option("-f, --no-history", "Push force new commit without parent history")
  .action(deployAction);

program
  .command("config")
  .description(
    green(
      "This command is used to publish to gh-pages via a query interface in the console",
    ),
  )
  .action(configAction);

program
  .command("build")
  .description(
    green(
      'This command is for pre-building with webpack. To work correctly, you must have webpack, webpac-cli installed, webpack.config.(j|t)s configured and script "build" defined in package.json for production build.',
    ),
  )
  .action(() => {
    shell.exec("npm run build");
  });

program.parse();
