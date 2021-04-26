import {Route} from '../../src/core/domain/Route';

const routeDomain = new Route(1, 'Route 1', 12, 'Een route', [
  {
    id: 1,
    start: {longitude: 20, latitude: 21, altitude: 1},
    end: {longitude: 22, latitude: 24, altitude: 2},
    poi: {
      id: 1,
      name: 'Point of interest 1',
      description: 'Point of interest description 1',
    },
  },
  {
    id: 2,
    start: {longitude: 25, latitude: 26, altitude: 3},
    end: {longitude: 27, latitude: 28, altitude: 4},
    poi: {
      id: 2,
      name: 'Point of interest 2',
      description: 'Point of interest description 2',
    },
  },
  {
    id: 3,
    start: {longitude: 29, latitude: 30, altitude: 5},
    end: {longitude: 31, latitude: 32, altitude: 6},
    poi: {
      id: 3,
      name: 'Point of interest 3',
      description: 'Point of interest description 3',
    },
  },
]);

/**
 * We don't test the calculate functions because they are not
 * predictable for testers.
 */
describe('Route tests', () => {
  it('Gets the start coordinates correctly.', () => {
    const start = routeDomain.startCoordinates;

    expect(start.longitude).toBe(20);
    expect(start.latitude).toBe(21);
    expect(start.altitude).toBe(1);
  });

  it('Gets the end coordinates correctly.', () => {
    const end = routeDomain.endCoordinates;

    expect(end.longitude).toBe(31);
    expect(end.latitude).toBe(32);
    expect(end.altitude).toBe(6);
  });
});
