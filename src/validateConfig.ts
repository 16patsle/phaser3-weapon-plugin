import consts from './consts';
import Weapon from './Weapon';

/**
 * Log text to the console or throw an error
 * @param text - Text to be logged
 * @param logLevel - The log level, either `warn`, `error' or `off`
 */
function log(text: string, logLevel: 'warn' | 'error' | 'off'): void {
  if (logLevel === 'warn') {
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
    (weapon.bulletKillType === consts.KILL_WORLD_BOUNDS ||
      weapon.bulletKillType === consts.KILL_WEAPON_BOUNDS)
  ) {
    log(
      'Warning: KILL_WORLD_BOUNDS and KILL_WEAPON_BOUNDS does not work well with bulletWorldWrap set to true.',
      weapon.logLevel
    );
  }
  if (
    (['bulletKillType', 'bulletLifespan'].includes(property) ||
      property === 'all') &&
    weapon.bulletKillType === consts.KILL_LIFESPAN &&
    weapon.bulletLifespan < 0
  ) {
    log(
      'Invalid bulletLifespan; must be > 0; currently ' + weapon.bulletLifespan,
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
  if (property === 'all') {
    shouldBePositive.forEach(key => {
      if (weapon[key] < 0) {
        log(
          'Invalid ' + property + '; must be >= 0; currently ' + weapon[key],
          weapon.logLevel
        );
      }
    });
  } else if (shouldBePositive.includes(property) && weapon[property] < 0) {
    log(
      'Invalid ' + property + '; must be >= 0; currently ' + weapon[property],
      weapon.logLevel
    );
  }
}

export { log };
export default validateConfig;
