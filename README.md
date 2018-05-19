# Phaser3 Weapon Plugin

A port of the Weapon Plugin shipped with Phaser CE that's compatible with Phaser 3.

This is a work in progress.

Run `npm install` and then `npm run build` to build the plugin.

## Using Plugins in Phaser 3

You can load plugins externally, or include them in your bundle.

To load an external plugin:

```
function preload ()
{
    this.load.plugin('WeaponPlugin', 'path/to/WeaponPlugin.js');
}
```

Then to install it into a Scene:

```
    this.sys.install('WeaponPlugin');
```

If you load the plugins in a Preloader scene then you can add them to any other Scenes by specifying them in the plugins array:

```
var config = {
    scene: {
        create: create,
        plugins: [ 'WeaponPlugin' ],
        map: {
            'weapon': 'weapon'
        }
    }
};
```

Usage of the plugin should be similar to that of the one included in Phaser CE. See inline JSDocs, more docs coming later.

The plugin currently targets ES2015/ES6.

This plugin is a port of the [Weapon Plugin](https://github.com/photonstorm/phaser-ce/blob/f2be9bef1d953c9cd55dcd8808d109fa96731126/src/plugins/weapon/WeaponPlugin.js) in Phaser CE by Richard Davey, and is based on the Phaser 3 Plugin template, also by Richard Davey
