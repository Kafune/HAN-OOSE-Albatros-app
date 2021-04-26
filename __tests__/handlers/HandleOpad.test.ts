import {HandleOpad} from '../../src/core/handlers/HandleOpad';
import {Position} from 'geojson';

describe('handleOpad Test', () => {
  let handleOpad: HandleOpad;

  beforeEach(() => {
    handleOpad = new HandleOpad([1, 2]);
  });

  afterEach(() => {
    //nothing
  });

  describe('Simpele JEST test', () => {
    // test dat Jest werkt.
    test('test', async () => {
      expect(1).toEqual(1);
    });
  });

  describe('handleUp', () => {
    test('breakpoint 1', async () => {
      let response: Position = handleOpad.handleUp(16);
      expect(response[0]).toEqual(1);
      expect(response[1]).toEqual(2.00006103515625);
    });
    test('breakpoint 2', async () => {
      let response: Position = handleOpad.handleUp(12);
      expect(response[0]).toEqual(1);
      expect(response[1]).toEqual(2.0004050925925925);
    });
    test('breakpoint 3', async () => {
      let response: Position = handleOpad.handleUp(5);
      expect(response[0]).toEqual(1);
      expect(response[1]).toEqual(2.012);
    });
  });

  describe('handleRight', () => {
    test('breakpoint 1', async () => {
      let response: Position = handleOpad.handleRight(16);
      expect(response[0]).toEqual(1.00006103515625);
      expect(response[1]).toEqual(2);
    });
    test('breakpoint 2', async () => {
      let response: Position = handleOpad.handleRight(12);
      expect(response[0]).toEqual(1.0004050925925927);
      expect(response[1]).toEqual(2);
    });
    test('breakpoint 3', async () => {
      let response: Position = handleOpad.handleRight(5);
      expect(response[0]).toEqual(1.012);
      expect(response[1]).toEqual(2);
    });
  });

  describe('handleLeft', () => {
    test('breakpoint 1', async () => {
      let response: Position = handleOpad.handleLeft(16);
      expect(response[0]).toEqual(0.99993896484375);
      expect(response[1]).toEqual(2);
    });
    test('breakpoint 2', async () => {
      let response: Position = handleOpad.handleLeft(12);
      expect(response[0]).toEqual(0.9995949074074074);
      expect(response[1]).toEqual(2);
    });
    test('breakpoint 3', async () => {
      let response: Position = handleOpad.handleLeft(5);
      expect(response[0]).toEqual(0.988);
      expect(response[1]).toEqual(2);
    });
  });

  describe('handleDown', () => {
    test('breakpoint 1', async () => {
      let response: Position = handleOpad.handleDown(16);
      expect(response[1]).toEqual(1.99993896484375);
      expect(response[0]).toEqual(1);
    });
    test('breakpoint 2', async () => {
      let response: Position = handleOpad.handleDown(12);
      expect(response[1]).toEqual(1.9995949074074073);
      expect(response[0]).toEqual(1);
    });
    test('breakpoint 3', async () => {
      let response: Position = handleOpad.handleDown(5);
      expect(response[1]).toEqual(1.988);
      expect(response[0]).toEqual(1);
    });
  });
});
