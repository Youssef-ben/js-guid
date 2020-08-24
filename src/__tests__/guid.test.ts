import { Guid } from '../index';
import { INVALID_GUID } from '../guid.constants';

const DEFAULT_STRING_GUID = '77eb3969-19fd-4223-907a-5749669f1178';
const DEFAULT_BYTE_GUID = new Uint8Array([
  105,
  57,
  235,
  119,
  253,
  25,
  35,
  66,
  144,
  122,
  87,
  73,
  102,
  159,
  17,
  120,
]);

describe('Guid - Instantiation', () => {
  test('Success', () => {
    // Generate random guid.
    let guid = new Guid();
    expect(guid).not.toBeNull();

    guid = new Guid(DEFAULT_STRING_GUID);
    expect(guid).not.toBeNull();
    expect(guid.toString()).toEqual(DEFAULT_STRING_GUID);

    guid = new Guid(DEFAULT_BYTE_GUID);
    expect(guid).not.toBeNull();
    expect(guid.toByteArray()).toEqual(DEFAULT_BYTE_GUID);

    guid = new Guid(Guid.EMPTY);
    expect(guid).not.toBeNull();
    expect(guid.toString()).toEqual(Guid.EMPTY);

    guid = new Guid(undefined);
    expect(guid).not.toBeNull();

    guid = new Guid(null);
    expect(guid).not.toBeNull();
  });

  test('Failed', () => {
    try {
      new Guid('invalid_guid');
    } catch (error) {
      expect(error.message).toEqual(INVALID_GUID);
    }

    try {
      new Guid(
        new Uint8Array([
          105,
          57,
          235,
          119,
          253,
          25,
          35,
          66,
          144,
          122,
          87,
          73,
          102,
        ]),
      );
    } catch (error) {
      expect(error.message).toEqual(INVALID_GUID);
    }
  });
});

describe('Guid - Convertion', () => {
  test('String to Uint8Array', () => {
    //Prepare
    const guid = new Guid(DEFAULT_STRING_GUID);
    expect(guid).not.toBeNull();

    // Validate the string value.
    const stringValue = guid.toString();
    expect(stringValue).toEqual(DEFAULT_STRING_GUID);

    // Convert to Byte
    const byteValue = guid.toByteArray();
    expect(byteValue).not.toBeNull();
    expect(byteValue).not.toBeUndefined();
    expect(byteValue.length).toEqual(16);
    expect(byteValue).toEqual(DEFAULT_BYTE_GUID);
  });

  test('Uint8Array to String', () => {
    //Prepare
    const guid = new Guid(DEFAULT_BYTE_GUID);
    expect(guid).not.toBeNull();

    // Validate the byte value.
    const byteValue = guid.toByteArray();
    expect(byteValue).toEqual(DEFAULT_BYTE_GUID);

    // Convert to Byte
    const strValue = guid.toString();
    expect(strValue).not.toBeNull();
    expect(strValue).not.toBeUndefined();
    expect(strValue).toEqual(DEFAULT_STRING_GUID);
  });
});

describe('Guid - Static methods', () => {
  test('New Guid', () => {
    const guid = Guid.newGuid();
    expect(guid).not.toBeNull();
    expect(guid).not.toBeUndefined();
  });

  test('Is Valid Guid', () => {
    let isValid = Guid.isValid(DEFAULT_STRING_GUID);
    expect(isValid).toEqual(true);

    isValid = Guid.isValid(DEFAULT_BYTE_GUID);
    expect(isValid).toEqual(true);

    isValid = Guid.isValid('invalid_guid');
    expect(isValid).toEqual(false);
  });

  test('Parse from String', () => {
    const result = Guid.parse(DEFAULT_STRING_GUID) as Uint8Array;
    expect(result).toBeInstanceOf(Object);
    expect(result).toEqual(DEFAULT_BYTE_GUID);

    try {
      Guid.parse('invalid_guid');
    } catch (error) {
      expect(error.message).toEqual(INVALID_GUID);
    }
  });

  test('Parse from Uint8Array', () => {
    const result = Guid.parse(DEFAULT_BYTE_GUID) as string;
    expect(result).toEqual(DEFAULT_STRING_GUID);
  });
});
