<a name="Bullet"></a>

## Bullet
**Kind**: global class  

* [Bullet](#Bullet)
    * [new Bullet(scene, x, y, key, frame)](#new_Bullet_new)
    * [.data](#Bullet+data) : <code>Object</code>
    * [.prepare(x, y)](#Bullet+prepare) ⇒ <code>void</code>
    * [.kill()](#Bullet+kill) ⇒ [<code>Bullet</code>](#Bullet)
    * [.update()](#Bullet+update) ⇒ [<code>Bullet</code>](#Bullet)

<a name="new_Bullet_new"></a>

### new Bullet(scene, x, y, key, frame)
Create a new `Bullet` object. Bullets are used by the `Weapon` class, and are normal Sprites,
with a few extra properties in the data object to handle Weapon specific features.


| Param | Type | Description |
| --- | --- | --- |
| scene | <code>Phaser.Scene</code> | A reference to the currently running scene. |
| x | <code>number</code> | The x coordinate (in world space) to position the Particle at. |
| y | <code>number</code> | The y coordinate (in world space) to position the Particle at. |
| key | <code>string</code> | This is the image or texture used by the Particle during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture. |
| frame | <code>string</code> \| <code>number</code> | If this Particle is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index. |

<a name="Bullet+data"></a>

### bullet.data : <code>Object</code>
Data used by this bullet, accessed from the Weapon (aka bulletManager)

**Kind**: instance property of [<code>Bullet</code>](#Bullet)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| data.bulletManager | [<code>Weapon</code>](#Weapon) | The instance that manages this bullet |
| data.fromX | <code>Number</code> | The x coordinate this bullet launched from |
| data.fromY | <code>Number</code> | The y coordinate this bullet launched from |
| data.rotateToVelocity | <code>Boolean</code> | Should the bullet rotate to face the direction it's moving? |
| data.killType | <code>Number</code> | When should this bullet be killed |
| data.killDistance | <code>Number</code> | Distance in pixels before the bullet wil be killed when using `consts.KILL_DISTANCE` |

<a name="Bullet+prepare"></a>

### bullet.prepare(x, y) ⇒ <code>void</code>
Prepares this bullet to be fired and interact with the rest of the scene
again.

**Kind**: instance method of [<code>Bullet</code>](#Bullet)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | The x coordinate this bullet launched from |
| y | <code>Number</code> | The y coordinate this bullet launched from |

<a name="Bullet+kill"></a>

### bullet.kill() ⇒ [<code>Bullet</code>](#Bullet)
Kills the Bullet, freeing it up for re-use by the Weapon bullet pool.
Also dispatches the `Weapon`s kill signal.

**Kind**: instance method of [<code>Bullet</code>](#Bullet)  
**Returns**: [<code>Bullet</code>](#Bullet) - This instance of the bullet class  
<a name="Bullet+update"></a>

### bullet.update() ⇒ [<code>Bullet</code>](#Bullet)
Updates the Bullet, killing as required.

**Kind**: instance method of [<code>Bullet</code>](#Bullet)  
**Returns**: [<code>Bullet</code>](#Bullet) - This instance of the bullet class  
