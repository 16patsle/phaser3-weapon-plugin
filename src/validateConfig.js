import consts from './consts';

/**
 * Log text to the console or throw an error
 * @param {string} text - Text to be logged
 * @param {string} logLevel - The log level, either `warn`, `error' or `off`
 */
function log(text, logLevel) {
  if (logLevel === 'warn') {
    console.warn(text);
  } else if (logLevel === 'error') {
    throw new Error(text);
  }
}

/**
 * Check the config of the weapon for common errors and weird configurations.
 * @param {Weapon} weapon - The weapon being validated
 * @param {string} property - The property of the weapon being validated
 */
function validateConfig(weapon, property) {
  if (
    ['bulletWorldWrap', 'bulletKillType'].includes(property) &&
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
    ['bulletKillType', 'bulletLifespan'].includes(property) &&
    weapon.bulletKillType === consts.KILL_LIFESPAN &&
    weapon.bulletLifespan < 0
  ) {
    log(
      'Invalid bulletLifespan; must be > 0; currently ' + weapon.bulletLifespan,
      weapon.logLevel
    );
  }
  if (
    [
      'fireLimit',
      'fireRate',
      'fireRateVariance',
      'bulletAngleVariance',
      'bulletSpeedVariance',
      'bulletKillDistance',
    ].includes(property) &&
    weapon[property] < 0
  ) {
    log(
      'Invalid ' + property + '; must be >= 0; currently ' + weapon[property],
      weapon.logLevel
    );
  }
}

export { log };
export default validateConfig;
