# npm-package-test-1

A test for npm package

0.1 `.gitignore`: lib and node_modules and package-lock.json
0.2 `npm init` for `package.json`

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

2.1 `npm i -D rollup rollup-plugin-typescript2 rollup-plugin-delete`
2.2 `rollup.config.js`
2.3 `npm run build`

3.1 update `package.json` with `exports` (what others can use your package)
3.2 set `files` for publish (`npm publish --dry-run`: see the files)

    - default output files: `package.json`, `LICENSE`, `README.md`

4.1 `npm whoami`
4.2 `npm login`
4.3 `npm publish --access public`

## @changesets/cli

0. `git switch -c changesets-install`
1. `npm i -D @changesets/cli`
2. `npx changeset init`
3. change `"access": "restricted"` to `"access": "public"` in `.changeset/config.json`

## github workflow

1. add new fil `github/workflow/release.yml`
2. add scripts in `package.json`: `"release-package": "npm run build && npx changeset publish"`

## github tokens and secrets

1. github -> settings -> Developer Settings -> Personal access tokens -> Tokens (classic) (repo and workflow)
2. a repo -> settings -> secrets and variables -> actions -> new repository secrets
3. put the name of the secrets to release.yml

## npm tokens

1. npm -> access tokens -> name -> publish
2. github step 2
3. put the name of the secrets to release.yml
