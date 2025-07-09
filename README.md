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
