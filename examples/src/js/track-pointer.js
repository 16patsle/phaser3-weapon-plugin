const config = {
  type: Phaser.WEBGL,
  parent: 'phaser-example',
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image('bullet', 'assets/sprites/shmup-bullet.png');
  this.load.scenePlugin('WeaponPlugin', './WeaponPlugin.js', null, 'weapons');
}

function create() {
  //  Creates 30 bullets, using the 'bullet' graphic
  this.weapon = this.add.weapon(30, 'bullet');

  // Enable physics debugging for the bullets
  this.weapon.debugPhysics = true;

  //  The bullets will be automatically killed when they are 2000ms old
  this.weapon.bulletKillType = WeaponPlugin.consts.KILL_LIFESPAN;
  this.weapon.bulletLifespan = 2000;

  //  The speed at which the bullet is fired
  this.weapon.bulletSpeed = 600;

  //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
  this.weapon.fireRate = 100;

  //  Wrap bullets around the world bounds to the opposite side
  this.weapon.bulletWorldWrap = true;

  //  Tell the Weapon to track the pointer.
  //  It uses current pointer by default.
  this.weapon.trackPointer();
}

function update() {
  if (this.input.activePointer.isDown) {
    console.log('weapon fire');
    this.weapon.fire();
  }
}
