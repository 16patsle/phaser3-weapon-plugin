import { KillType } from './consts';
import type { Weapon } from './Weapon';

/**
 * Log text to the console or throw an error
 * @param text - Text to be logged
 * @param logLevel - The log level, either `warn`, `error' or `off`
 */
function log(text: string, logLevel: 'warn' | 'error' | 'off'): void {
  if (logLevel === 'warn') {
    /* eslint-disable-next-line no-console */
    console.warn(text);
  } else if (logLevel === 'error') {
    throw new Error(text);
  }
}

/**
 * Check the config of the weapon for common errors and weird configurations.
 * @param weapon - The weapon being validated
 * @param property - The property of the weapon being validated
 */
function validateConfig(
  weapon: Weapon,
  property: keyof Weapon | 'all' = 'all'
): void {
  if (
    (['bulletWorldWrap', 'bulletKillType'].includes(property) ||
      property === 'all') &&
    weapon.bulletWorldWrap &&
    (weapon.bulletKillType === KillType.KILL_WORLD_BOUNDS ||
      weapon.bulletKillType === KillType.KILL_WEAPON_BOUNDS)
  ) {
    log(
      'Warning: KILL_WORLD_BOUNDS and KILL_WEAPON_BOUNDS does not work well with bulletWorldWrap set to true.',
      weapon.logLevel
    );
  }
  if (
    (['bulletKillType', 'bulletLifespan'].includes(property) ||
      property === 'all') &&
    weapon.bulletKillType === KillType.KILL_LIFESPAN &&
    weapon.bulletLifespan < 0
  ) {
    log(
      'Invalid bulletLifespan; must be > 0; currently ' + weapon.bulletLifespan,
      weapon.logLevel
    );
  }
  if (
    (['trackRotation', 'trackedSprite'].includes(property) ||
      property === 'all') &&
    weapon.trackRotation === true &&
    (weapon.trackedSprite?.rotation === undefined ||
      weapon.trackedSprite.angle === undefined)
  ) {
    log(
      'Warning: Weapon cannot track rotation of an object without a rotation and/or angle property.',
      weapon.logLevel
    );
  }
  if (
    (['bulletInheritSpriteSpeed', 'trackedSprite'].includes(property) ||
      property === 'all') &&
    weapon.bulletInheritSpriteSpeed === true &&
    !weapon.trackedSprite?.body
  ) {
    log(
      'Warning: Bullet cannot inherit speed from a sprite without a body.',
      weapon.logLevel
    );
  }
  const shouldBePositive: (keyof Weapon)[] = [
    'fireLimit',
    'fireRate',
    'fireRateVariance',
    'bulletAngleVariance',
    'bulletSpeedVariance',
    'bulletKillDistance',
  ];
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  if (property === 'all') {
    shouldBePositive.forEach(key => {
      if (
        (typeof weapon[key] === 'string' || typeof weapon[key] === 'number') &&
        Number(weapon[key]) < 0
      ) {
        log(
          'Invalid ' + property + '; must be >= 0; currently ' + weapon[key],
          weapon.logLevel
        );
      }
    });
  } else if (
    shouldBePositive.includes(property) &&
    (typeof weapon[property] === 'string' ||
      typeof weapon[property] === 'number') &&
    Number(weapon[property]) < 0
  ) {
    log(
      'Invalid ' + property + '; must be >= 0; currently ' + weapon[property],
      weapon.logLevel
    );
  }
}

export { log, validateConfig };
