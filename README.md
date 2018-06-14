# Phaser3 Weapon Plugin

A Phaser 3 compatible port of the Weapon Plugin shipped with Phaser CE.

This is a work in progress and is currently in beta.

This plugin can be installed from npm:
```
npm install phaser3-weapon-plugin@beta // if you use npm
yarn add phaser3-weapon-plugin@beta // for yarn users
```

## Building

Run `npm install` and then `npm run build` to build the plugin locally.

Use `npm run examples` to run the exampes locally, then visit `localhost:2344` in your browser.

## Using Plugins in Phaser 3

You can load plugins externally, or include them in your bundle.

To load an external plugin:

```js
function preload ()
{
    this.load.scenePlugin('WeaponPlugin', 'path/to/WeaponPlugin.js', 'weaponPlugin', 'weapons');
}
```

Then to install it into a Scene:

```js
    this.sys.install('WeaponPlugin');
```

If you load the plugins in a Preloader scene then you can add them to any other Scenes by specifying them in the plugins array:

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

Usage of the plugin should be similar to that of the one included in Phaser CE. See inline JSDocs, and the included examples.

The plugin is written in ES2015/ES6, but the built version targets ES5.

## Missing/broken features
* Debug features (weapon.debug)

## Untested features
* Bullet animation


## Credits
This plugin is a port of the [Weapon Plugin](https://github.com/photonstorm/phaser-ce/blob/f2be9bef1d953c9cd55dcd8808d109fa96731126/src/plugins/weapon/WeaponPlugin.js) in Phaser CE by Richard Davey, and is based on the Phaser 3 Plugin template, also by Richard Davey

The port of the plugin was started by [@16patsle](https://github.com/16patsle), but
[@jdotrjs](https://github.com/jdotrjs) has helped extensively with debugging and
implementing broken features.
