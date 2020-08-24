/* eslint-disable no-bitwise */

export const ARRAY_LENGTH = 16;

const BYTE_ORDER = [3, 2, 1, 0, 5, 4, 7, 6, 8, 9, 10, 11, 12, 13, 14, 15];

/**
 * Regex to validate the given GUID accept all the UUIDs version.
 */
const regxValidator = new RegExp(
  '^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$',
  'i',
);

/**
 * Convert the given number to a Hexa format.
 * @param value The number to be converted
 */
function convertNumberToHexa(value: number): string {
  let hex = value <= 0xf ? '0' : '';
  hex += value.toString(ARRAY_LENGTH);
  return hex;
}

/**
 * Convert the given {string} to a {Uint8Array} value.
 * @param value String value of the Guid.
 */
export function stringToUint8Array(value: string): Uint8Array {
  // Strip any separatorsor un-wanted chars.
  const regExp = new RegExp('[{}()-]', 'g');
  const guid = value.replace(regExp, '');

  const bytes: number[] = [];

  for (let i = 0; i < ARRAY_LENGTH; i++) {
    const pos = BYTE_ORDER[i];
    const b1 = guid.charAt(pos * 2);
    const b2 = guid.charAt(pos * 2 + 1);
    const charAt = unescape(`%${b1}${b2}`).charCodeAt(0);
    bytes.push(charAt);
  }

  return new Uint8Array(bytes);
}

/**
 * Convert the given {Uint8Array} to a {string} value.
 *
 * @param value Byte Array value of the Guid.
 */
export function uint8ArrayToString(value: Uint8Array): string {
  let guid = '';

  for (let i = 0; i < ARRAY_LENGTH; i++) {
    // Decide if we need to add the Hyphen {-} in the Guid.
    guid += i === 4 || i === 6 || i === 8 || i === 10 ? '-' : '';

    const pos = BYTE_ORDER[i];
    guid += convertNumberToHexa(value[pos]);
  }

  return guid;
}

/**
 * Validate that the given value is a valid GUID.
 * @param guid The value to be validated.
 */
export function isStringValidGuid(guid: string): boolean {
  if (!guid) {
    return false;
  }

  return regxValidator.test(guid);
}

/**
 * Validate that the given value is a valid GUID.
 * @param guid The value to be validated.
 */
export function isUint8ArrayValidGuid(guid: Uint8Array): boolean {
  const strGuid = uint8ArrayToString(guid);
  return guid && regxValidator.test(strGuid);
}

/**
 * Generate a random v4 GUID.
 */
export function GenerateGuidV4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
    char: string,
  ) {
    const random = (Math.random() * 16) | 0;
    const v = char === 'x' ? random : (random & 0x3) | 0x8;
    return v.toString(16);
  });
}
