# Djess-deploy-gh-pages

[![NPM](https://nodei.co/npm/djess-deploy-gh-pages.png)](https://www.npmjs.com/package/djess-deploy-gh-pages)

<p align="center">
<img alt="Badge" src="https://github.com/djess-v/otus--homework--22/actions/workflows/sanity-check.yml/badge.svg" />
</p>

Console application for publishing pages to github.

## Global installation

```properties
npm install -g djess-deploy-gh-pages
```

## How to use:

### Command - deploy

```
Options:
  -d, --dir <dir>          Base directory for all source files (default: "dist")
  -s, --src <src>          Pattern used to select which files to publish (default: "**/*")
  -b, --branch <branch>    Name of the branch you are pushing to (default: "gh-pages")
  -e, --dest <dest>        Target directory within the destination branch (relative to the root) (default: ".")
  -a, --add                Only add, and never remove existing files (default: false)
  -x, --silent             Do not output the repository url (default: false)
  -m, --message <message>  commit message (default: "Updates")
  -g, --tag <tag>          add tag to commit (default: "")
  -t, --dotfiles           Include dotfiles (default: false)
  -r, --repo <repo>        URL of the repository you are pushing to
  -o, --remote <name>      The name of the remote (default: "origin")
  -u, --user <address>     The name and email of the user (defaults to the git config).  Format is "name email".
  -v, --remove <pattern>   Remove files that match the given pattern (ignored if used together with --add). (default: ".")
  -n, --no-push            Commit only (with no push)
  -f, --no-history         Push force new commit without parent history
  -h, --help               display help for command
```

#### Deploy without parameters

Note: the git user must be authorized, the remote repository must be linked to the local repository, and the project must be in the dist folder.

```properties
npx djess-deploy-gh-pages deploy
```

#### Deploy with parameters

Using the parameters you can change the deployment configuration

```properties
npx djess-deploy-gh-pages --dir docs --repo https://github.com/Djess-V/otus--homework--22.git -m Hello!
```

### Command - config

Use this command to configure the deployment configuration through the command line interface and deploy the application

```properties
npx djess-deploy-gh-pages config
```

### Command - build

This command is for pre-building with webpack. To work correctly, you must have webpack, webpac-cli installed, webpack.config.(j|t)s configured and script "build" defined in package.json for production build.

```properties
npx djess-deploy-gh-pages build
```
