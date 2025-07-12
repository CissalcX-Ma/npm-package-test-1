# npm-package-test-1

A test for npm package.

## 0. Create a git repository and a package

0.1 `git init` or `git clone xxx`
0.2 `.gitignore`: `lib` and `node_modules`
0.3 `npm init` for `package.json` (`"type": "module"`)

    - change name to `@your-name-space/package-name` (scoped package)
    	- you need to run `npm publish --access public` (the first time)

## 1. `tsconfig.json` and source files

1.1 `npx tsc --init` (tsconfig.json)

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

1.2 src: `ask.ts`, `answer.ts`, `index.ts`

## 2. rollup settings

2.1 `npm i -D rollup @rollup/plugin-typescript rollup-plugin-delete`
2.2 `rollup.config.js`: input, output (file, format), plugins
2.3 `npm run build` (`"build": "rollup -c"`)

## 3. publish settings

3.1 update `package.json` with `exports` (what others can use your package) (`main` for CommonJS entry point, `module` or `browser` for esm entry point, and `types`. `exports` replaces esm and types)
3.2 set `files` for publish (`npm publish --dry-run`: see the files)

    - default output files: `package.json`, `LICENSE`, `README.md`

4.1 `npm whoami`
4.2 `npm login`
4.3 `npm publish --access public`

## 4. @changesets/cli setup

0. `git switch -c changesets-install`
1. `npm i -D @changesets/cli`
2. `npx changeset init`
3. change `"access": "restricted"` to `"access": "public"` in `.changeset/config.json`

## 5. github workflows setup

1. add new file `.github/workflows/release.yml`
2. add scripts in `package.json`: `"release-package": "npm run build && npx changeset publish"` (for github actions to publish)

## 5.1 github tokens and secrets

1. github -> settings -> Developer Settings -> Personal access tokens -> Tokens (classic) (check repo and workflow)
2. a repo -> settings -> secrets and variables -> actions -> new repository secrets
3. put the name of the secrets to release.yml

## 5.2 npm tokens

1. npm -> access tokens -> name -> publish
2. github step 2
3. github step 3

## 6. publish with changesets

0. a repo -> Settings -> Branches -> add classic branch protection rule -> name and Require a pull request before merging (not Require approvals)
1. `npx changesets` (after changing our code, before committing)
2. commit
3. merge the PR created by committing
4. merge the versioning PR created by changesets (new version, update changelog, delete the changeset created by changesets; will run changesets again, and publish (through github actions))
