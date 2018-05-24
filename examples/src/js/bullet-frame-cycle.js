var config = {
  type: Phaser.WEBGL,
  parent: 'phaser-example',
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  }
};

var game = new Phaser.Game(config);

function preload() {

  this.load.image('ship', 'assets/sprites/thrust_ship.png');
  this.load.spritesheet('bullet', 'assets/sprites/rgblaser.png', {
    frameWidth: 4,
    frameHeight: 4
  });
  this.load.scenePlugin('WeaponPlugin', './WeaponPlugin.js', null, 'weapons');

}

function create() {

  //  Creates 30 bullets, using the 'bullet' graphic
  this.weapon = this.weapons.add(40, 'bullet');

  //  The 'rgblaser.png' is a Sprite Sheet with 80 frames in it (each 4x4 px in size)
  //  The 3rd argument tells the Weapon Plugin to advance to the next frame each time
  //  a bullet is fired, when it hits 80 it'll wrap to zero again.
  //  You can also set this via this.weapon.bulletFrameCycle = true
  this.weapon.setBulletFrames(0, 80, true);

  //  The bullet will be automatically killed when it leaves the world bounds
  console.log(`setting bulletKillType`)
  this.weapon.bulletKillType = WeaponPlugin.consts.KILL_WORLD_BOUNDS;

  //  The speed at which the bullet is fired
  this.weapon.bulletSpeed = 400;

  //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 50ms
  this.weapon.fireRate = 50;

  //  Wrap bullets around the world bounds to the opposite side
  this.weapon.bulletWorldWrap = true;

  this.sprite = this.add.sprite(400, 300, 'ship');

  this.physics.add.existing(this.sprite);

  this.sprite.body.setDrag(70);
  this.sprite.body.maxVelocity.set(200);

  //  Tell the Weapon to track the 'player' Sprite
  //  With no offsets from the position
  //  But the 'true' argument tells the weapon to track sprite rotation
  this.weapon.trackSprite(this.sprite, 0, 0, true);

  this.cursors = this.input.keyboard.createCursorKeys();

}

function update() {
  if (this.cursors.up.isDown) {
    /*this.physics.arcade.accelerationFromRotation(this.sprite.rotation, 300, this.sprite.body.acceleration);
    this.sprite.body.acceleration.x

       /* if (speed === undefined) { speed = 60; }
        point = point || new Phaser.Point();

        return point.setToPolar(rotation, speed);*/
    this.sprite.body.acceleration.setToPolar(this.sprite.rotation, 300)
  } else {
    this.sprite.body.acceleration.set(0);
  }

  if (this.cursors.left.isDown) {
    this.sprite.body.angularVelocity = -300;
  } else if (this.cursors.right.isDown) {
    this.sprite.body.angularVelocity = 300;
  } else {
    this.sprite.body.angularVelocity = 0;
  }

  if (this.cursors.space.isDown) {
    console.log('weapon fire')
    this.weapon.fire();
  }

  this.physics.world.wrap(this.sprite, 16);
}
