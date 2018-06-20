<a name="Weapon"></a>

## Weapon
The Weapon provides the ability to easily create a bullet pool and manager.

Weapons fire [Bullet](#Bullet) objects, which are essentially Sprites with a
few extra properties. The Bullets are enabled for Arcade Physics. They do
not currently work with P2 Physics.

The Bullets are created inside of [weapon.bullets](#bullets), which is
a [Phaser.GameObjects.Group](Phaser.GameObjects.Group) instance. Anything you can usually do
with a Group, such as move it around the display list, iterate it, etc can
be done to the bullets Group too.

Bullets can have textures and even animations. You can control the speed at
which they are fired, the firing rate, the firing angle, and even set things
like gravity for them.

A small example, using add.weapon, assumed to be running from within a
[Phaser.Scene#create](Phaser.Scene#create) method:

```javascript
var weapon = this.add.weapon(10, 'bullet');
weapon.fireFrom.set(300, 300);
this.input.onDown.add(weapon.fire, this); // Update this
```

**Kind**: global class  

* [Weapon](#Weapon)
    * [new Weapon(scene, bulletLimit, key, frame, group)](#new_Weapon_new)
    * [.debugPhysics](#Weapon+debugPhysics) : <code>Boolean</code>
    * [.bullets](#Weapon+bullets) : <code>Phaser.GameObjects.Group</code>
    * [.autoExpandBulletsGroup](#Weapon+autoExpandBulletsGroup) : <code>boolean</code>
    * [.autofire](#Weapon+autofire) : <code>boolean</code>
    * [.shots](#Weapon+shots) : <code>number</code>
    * [.fireLimit](#Weapon+fireLimit) : <code>number</code>
    * [.fireRate](#Weapon+fireRate) : <code>number</code>
    * [.fireRateVariance](#Weapon+fireRateVariance) : <code>number</code>
    * [.fireFrom](#Weapon+fireFrom) : <code>Phaser.Geom.Rectangle</code>
    * [.fireAngle](#Weapon+fireAngle) : <code>integer</code>
    * [.bulletInheritSpriteSpeed](#Weapon+bulletInheritSpriteSpeed) : <code>boolean</code>
    * [.bulletAnimation](#Weapon+bulletAnimation) : <code>string</code>
    * [.bulletFrameRandom](#Weapon+bulletFrameRandom) : <code>boolean</code>
    * [.bulletFrameCycle](#Weapon+bulletFrameCycle) : <code>boolean</code>
    * [.bulletWorldWrap](#Weapon+bulletWorldWrap) : <code>boolean</code>
    * [.bulletWorldWrapPadding](#Weapon+bulletWorldWrapPadding) : <code>integer</code>
    * [.bulletAngleOffset](#Weapon+bulletAngleOffset) : <code>number</code>
    * [.bulletAngleVariance](#Weapon+bulletAngleVariance) : <code>number</code>
    * [.bulletSpeed](#Weapon+bulletSpeed) : <code>number</code>
    * [.bulletSpeedVariance](#Weapon+bulletSpeedVariance) : <code>number</code>
    * [.bulletLifespan](#Weapon+bulletLifespan) : <code>number</code>
    * [.bulletKillDistance](#Weapon+bulletKillDistance) : <code>number</code>
    * [.bulletGravity](#Weapon+bulletGravity) : <code>Phaser.Math.Vector2</code>
    * [.bulletRotateToVelocity](#Weapon+bulletRotateToVelocity) : <code>boolean</code>
    * [.bulletKey](#Weapon+bulletKey) : <code>string</code>
    * [.bulletFrame](#Weapon+bulletFrame) : <code>string</code> \| <code>integer</code>
    * [.bounds](#Weapon+bounds) : <code>Phaser.Geom.Rectangle</code>
    * [.bulletFrames](#Weapon+bulletFrames) : <code>Array</code>
    * [.trackedSprite](#Weapon+trackedSprite) : <code>Phaser.GameObjects.Sprite</code> \| <code>Object</code>
    * [.trackedPointer](#Weapon+trackedPointer) : <code>Phaser.Input.Pointer</code>
    * [.multiFire](#Weapon+multiFire) : <code>boolean</code>
    * [.trackRotation](#Weapon+trackRotation) : <code>boolean</code>
    * [.trackOffset](#Weapon+trackOffset) : <code>Phaser.Math.Vector2</code>
    * [.bulletClass](#Weapon+bulletClass)
    * [.bulletKillType](#Weapon+bulletKillType)
    * [.bulletCollideWorldBounds](#Weapon+bulletCollideWorldBounds)
    * [.x](#Weapon+x)
    * [.y](#Weapon+y)
    * [.createBullets([quantity], [key], [frame], [group])](#Weapon+createBullets) ⇒ [<code>Weapon</code>](#Weapon)
    * [.forEach(callback, callbackContext, [...args])](#Weapon+forEach) ⇒ [<code>Weapon</code>](#Weapon)
    * [.pauseAll()](#Weapon+pauseAll) ⇒ [<code>Weapon</code>](#Weapon)
    * [.resumeAll()](#Weapon+resumeAll) ⇒ [<code>Weapon</code>](#Weapon)
    * [.killAll()](#Weapon+killAll) ⇒ [<code>Weapon</code>](#Weapon)
    * [.resetShots([newLimit])](#Weapon+resetShots) ⇒ [<code>Weapon</code>](#Weapon)
    * [.trackSprite(sprite, [offsetX], [offsetY], [trackRotation])](#Weapon+trackSprite) ⇒ [<code>Weapon</code>](#Weapon)
    * [.trackPointer([pointer], [offsetX], [offsetY])](#Weapon+trackPointer) ⇒ [<code>Weapon</code>](#Weapon)
    * [.fireMany(positions, [from])](#Weapon+fireMany) ⇒ <code>array</code>
    * [.fireOffset([offsetX], [offsetY])](#Weapon+fireOffset) ⇒ [<code>Bullet</code>](#Bullet)
    * [.fireAtPointer([pointer])](#Weapon+fireAtPointer) ⇒ [<code>Bullet</code>](#Bullet)
    * [.fireAtSprite([sprite])](#Weapon+fireAtSprite) ⇒ [<code>Bullet</code>](#Bullet)
    * [.fireAtXY([x], [y])](#Weapon+fireAtXY) ⇒ [<code>Bullet</code>](#Bullet)
    * [.fire([from], [x], [y], [offsetX], [offsetY])](#Weapon+fire) ⇒ [<code>Bullet</code>](#Bullet)
    * [.setBulletBodyOffset(width, height, [offsetX], [offsetY])](#Weapon+setBulletBodyOffset) ⇒ [<code>Weapon</code>](#Weapon)
    * [.setBulletFrames(min, max, [selcetionMethod])](#Weapon+setBulletFrames) ⇒ [<code>Weapon</code>](#Weapon)
    * [.addBulletAnimation(name, [frames], [frameRate], [loop])](#Weapon+addBulletAnimation) ⇒ [<code>Weapon</code>](#Weapon)
    * [.debug([x], [y], [debugBodies])](#Weapon+debug)
    * [.update()](#Weapon+update) ⇒ <code>void</code>
    * [.postRender()](#Weapon+postRender) ⇒ <code>void</code>
    * [.destroy()](#Weapon+destroy) ⇒ <code>void</code>

<a name="new_Weapon_new"></a>

### new Weapon(scene, bulletLimit, key, frame, group)
TODO: a builder style interface would be neat. Can be kicked way forward
into polishing.


| Param | Type | Description |
| --- | --- | --- |
| scene | <code>Phaser.Scene</code> | A reference to the Phaser.Scene instance. |
| bulletLimit | <code>number</code> | The number of bullets to create. |
| key | <code>String</code> | The texture key for the bullet. |
| frame | <code>String</code> | The frame name for the bullet. |
| group | <code>Phaser.GameObjects.Group</code> | A group to add the bullets to. |

<a name="Weapon+debugPhysics"></a>

### weapon.debugPhysics : <code>Boolean</code>
Enable physics debugging for the bullets?

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
**Default**: <code></code>  
<a name="Weapon+bullets"></a>

### weapon.bullets : <code>Phaser.GameObjects.Group</code>
This is the Phaser.Group that contains all of the bullets managed by this plugin.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
<a name="Weapon+autoExpandBulletsGroup"></a>

### weapon.autoExpandBulletsGroup : <code>boolean</code>
Should the bullet pool run out of bullets (i.e. they are all in flight) then this
boolean controls if the Group will create a brand new bullet object or not.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
**Default**: <code>false</code>  
<a name="Weapon+autofire"></a>

### weapon.autofire : <code>boolean</code>
Will this weapon auto fire? If set to true then a new bullet will be fired
based on the [#fireRate](#fireRate) value.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
**Default**: <code>false</code>  
<a name="Weapon+shots"></a>

### weapon.shots : <code>number</code>
The total number of bullets this Weapon has fired so far.
You can limit the number of shots allowed (via [#fireLimit](#fireLimit)), and reset
this total via [#resetShots](#resetShots).

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
**Default**: <code>0</code>  
<a name="Weapon+fireLimit"></a>

### weapon.fireLimit : <code>number</code>
The maximum number of shots that this Weapon is allowed to fire before it stops.
When the limit is his the [#onFireLimit](#onFireLimit) Signal is dispatched.
You can reset the shot counter via [#resetShots](#resetShots).

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
**Default**: <code>0</code>  
<a name="Weapon+fireRate"></a>

### weapon.fireRate : <code>number</code>
The minimum interval between shots, in milliseconds.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
**Default**: <code>100</code>  
<a name="Weapon+fireRateVariance"></a>

### weapon.fireRateVariance : <code>number</code>
This is a modifier that is added to the [#fireRate](#fireRate) each update to add variety
to the firing rate of the Weapon. The value is given in milliseconds.
If you've a `fireRate` of 200 and a `fireRateVariance` of 50 then the actual
firing rate of the Weapon will be between 150 and 250.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
**Default**: <code>0</code>  
<a name="Weapon+fireFrom"></a>

### weapon.fireFrom : <code>Phaser.Geom.Rectangle</code>
This is a Rectangle from within which the bullets are fired. By default it's a 1x1
rectangle, the equivalent of a Point. But you can change the width and height, and if
larger than 1x1 it'll pick a random point within the rectangle to launch the bullet from.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
<a name="Weapon+fireAngle"></a>

### weapon.fireAngle : <code>integer</code>
The angle at which the bullets are fired. This can be a const such as Phaser.ANGLE_UP
or it can be any number from 0 to 360 inclusive, where 0 degrees is to the right.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
<a name="Weapon+bulletInheritSpriteSpeed"></a>

### weapon.bulletInheritSpriteSpeed : <code>boolean</code>
When a Bullet is fired it can optionally inherit the velocity of the `trackedSprite` if set.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
**Default**: <code>false</code>  
<a name="Weapon+bulletAnimation"></a>

### weapon.bulletAnimation : <code>string</code>
The string based name of the animation that the Bullet will be given on launch.
This is set via [#addBulletAnimation](#addBulletAnimation).

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
**Default**: <code>&quot;&quot;</code>  
<a name="Weapon+bulletFrameRandom"></a>

### weapon.bulletFrameRandom : <code>boolean</code>
If you've added a set of frames via [#setBulletFrames](#setBulletFrames) then you can optionally
chose for each Bullet fired to pick a random frame from the set.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
**Default**: <code>false</code>  
<a name="Weapon+bulletFrameCycle"></a>

### weapon.bulletFrameCycle : <code>boolean</code>
If you've added a set of frames via [#setBulletFrames](#setBulletFrames) then you can optionally
chose for each Bullet fired to use the next frame in the set. The frame index is then
advanced one frame until it reaches the end of the set, then it starts from the start
again. Cycling frames like this allows you to create varied bullet effects via
sprite sheets.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
**Default**: <code>false</code>  
<a name="Weapon+bulletWorldWrap"></a>

### weapon.bulletWorldWrap : <code>boolean</code>
Should the Bullets wrap around the world bounds? This automatically calls
`World.wrap` on the Bullet each frame. See the docs for that method for details.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
**Default**: <code>false</code>  
<a name="Weapon+bulletWorldWrapPadding"></a>

### weapon.bulletWorldWrapPadding : <code>integer</code>
If `bulletWorldWrap` is true then you can provide an optional padding value with this
property. It's added to the calculations determining when the Bullet should wrap around
the world or not. The value is given in pixels.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
**Default**: <code>0</code>  
<a name="Weapon+bulletAngleOffset"></a>

### weapon.bulletAngleOffset : <code>number</code>
An optional angle offset applied to the Bullets when they are launched.
This is useful if for example your bullet sprites have been drawn facing up, instead of
to the right, and you want to fire them at an angle. In which case you can set the
angle offset to be 90 and they'll be properly rotated when fired.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
**Default**: <code>0</code>  
<a name="Weapon+bulletAngleVariance"></a>

### weapon.bulletAngleVariance : <code>number</code>
This is a variance added to the angle of Bullets when they are fired.
If you fire from an angle of 90 and have a `bulletAngleVariance` of 20 then the actual
angle of the Bullets will be between 70 and 110 degrees. This is a quick way to add a
great 'spread' effect to a Weapon.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
**Default**: <code>0</code>  
<a name="Weapon+bulletSpeed"></a>

### weapon.bulletSpeed : <code>number</code>
The initial velocity of fired bullets, in pixels per second.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
**Default**: <code>200</code>  
<a name="Weapon+bulletSpeedVariance"></a>

### weapon.bulletSpeedVariance : <code>number</code>
This is a variance added to the speed of Bullets when they are fired.
If bullets have a [#bulletSpeed](#bulletSpeed) value of 200, and a `bulletSpeedVariance` of 50
then the actual speed of the Bullets will be between 150 and 250 pixels per second.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
**Default**: <code>0</code>  
<a name="Weapon+bulletLifespan"></a>

### weapon.bulletLifespan : <code>number</code>
If you've set [#bulletKillType](#bulletKillType) to `consts.KILL_LIFESPAN` this controls the amount
of lifespan the Bullets have set on launch. The value is given in milliseconds.
When a Bullet hits its lifespan limit it will be automatically killed.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
**Default**: <code>0</code>  
<a name="Weapon+bulletKillDistance"></a>

### weapon.bulletKillDistance : <code>number</code>
If you've set [#bulletKillType](#bulletKillType) to `consts.KILL_DISTANCE` this controls the distance
the Bullet can travel before it is automatically killed. The distance is given in pixels.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
**Default**: <code>0</code>  
<a name="Weapon+bulletGravity"></a>

### weapon.bulletGravity : <code>Phaser.Math.Vector2</code>
This is the amount of [Phaser.Physics.Arcade.Body#gravity](Phaser.Physics.Arcade.Body#gravity) added to the Bullets physics body when fired.
Gravity is expressed in pixels / second / second.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
<a name="Weapon+bulletRotateToVelocity"></a>

### weapon.bulletRotateToVelocity : <code>boolean</code>
Bullets can optionally adjust their rotation in-flight to match their velocity.
This can create the effect of a bullet 'pointing' to the path it is following, for example
an arrow being fired from a bow, and works especially well when added to [#bulletGravity](#bulletGravity).

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
**Default**: <code>false</code>  
<a name="Weapon+bulletKey"></a>

### weapon.bulletKey : <code>string</code>
The Texture Key that the Bullets use when rendering.
Changing this has no effect on bullets in-flight, only on newly spawned bullets.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
<a name="Weapon+bulletFrame"></a>

### weapon.bulletFrame : <code>string</code> \| <code>integer</code>
The Texture Frame that the Bullets use when rendering.
Changing this has no effect on bullets in-flight, only on newly spawned bullets.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
<a name="Weapon+bounds"></a>

### weapon.bounds : <code>Phaser.Geom.Rectangle</code>
This Rectangle defines the bounds that are used when determining if a Bullet should be killed or not.
It's used in combination with [#bulletKillType](#bulletKillType) when that is set to either `consts.KILL_WEAPON_BOUNDS`
or `consts.KILL_STATIC_BOUNDS`. If you are not using either of these kill types then the bounds are ignored.
If you are tracking a Sprite or Point then the bounds are centered on that object every frame.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
<a name="Weapon+bulletFrames"></a>

### weapon.bulletFrames : <code>Array</code>
This array stores the frames added via @link #setBulletFrames.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
**Access**: protected  
<a name="Weapon+trackedSprite"></a>

### weapon.trackedSprite : <code>Phaser.GameObjects.Sprite</code> \| <code>Object</code>
The Sprite currently being tracked by the Weapon, if any.
This is set via the [#trackSprite](#trackSprite) method.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
<a name="Weapon+trackedPointer"></a>

### weapon.trackedPointer : <code>Phaser.Input.Pointer</code>
The Pointer currently being tracked by the Weapon, if any.
This is set via the [#trackPointer](#trackPointer) method.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
<a name="Weapon+multiFire"></a>

### weapon.multiFire : <code>boolean</code>
If you want this Weapon to be able to fire more than 1 bullet in a single
update, then set this property to `true`. When `true` the Weapon plugin won't
set the shot / firing timers until the `postRender` phase of the game loop.
This means you can call `fire` (and similar methods) as often as you like in one
single game update.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
**Default**: <code>false</code>  
<a name="Weapon+trackRotation"></a>

### weapon.trackRotation : <code>boolean</code>
If the Weapon is tracking a Sprite, should it also track the Sprites rotation?
This is useful for a game such as Asteroids, where you want the weapon to fire based
on the sprites rotation.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
**Default**: <code>false</code>  
<a name="Weapon+trackOffset"></a>

### weapon.trackOffset : <code>Phaser.Math.Vector2</code>
The Track Offset is a Vector2 object that allows you to specify a pixel offset that bullets use
when launching from a tracked Sprite or Pointer. For example if you've got a bullet that is 2x2 pixels
in size, but you're tracking a Sprite that is 32x32, then you can set `trackOffset.x = 16` to have
the bullet launched from the center of the Sprite.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
<a name="Weapon+bulletClass"></a>

### weapon.bulletClass
The Class of the bullets that are launched by this Weapon. Defaults to [Phaser.Bullet](Phaser.Bullet), but can be
overridden before calling `createBullets` and set to your own class type.

It should be a constructor function accepting `(game, x, y, key, frame)`.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
**Properties**

| Name | Type |
| --- | --- |
| bulletClass | <code>function</code> | 

<a name="Weapon+bulletKillType"></a>

### weapon.bulletKillType
This controls how the bullets will be killed. The default is `consts.KILL_WORLD_BOUNDS`.

There are 7 different "kill types" available:

* `consts.KILL_NEVER`
The bullets are never destroyed by the Weapon. It's up to you to destroy them via your own code.

* `consts.KILL_LIFESPAN`
The bullets are automatically killed when their `bulletLifespan` amount expires.

* `consts.KILL_DISTANCE`
The bullets are automatically killed when they
exceed `bulletDistance` pixels away from their original launch position.

* `consts.KILL_WEAPON_BOUNDS`
The bullets are automatically killed when they no longer intersect with the [#bounds](#bounds) rectangle.

* `consts.KILL_CAMERA_BOUNDS`
The bullets are automatically killed when they no longer intersect with the [Phaser.Camera#bounds](Phaser.Camera#bounds) rectangle.

* `consts.KILL_WORLD_BOUNDS`
The bullets are automatically killed when they no longer intersect with the [Phaser.World#bounds](Phaser.World#bounds) rectangle.

* `consts.KILL_STATIC_BOUNDS`
The bullets are automatically killed when they no longer intersect with the [#bounds](#bounds) rectangle.
The difference between static bounds and weapon bounds, is that a static bounds will never be adjusted to
match the position of a tracked sprite or pointer.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
**Properties**

| Name | Type |
| --- | --- |
| bulletKillType | <code>integer</code> | 

<a name="Weapon+bulletCollideWorldBounds"></a>

### weapon.bulletCollideWorldBounds
Should bullets collide with the World bounds or not?

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
**Properties**

| Name | Type |
| --- | --- |
| bulletCollideWorldBounds | <code>boolean</code> | 

<a name="Weapon+x"></a>

### weapon.x
The x coordinate from which bullets are fired. This is the same as `Weapon.fireFrom.x`, and
can be overridden by the [#fire](#fire) arguments.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
**Properties**

| Name | Type |
| --- | --- |
| x | <code>number</code> | 

<a name="Weapon+y"></a>

### weapon.y
The y coordinate from which bullets are fired. This is the same as `Weapon.fireFrom.y`, and
can be overridden by the [#fire](#fire) arguments.

**Kind**: instance property of [<code>Weapon</code>](#Weapon)  
**Properties**

| Name | Type |
| --- | --- |
| y | <code>number</code> | 

<a name="Weapon+createBullets"></a>

### weapon.createBullets([quantity], [key], [frame], [group]) ⇒ [<code>Weapon</code>](#Weapon)
This method performs two actions: First it will check to see if the
[#bullets](#bullets) Group exists or not, and if not it creates it, adding its
children to the `group` given as the 4th argument.

Then it will seed the bullet pool with the `quantity` number of Bullets,
using the texture key and frame provided (if any).

If for example you set the quantity to be 10, then this Weapon will only
ever be able to have 10 bullets in-flight simultaneously. If you try to
fire an 11th bullet then nothing will happen until one, or more, of the
in-flight bullets have been killed, freeing them up for use by the Weapon
again.

If you do not wish to have a limit set, then pass in -1 as the quantity.
In this instance the Weapon will keep increasing the size of the bullet
pool as needed. It will never reduce the size of the pool however, so be
careful it doesn't grow too large.

You can either set the texture key and frame here, or via the
[#bulletKey](#bulletKey) and [#bulletFrame](#bulletFrame) properties. You can also
animate bullets, or set them to use random frames. All Bullets belonging
to a single Weapon instance must share the same texture key however.

**Kind**: instance method of [<code>Weapon</code>](#Weapon)  
**Returns**: [<code>Weapon</code>](#Weapon) - This Weapon instance.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [quantity] | <code>integer</code> | <code>1</code> | The quantity of bullets to seed the Weapon  with. If -1 it will set the pool to automatically expand. |
| [key] | <code>string</code> |  | The Game.cache key of the image that this Sprite  will use. |
| [frame] | <code>integer</code> \| <code>string</code> |  | If the Sprite image contains multiple  frames you can specify which one to use here. |
| [group] | <code>Phaser.GameObjects.Group</code> |  | Optional Group to add the  object to. If not specified it will be added to the World group. |

<a name="Weapon+forEach"></a>

### weapon.forEach(callback, callbackContext, [...args]) ⇒ [<code>Weapon</code>](#Weapon)
Call a function on each in-flight bullet in this Weapon.

See [forEachExists](Phaser.GameObjects.Group#forEachExists) for more details.

**Kind**: instance method of [<code>Weapon</code>](#Weapon)  
**Returns**: [<code>Weapon</code>](#Weapon) - This Weapon instance.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| callback | <code>function</code> |  | The function that will be called for each applicable child. The child will be passed as the first argument. |
| callbackContext | <code>object</code> |  | The context in which the function should be called (usually 'this'). |
| [...args] | <code>any</code> | <code>(none)</code> | Additional arguments to pass to the callback function, after the child item. |

<a name="Weapon+pauseAll"></a>

### weapon.pauseAll() ⇒ [<code>Weapon</code>](#Weapon)
Sets [Phaser.Physics.Arcade.Body#enable](Phaser.Physics.Arcade.Body#enable) to `false` on each bullet in this Weapon.
This has the effect of stopping them in-flight should they be moving.
It also stops them being able to be checked for collision.

**Kind**: instance method of [<code>Weapon</code>](#Weapon)  
**Returns**: [<code>Weapon</code>](#Weapon) - This Weapon instance.  
<a name="Weapon+resumeAll"></a>

### weapon.resumeAll() ⇒ [<code>Weapon</code>](#Weapon)
Sets [Phaser.Physics.Arcade.Body#enable](Phaser.Physics.Arcade.Body#enable) to `true` on each bullet in this Weapon.
This has the effect of resuming their motion should they be in-flight.
It also enables them for collision checks again.

**Kind**: instance method of [<code>Weapon</code>](#Weapon)  
**Returns**: [<code>Weapon</code>](#Weapon) - This Weapon instance.  
<a name="Weapon+killAll"></a>

### weapon.killAll() ⇒ [<code>Weapon</code>](#Weapon)
Calls [Phaser.Bullet#kill](Phaser.Bullet#kill) on every in-flight bullet in this Weapon.
Also re-enables their physics bodies, should they have been disabled via [#pauseAll](#pauseAll).

**Kind**: instance method of [<code>Weapon</code>](#Weapon)  
**Returns**: [<code>Weapon</code>](#Weapon) - This Weapon instance.  
<a name="Weapon+resetShots"></a>

### weapon.resetShots([newLimit]) ⇒ [<code>Weapon</code>](#Weapon)
Resets the [#shots](#shots) counter back to zero. This is used when you've set
[#fireLimit](#fireLimit) and have hit (or just wish to reset) your limit.

**Kind**: instance method of [<code>Weapon</code>](#Weapon)  
**Returns**: [<code>Weapon</code>](#Weapon) - This Weapon instance.  

| Param | Type | Description |
| --- | --- | --- |
| [newLimit] | <code>integer</code> | Optionally set a new [#fireLimit](#fireLimit). |

<a name="Weapon+trackSprite"></a>

### weapon.trackSprite(sprite, [offsetX], [offsetY], [trackRotation]) ⇒ [<code>Weapon</code>](#Weapon)
Sets this Weapon to track the given Sprite, or any Object with a public [world](Phaser.Component.Core#world)
Point object. When a Weapon tracks a Sprite it will automatically update its [#fireFrom](#fireFrom) value to match the
Sprite's position within the Game World, adjusting the coordinates based on the offset arguments.

This allows you to lock a Weapon to a Sprite, so that bullets are always launched from its location.

Calling `trackSprite` will reset [#trackedPointer](#trackedPointer) to null, should it have been set, as you can
only track _either_ a Sprite, or a Pointer, at once, but not both.

**Kind**: instance method of [<code>Weapon</code>](#Weapon)  
**Returns**: [<code>Weapon</code>](#Weapon) - This Weapon instance.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sprite | <code>Phaser.GameObjects.Sprite</code> \| <code>Object</code> |  | The Sprite to track the position of. |
| [offsetX] | <code>integer</code> | <code>0</code> | The horizontal offset from the Sprites position to be applied to the Weapon. |
| [offsetY] | <code>integer</code> | <code>0</code> | The vertical offset from the Sprites position to be applied to the Weapon. |
| [trackRotation] | <code>boolean</code> | <code>false</code> | Should the Weapon also track the Sprites rotation? |

<a name="Weapon+trackPointer"></a>

### weapon.trackPointer([pointer], [offsetX], [offsetY]) ⇒ [<code>Weapon</code>](#Weapon)
Sets this Weapon to track the given Pointer.
When a Weapon tracks a Pointer it will automatically update its [#fireFrom](#fireFrom) value to match the Pointer's
position within the Game World, adjusting the coordinates based on the offset arguments.

This allows you to lock a Weapon to a Pointer, so that bullets are always launched from its location.

Calling `trackPointer` will reset [#trackedSprite](#trackedSprite) to null, should it have been set, as you can
only track _either_ a Pointer, or a Sprite, at once, but not both.

**Kind**: instance method of [<code>Weapon</code>](#Weapon)  
**Returns**: [<code>Weapon</code>](#Weapon) - This Weapon instance.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [pointer] | <code>Phaser.Input.Pointer</code> |  | The Pointer to track the position of. Defaults to `Input.activePointer` if not specified. |
| [offsetX] | <code>integer</code> | <code>0</code> | The horizontal offset from the Pointers position to be applied to the Weapon. |
| [offsetY] | <code>integer</code> | <code>0</code> | The vertical offset from the Pointers position to be applied to the Weapon. |

<a name="Weapon+fireMany"></a>

### weapon.fireMany(positions, [from]) ⇒ <code>array</code>
Attempts to fire multiple bullets from the positions defined in the given array.

If you provide a `from` argument, or if there is a tracked Sprite or Pointer, then
the positions are treated as __offsets__ from the given objects position.

If `from` is undefined, and there is no tracked object, then the bullets are fired
from the given positions, as they exist in the world.

Calling this method sets [#multiFire](#multiFire) to `true`.

If there are not enough bullets available in the pool, and the pool cannot be extended,
then this method may not fire from all of the given positions.

When the bullets are launched they have their texture and frame updated, as required.
The velocity of the bullets are calculated based on Weapon properties like [#bulletSpeed](#bulletSpeed).

**Kind**: instance method of [<code>Weapon</code>](#Weapon)  
**Returns**: <code>array</code> - An array containing all of the fired Phaser.Bullet objects,
if a launch was successful, otherwise an empty array.  

| Param | Type | Description |
| --- | --- | --- |
| positions | <code>array</code> | An array of positions. Each position can be any Object, as long as it has public `x` and `y` properties, such as Phaser.Point, { x: 0, y: 0 }, Phaser.Sprite, etc. |
| [from] | <code>Phaser.GameObject.Sprite</code> \| <code>Phaser.Math.Vector2</code> \| <code>Object</code> \| <code>string</code> | Optionally fires the bullets **from** the `x` and `y` properties of this object, _instead_ of any [#trackedSprite](#trackedSprite) or `trackedPointer` that is set. |

<a name="Weapon+fireOffset"></a>

### weapon.fireOffset([offsetX], [offsetY]) ⇒ [<code>Bullet</code>](#Bullet)
Attempts to fire a single Bullet from a tracked Sprite or Pointer, but applies an offset
to the position first. This is the same as calling [#fire](#fire) and passing in the offset arguments.

If there are no more bullets available in the pool, and the pool cannot be extended,
then this method returns `null`. It will also return `null` if not enough time has expired since the last time
the Weapon was fired, as defined in the [#fireRate](#fireRate) property.

Otherwise the first available bullet is selected, launched, and returned.

When the bullet is launched it has its texture and frame updated, as required. The velocity of the bullet is
calculated based on Weapon properties like [#bulletSpeed](#bulletSpeed).

If you wish to fire multiple bullets in a single game update, then set [#multiFire](#multiFire) to `true`
and you can call this method as many times as you like, per loop. See also [#fireMany](#fireMany).

**Kind**: instance method of [<code>Weapon</code>](#Weapon)  
**Returns**: [<code>Bullet</code>](#Bullet) - The fired bullet, if a launch was successful, otherwise `null`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [offsetX] | <code>number</code> | <code>0</code> | The horizontal offset from the position of the tracked Sprite or Pointer, as set with [#trackSprite](#trackSprite). |
| [offsetY] | <code>number</code> | <code>0</code> | The vertical offset from the position of the tracked Sprite or Pointer, as set with [#trackSprite](#trackSprite). |

<a name="Weapon+fireAtPointer"></a>

### weapon.fireAtPointer([pointer]) ⇒ [<code>Bullet</code>](#Bullet)
Fires a bullet **at** the given Pointer. The bullet will be launched from the [#fireFrom](#fireFrom) position,
or from a Tracked Sprite or Pointer, if you have one set.

**Kind**: instance method of [<code>Weapon</code>](#Weapon)  
**Returns**: [<code>Bullet</code>](#Bullet) - The fired bullet if successful, null otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| [pointer] | <code>Phaser.Input.Pointer</code> | The Pointer to fire the bullet towards. |

<a name="Weapon+fireAtSprite"></a>

### weapon.fireAtSprite([sprite]) ⇒ [<code>Bullet</code>](#Bullet)
Fires a bullet **at** the given Sprite. The bullet will be launched from the [#fireFrom](#fireFrom) position,
or from a Tracked Sprite or Pointer, if you have one set.

**Kind**: instance method of [<code>Weapon</code>](#Weapon)  
**Returns**: [<code>Bullet</code>](#Bullet) - The fired bullet if successful, null otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| [sprite] | <code>Phaser.GameObjects.Sprite</code> | The Sprite to fire the bullet towards. |

<a name="Weapon+fireAtXY"></a>

### weapon.fireAtXY([x], [y]) ⇒ [<code>Bullet</code>](#Bullet)
Fires a bullet **at** the given coordinates. The bullet will be launched from the [#fireFrom](#fireFrom) position,
or from a Tracked Sprite or Pointer, if you have one set.

**Kind**: instance method of [<code>Weapon</code>](#Weapon)  
**Returns**: [<code>Bullet</code>](#Bullet) - The fired bullet if successful, null otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| [x] | <code>number</code> | The x coordinate, in world space, to fire the bullet towards. |
| [y] | <code>number</code> | The y coordinate, in world space, to fire the bullet towards. |

<a name="Weapon+fire"></a>

### weapon.fire([from], [x], [y], [offsetX], [offsetY]) ⇒ [<code>Bullet</code>](#Bullet)
Attempts to fire a single Bullet. If there are no more bullets available in the pool,
and the pool cannot be extended, then this method returns `null`. It will also return `null`
if not enough time has expired since the last time the Weapon was fired,
as defined in the [#fireRate](#fireRate) property.

Otherwise the first available bullet is selected, launched, and returned.

The arguments are all optional, but allow you to control both where the bullet is launched from, and aimed at.

If you don't provide any of the arguments then it uses those set via properties such as [#trackedSprite](#trackedSprite),
[#bulletAngle](#bulletAngle) and so on.

When the bullet is launched it has its texture and frame updated, as required. The velocity of the bullet is
calculated based on Weapon properties like `bulletSpeed`.

If you wish to fire multiple bullets in a single game update, then set `Weapon.multiFire = true`
and you can call `fire` as many times as you like, per loop. Multiple fires in a single update
only counts once towards the `shots` total, but you will still receive a Signal for each bullet.

**Kind**: instance method of [<code>Weapon</code>](#Weapon)  
**Returns**: [<code>Bullet</code>](#Bullet) - The fired bullet, if a launch was successful, otherwise `null`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [from] | <code>Phaser.GameObjects.Sprite</code> \| <code>Phaser.Math.Vector2</code> \| <code>Object</code> \| <code>string</code> |  | Optionally fires the bullet **from** the `x` and `y` properties of this object. If set this overrides [#trackedSprite](#trackedSprite) or `trackedPointer`. Pass `null` to ignore it. |
| [x] | <code>number</code> |  | The x coordinate, in world space, to fire the bullet **towards**. If left as `undefined`, or `null`, the bullet direction is based on its angle. |
| [y] | <code>number</code> |  | The y coordinate, in world space, to fire the bullet **towards**. If left as `undefined`, or `null`, the bullet direction is based on its angle. |
| [offsetX] | <code>number</code> | <code>0</code> | If the bullet is fired from a tracked Sprite or Pointer, or the `from` argument is set, this applies a horizontal offset from the launch position. |
| [offsetY] | <code>number</code> | <code>0</code> | If the bullet is fired from a tracked Sprite or Pointer, or the `from` argument is set, this applies a vertical offset from the launch position. |

<a name="Weapon+setBulletBodyOffset"></a>

### weapon.setBulletBodyOffset(width, height, [offsetX], [offsetY]) ⇒ [<code>Weapon</code>](#Weapon)
You can modify the size of the physics Body the Bullets use to be any dimension you need.
This allows you to make it smaller, or larger, than the parent Sprite.
You can also control the x and y offset of the Body. This is the position of the
Body relative to the top-left of the Sprite _texture_.

For example: If you have a Sprite with a texture that is 80x100 in size,
and you want the physics body to be 32x32 pixels in the middle of the texture, you would do:

`setSize(32 / Math.abs(this.scale.x), 32 / Math.abs(this.scale.y), 24, 34)`

Where the first two parameters are the new Body size (32x32 pixels) relative to the Sprite's scale.
24 is the horizontal offset of the Body from the top-left of the Sprites texture, and 34
is the vertical offset.

**Kind**: instance method of [<code>Weapon</code>](#Weapon)  
**Returns**: [<code>Weapon</code>](#Weapon) - The Weapon Plugin.  

| Param | Type | Description |
| --- | --- | --- |
| width | <code>number</code> | The width of the Body. |
| height | <code>number</code> | The height of the Body. |
| [offsetX] | <code>number</code> | The X offset of the Body from the top-left of the Sprites texture. |
| [offsetY] | <code>number</code> | The Y offset of the Body from the top-left of the Sprites texture. |

<a name="Weapon+setBulletFrames"></a>

### weapon.setBulletFrames(min, max, [selcetionMethod]) ⇒ [<code>Weapon</code>](#Weapon)
Sets the texture frames that the bullets can use when being launched.

This is intended for use when you've got numeric based frames, such as
those loaded via a Sprite Sheet.

It works by calling `Phaser.Utils.Array.NumberArray` internally, using
the min and max values provided. Then it sets the frame index to be zero.

You can optionally set the cycle and random booleans, to allow bullets to
cycle through the frames when they're fired, or pick one at random.

**Kind**: instance method of [<code>Weapon</code>](#Weapon)  
**Returns**: [<code>Weapon</code>](#Weapon) - The Weapon Plugin.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| min | <code>integer</code> |  | The minimum value the frame can be. Usually zero. |
| max | <code>integer</code> |  | The maximum value the frame can be. |
| [selcetionMethod] | <code>integer</code> | <code>BULLET_FRAME_STABLE</code> | Specifies how the  frame for the fired bullet will be selected. See consts.BULLET_FRAME_XYZ  for options. |

<a name="Weapon+addBulletAnimation"></a>

### weapon.addBulletAnimation(name, [frames], [frameRate], [loop]) ⇒ [<code>Weapon</code>](#Weapon)
Adds a new animation under the given key. Optionally set the frames, frame rate and loop.
The arguments are all the same as for `Animation.add`, and work in the same way.

[#bulletAnimation](#bulletAnimation) will be set to this animation after it's created. From that point on, all
bullets fired will play using this animation. You can swap between animations by calling this method
several times, and then just changing the [#bulletAnimation](#bulletAnimation) property to the name of the animation
you wish to play for the next launched bullet.

If you wish to stop using animations at all, set [#bulletAnimation](#bulletAnimation) to '' (an empty string).

**Kind**: instance method of [<code>Weapon</code>](#Weapon)  
**Returns**: [<code>Weapon</code>](#Weapon) - The Weapon Plugin.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | The unique (within the Weapon instance) name for the animation, i.e. "fire", "blast". |
| [frames] | <code>Array</code> | <code></code> | An array of numbers/strings that correspond to the framesto add to this animation and in which order. e.g. [1, 2, 3] or ['run0', 'run1', run2]). If null then all frames will be used. |
| [frameRate] | <code>number</code> | <code>60</code> | The speed at which the animation should play. The speed is given in frames per second. |
| [loop] | <code>number</code> | <code>1</code> | Number of times to repeat the animation. Set to -1 to repeat forever. |

<a name="Weapon+debug"></a>

### weapon.debug([x], [y], [debugBodies])
Uses `Game.Debug` to draw some useful information about this Weapon, including the number of bullets
both in-flight, and available. And optionally the physics debug bodies of the bullets.

**Kind**: instance method of [<code>Weapon</code>](#Weapon)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [x] | <code>integer</code> | <code>16</code> | The coordinate, in screen space, at which to draw the Weapon debug data. |
| [y] | <code>integer</code> | <code>32</code> | The coordinate, in screen space, at which to draw the Weapon debug data. |
| [debugBodies] | <code>boolean</code> | <code>false</code> | Optionally draw the physics body of every bullet in-flight. |

<a name="Weapon+update"></a>

### weapon.update() ⇒ <code>void</code>
Internal update method, called by the Weapon Plugin.

**Kind**: instance method of [<code>Weapon</code>](#Weapon)  
<a name="Weapon+postRender"></a>

### weapon.postRender() ⇒ <code>void</code>
Internal update method, called by the Weapon Plugin.

**Kind**: instance method of [<code>Weapon</code>](#Weapon)  
**Access**: protected  
<a name="Weapon+destroy"></a>

### weapon.destroy() ⇒ <code>void</code>
Destroys this Weapon.
You must release everything in here, all references, all objects, free it all up.

**Kind**: instance method of [<code>Weapon</code>](#Weapon)  
