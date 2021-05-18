import {Duration} from '../../src/core/maps/Duration';

describe('Duration Test', () => {
  let duration: Duration;

  beforeEach(() => {
    duration = new Duration(3772000);
  });

  afterEach(() => {
    //nothing
  });

  describe('getHMS()', () => {
    // test dat Jest werkt.
    test('happy Flow', () => {
      const expected: string = '01:02:52';
      const actual: string = duration.getHMS();
      expect(actual).toEqual(expected);
    });
  });
});
