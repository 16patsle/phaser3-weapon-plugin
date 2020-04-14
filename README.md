# Phaser3 Weapon Plugin

A Phaser 3 compatible port of the Weapon Plugin shipped with Phaser CE.

This plugin is considered stable and mostly feature complete. Most bugs should be fixed, but if any do occur please help us by reporting them.

This plugin can be installed from npm:
```
npm install phaser3-weapon-plugin # if you use npm
yarn add phaser3-weapon-plugin # for yarn users
```

## Building

Run `npm install` to download dependencies and build. To rebuild you can use `npm run build`.

Use `npm run examples` to run the exampes locally, then visit `localhost:2344` in your browser.

## Linting

To run Eslint and Prettier, use `npm run lint` (for just linting) or `npm run lint:fix` (for fixing). The equivalent scripts for linting the examples are `lintexamples` and `lintexamples:fix`.

## Documentation

The plugin is documented using inline JSDoc/TSDoc comments, which are processed by TypeDoc into static documentation pages. You can run the TypeDoc generator with `npm run docs`.

## Difference between prebuilt files

Version 2 of this plugin is distributed in 3 different editions: normal, legacy and modern. The legacy build is transpiled down to ES5, and also includes the required polyfills. The normal build supports all browsers supporting ES modules, and can be used together with the legacy build if you want to leverage the
[module/nomodule pattern](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/). Unless you know you need ES5, using the normal build will most likely be preferred.

Additionally there's the modern build, which at the moment is almost the same as the normal build. However it targets the last 2 releases of all the major browsers (Internet Explorer doesn't count as major), and thus only transpiles a few of the newest language features, giving the smallest bundle size and the best performance. As time goes on, expect this build to diverge further from the normal build.

Additionally, the TypeScript-compiled source code of the plugin will be available in the `out/` directory in case you want to consume it from a bundler, but prefer not to set up TypeScript compilation yourself.

## Using Plugins in Phaser 3

There are several ways to load plugins in Phaser 3. You can load plugins externally, or include them in your bundle.

To load an external plugin:

```js
function preload () {
    // Load the script
    this.load.script('WeaponPlugin', 'path/to/WeaponPlugin.js', 'weaponPlugin', 'weapons');
}
```

If you have the plugin object accessible, for example by including the script in a script tag, or importing it using a bundler, you can skip the loading step.

Then to install it and add it into a Scene:

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

The last parameter can be omitted if you don't want to inject it into a scene yet. This is something you can leverage if you load the plugin in a Preloader scene. If you load and install the plugin in a Preloader scene, then you can add it to any other Scenes by specifying it in the plugins array:

```js
var config = {
    scene: {
        create: create,
        plugins: [ 'WeaponPlugin' ],
        map: {
            'weapons': 'weapons'
        }
    }
};
```

Usage of the plugin should be similar to that of the one included in Phaser CE. See the documentation which should have been built in the `docs/` folder after running `npm install`, and the included examples.

The plugin is written in TypeScript and uses modern ES2015/ES6 syntax, but the legacy built version targets ES5.

## Credits
This plugin is a port of the [Weapon Plugin](https://github.com/photonstorm/phaser-ce/blob/f2be9bef1d953c9cd55dcd8808d109fa96731126/src/plugins/weapon/WeaponPlugin.js) in Phaser CE by Richard Davey, and is based on the Phaser 3 Plugin template, also by Richard Davey

The port of the plugin was started and is maintained by [@16patsle](https://github.com/16patsle), but
[@jdotrjs](https://github.com/jdotrjs) has helped extensively with debugging and by
porting several features.
