# Phaser3 Weapon Plugin

A Phaser 3 compatible port of the Weapon Plugin shipped with Phaser CE.

The plugin is written in TypeScript and uses modern ESNext/ES6+ syntax,
but the legacy built version targets ES5.

This plugin is considered stable and should be mostly feature complete compared
to the original. If any bugs do occur please help us by reporting them.

This plugin can be installed from npm:

```bash
npm install phaser3-weapon-plugin # if you use npm
yarn add phaser3-weapon-plugin # for yarn users
```

**[Version 2 is out, read the announcement post for more information](https://medium.com/@16patsle/announcing-phaser3-weapon-plugin-v2-b662500beebf)**

## Usage

Usage of the plugin should be similar to that of the one included in Phaser CE.
See the documentation availabe at [16patsle.github.io/phaser3-weapon-plugin](https://16patsle.github.io/phaser3-weapon-plugin/) or in the `docs/` when built locally.

There are several ways to load plugins in Phaser 3.
You can load plugins externally, or include them in your bundle.
These instructions show how to load the default bundle. See the note on the
alternative bundles below, and when you might want to use them.

### Using a bundler (Webpack, Rollup, Parcel, etc.)

When using a bundler, you can just import the package directly. We recommend
importing the named export `WeaponPlugin`.

```js
import { WeaponPlugin } from 'phaser3-weapon-plugin'
```

Then you can install it into your scene:

```js
function create () {
    // Install it into a scene
    this.plugins.installScenePlugin(
        'WeaponPlugin',
        WeaponPlugin,
        'weapons',
        this
    );
}
```

This also works if you for some other reason have access to the plugin class object.

### Using a script tag

To load an external plugin, you can just use a regular script tag. The global
variable WeaponPlugin will then include the various classes, including the
plugin itself. You can install it in your scene in the following way:

```js
function create () {
    // Install it into a scene
    this.plugins.installScenePlugin(
        'WeaponPlugin',
        WeaponPlugin.WeaponPlugin,
        'weapons',
        this
    );
}
```

### Using Phaser's loader

Alternatively, you can use Phaser's plugin loader:

```js
function preload () {
    // Load the script
    this.load.scenePlugin('WeaponPlugin', 'path/to/WeaponPlugin.js', 'weaponPlugin', 'weapons');
}
```

## Difference between prebuilt files

Version 2 of this plugin is distributed in 3 different editions:
normal, legacy and modern. In addition, the raw TypeScript is compiled to
JavaScript, both with some and with no transpilation.

| Name       | Target | Format | Path                                                                       | Recommended for                            |
|------------|--------|--------|----------------------------------------------------------------------------|--------------------------------------------|
| Normal     | ES2015 | UMD    | dist/WeaponPlugin.js (main entrypoint) dist/WeaponPlugin.min.js (minified) | Script tag/Phaser loader                   |
| Legacy     | ES5    | UMD    | dist/WeaponPlugin.legacy.js dist/WeaponPlugin.legacy.min.js (minified)     | Script tag/Phaser loader (legacy support)  |
| Modern     | ESNext | UMD    | dist/WeaponPlugin.modern.js dist/WeaponPlugin.modern.min.js (minified)     | Script tag/Phaser loader (modern browsers) |
| TSC-ESNext | ESNext | ESM    | out/esnext/main.js                                                         | Webpack/bundling (support modern browsers) |
| TSC-ES2016 | ES2016 | ESM    | out/es2016/main.js (module entrypoint)                                     | Webpack/bundling                           |
| TypeScript | ESNext | TS     | src/main.ts                                                                | Usually not                                |

The legacy build is transpiled down to ES5, and also
includes the required polyfills. The normal build supports all browsers
supporting ES modules, and can be used together with the legacy build if you
want to leverage the
[module/nomodule pattern](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/).
Unless you know you need ES5, using the normal build will probably suffice.

Additionally there's the modern build, which at the moment is almost the same
as the normal build. However it targets the last 2 releases of all the major
browsers (Internet Explorer doesn't count as major), and thus only transpiles
a few of the newest language features, giving the smallest bundle size and the
best performance. As time goes on, expect this build to diverge further from
the normal build.

In addition to this, the TypeScript source code of the plugin is
available, compiled to regular JavaScript in the `out/` directory in case you
want to consume it from a bundler. It is available both as untranspiled ESNext
and transpiled down to ES2016. The latter is what Webpack will use by default.

## Building

Run `npm install` to download dependencies and build.
To rebuild you can use `npm run build`.

Use `npm run examples` to run the exampes locally,
then visit `localhost:2344` in your browser.

## Linting

To run Eslint and Prettier, use `npm run lint` (for just linting)
or `npm run lint:fix` (for fixing). The equivalent scripts for linting the examples
are `lintexamples` and `lintexamples:fix`.

## Documentation

The plugin is documented using inline JSDoc/TSDoc comments, which are processed
by TypeDoc into static documentation pages. You can run the TypeDoc generator
with `npm run docs`, which will generate updated docs in the `docs/` folder.

The documentation is also available at
[16patsle.github.io/phaser3-weapon-plugin](https://16patsle.github.io/phaser3-weapon-plugin/)

## Credits

This plugin is a port of the
[Weapon Plugin](https://github.com/photonstorm/phaser-ce/blob/f2be9bef1d953c9cd55dcd8808d109fa96731126/src/plugins/weapon/WeaponPlugin.js)
in Phaser CE by Richard Davey, and is based on the Phaser 3 Plugin template,
also by Richard Davey

The port of the plugin was started and is maintained by
[@16patsle](https://github.com/16patsle), but
[@jdotrjs](https://github.com/jdotrjs) has helped extensively with debugging
and by porting several features.
