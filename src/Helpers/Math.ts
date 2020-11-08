/** Clamps the value inside the provided range
 * @param value The value to clamp in the range
 * @param min The minimal value
 * @param max The maximum value
 */
export function clamp(value: number, min: number, max: number) {
    return Math.max(Math.min(value, max), min);
}

/** Checks if two numbers are almost equal, using the provided precision */
export function almostEqual(value1: number, value2: number, precision: number = Number.EPSILON) {
    return Math.abs(value1 - value2) <= precision;
}