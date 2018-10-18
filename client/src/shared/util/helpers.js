/**
 * Calculate relative percentages for list of values
 *
 * @param items Array<int|float>
 */
export const calculateRelativePercentages = items => {
  if (items.length === 0) {
    return [];
  }

  const total = items.reduce((acc, val) => 1 * acc + parseInt(val, 10));
  return items.map(i => i / total * 100.0);
};
/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */

export const isObject = item => item && typeof item === 'object' && !Array.isArray(item);
/**
 * Deep merge two objects.
 *
 * @param target
 * @param sources
 * @returns {*}
 */

export const mergeDeep = (target, ...sources) => {
  if (!sources.length) {
    return target;
  }

  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    /* eslint-disable-next-line no-restricted-syntax */
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        if (isObject(source[key])) {
          if (!target[key]) {
            Object.assign(target, {
              [key]: {},
            });
          }

          mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, {
            [key]: source[key],
          });
        }
      }
    }
  }

  return mergeDeep(target, ...sources);
};
/**
 * Calculate z-index based on timestamp
 *
 * @returns {number}
 */

export const zIndex = () => Math.floor(Date.now() / 1000);
