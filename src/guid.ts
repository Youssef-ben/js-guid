/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */

/**
 * BASED ON SOURCE: https://www.jocys.com/common/jsclasses/documents/Default.aspx?File=System.debug.js&Item=System.Guid&Index=2
 */

import { IGuid } from './guid.interface';
import {
  INVALID_GUID,
  VALUE_REQUIRED,
  UNSUPPORTED_TYPE,
} from './guid.constants';
import {
  stringToUint8Array,
  uint8ArrayToString,
  isStringValidGuid,
  isUint8ArrayValidGuid,
  GenerateGuidV4,
  ARRAY_LENGTH,
} from './guid.helpers';

export class Guid implements IGuid {
  /**
   * Empty string Guid value: '00000000-0000-0000-0000-000000000000'.
   */
  static EMPTY = '00000000-0000-0000-0000-000000000000';

  /**
   * Holds a Uint8Array of 16 elements containing the GUID values.
   */
  private BytesGuid = new Uint8Array(16);

  /**
   * Holds the string value of the GUID.
   */
  private StringGuid = '';

  /**
   * Create a new instance of the Guid with the given value,
   * or generate a new Guid if no value was given.
   * @param value The target value if already exists, leave it empty for a new value.
   */
  constructor(value?: string | Uint8Array | undefined) {
    this.BytesGuid = new Uint8Array(16);
    this.StringGuid = '';

    if (!value) {
      this.StringGuid = GenerateGuidV4();
      this.BytesGuid = stringToUint8Array(this.StringGuid);
      return;
    }

    if (typeof value === 'string') {
      if (!Guid.isValid(value)) {
        throw new Error(INVALID_GUID);
      }

      this.StringGuid = value;
      this.BytesGuid = stringToUint8Array(this.StringGuid);
      return;
    }

    if (typeof value === 'object' && value instanceof Uint8Array) {
      if (!Guid.isValid(value)) {
        throw new Error(INVALID_GUID);
      }

      this.BytesGuid = value;
      this.StringGuid = uint8ArrayToString(value);
      return;
    }

    throw new Error(UNSUPPORTED_TYPE);
  }

  toString(): string {
    return this.StringGuid;
  }

  toByteArray(): Uint8Array {
    return this.BytesGuid;
  }

  equals(value: IGuid | string | Uint8Array): boolean {
    if (!value) {
      throw new Error(VALUE_REQUIRED);
    }

    if (typeof value === 'string') {
      if (!isStringValidGuid(value)) {
        throw new Error(INVALID_GUID);
      }

      return this.StringGuid === value;
    }

    if (typeof value !== 'object') {
      throw new Error(UNSUPPORTED_TYPE);
    }

    if (value instanceof Uint8Array) {
      if (!isUint8ArrayValidGuid(value)) {
        throw new Error(INVALID_GUID);
      }

      return this.StringGuid === uint8ArrayToString(value);
    }

    if (value instanceof Guid) {
      return this.StringGuid === value.toString();
    }

    return true;
  }

  isEmpty(): boolean {
    return this.StringGuid === Guid.EMPTY;
  }

  /**
   * Parse the given value into the opposite type.
   * Example : if value is string the function return a {Uint8Array of 16 elements},
   * otherwise it return a {string} if the value is a Uint8Array.
   */
  static parse(value: string | Uint8Array): string | Uint8Array {
    if (!Guid.isValid(value)) {
      throw new Error(INVALID_GUID);
    }

    if (typeof value === 'object' && value instanceof Uint8Array) {
      return uint8ArrayToString(value);
    }

    // At this point we're sure that the value is string.
    return stringToUint8Array(value);
  }

  /**
   * Generate a new v4 Guid and return a new instance of the Guid.
   */
  static newGuid(): Guid {
    return new Guid(GenerateGuidV4());
  }

  /**
   *  Checks if the given value is a valid GUID.
   * @param value The given guid that need to be validated.
   */
  static isValid(value: string | Uint8Array): boolean {
    if (!value) {
      throw new Error(VALUE_REQUIRED);
    }

    if (typeof value === 'string') {
      return isStringValidGuid(value);
    }

    if (typeof value === 'object' && value instanceof Uint8Array) {
      if (value.length !== ARRAY_LENGTH) {
        throw new Error(INVALID_GUID);
      }

      return isUint8ArrayValidGuid(value);
    }

    throw new Error(UNSUPPORTED_TYPE);
  }
}
