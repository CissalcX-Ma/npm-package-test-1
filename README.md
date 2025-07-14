# npm-package-test-1

A test for npm package.

## 0. Create a git repository and a package

1. `git init` or `git clone xxx`
2. `.gitignore`: `lib` and `node_modules`
3. `npm init` for `package.json` (`"type": "module"`)
   - change name to `@your-name-space/package-name` (scoped package)
     - you need to run `npm publish --access public` (the first time)

## 1. `tsconfig.json` and source files

1. `npx tsc --init` (tsconfig.json)

```json
{
	"compilerOptions": {
		"declaration": true,
		"declarationDir": "lib/types",
		"target": "es2016",
		"moduleResolution": "node"
	},
	"include": ["src/**/*"],
	"exclude": ["node_modules", "lib"]
}
```

2. src: `ask.ts`, `answer.ts`, `index.ts`

## 2. rollup settings

1. `npm i -D rollup @rollup/plugin-typescript rollup-plugin-delete`
2. `rollup.config.js`: input, output (file, format), plugins
3. `npm run build` (`"build": "rollup -c"`)

## 3. publish settings

1. update `package.json` with `exports` (what others can use your package) (`main` for CommonJS entry point, `module` or `browser` for esm entry point, and `types`. `exports` replaces esm and types)
2. set `files` for publish (`npm publish --dry-run`: see the files)
   - default output files: `package.json`, `LICENSE`, `README.md`

npm:

0.1 `npm whoami`

0.2 `npm login`

1. `npm publish --access public`

## 4. @changesets/cli setup

0. `git switch -c changesets-install`
1. `npm i -D @changesets/cli`
2. `npx changeset init`
3. change `"access": "restricted"` to `"access": "public"` in `.changeset/config.json`

## 5. github workflows setup

1. add new file `.github/workflows/release.yml`
2. add scripts in `package.json`: `"release-package": "npm run build && npx changeset publish"` (for github actions to publish)

### 5.1 github tokens and secrets

1. github -> settings -> Developer Settings -> Personal access tokens -> Tokens (classic) (check repo and workflow)
2. a repo -> settings -> secrets and variables -> actions -> new repository secrets
3. put the name of the secrets to release.yml

### 5.2 npm tokens

1. npm -> access tokens -> name -> publish
2. github step 2
3. github step 3

## 6. publish with changesets

0. a repo -> Settings -> Branches -> add classic branch protection rule -> name and Require a pull request before merging (not Require approvals)
1. `npx changeset` (after changing our code, before committing)
2. commit and push
3. merge the PR created by committing
4. merge the versioning PR created by changesets (Version Packages #n, with new version, updating changelog, deleting the changeset created by changesets; will run changesets again, and publish (through github actions), add a tag in github)

## 7. pre release

### 7.1 link

- provider: `npm link` (`npm run build` before linking) (`npm unlink -g`)
- consumer: npm link provider-package-name

(`npm root -g`)

### 7.2 pre release

1. setup pre-release branch
   1. `git switch -c pre-release`
   2. `npx changeset pre enter alpha`
   3. `release.yml`: add `pre-release` the same level as `main` in branches
   4. add, commit and push
2. do your job in another branch frome the pre-release branch
   1. coding
   2. `npx changeset` and commit and push
3. merge
   1. Open a PR to the pre-release branch and merge to it
   2. automatically: changesets actions will opens a versioning PR in pre-release mode
   3. merge this versioning PR (will create a alpha package)
4. merge to main
   1. switch to a new branch
   2. exit the pre-release mode and open a PR to merge to the main branch (`npx changeset pre exit`)
   3. add, commit and push
   4. merge the exit branch to main
   5. merge the PR of changesets to publish the new version
