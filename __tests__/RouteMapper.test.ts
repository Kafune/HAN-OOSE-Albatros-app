import 'react-native';
import {Route} from '../src/core/domain/Route';
import {RouteMapper} from '../src/core/mapper/RouteMapper';
import RouteResponseDTO from '../src/core/dto/RouteResponseDTO';

const routeDomain = new Route(1, 'Route 1', 12, 'Een route', [
  {
    id: 1,
    start: {longitude: 20, latitude: 21, altitude: 2},
    end: {longitude: 22, latitude: 24, altitude: 2},
    poi: {
      id: 1,
      name: 'Point of interest 1',
      description: 'Point of interest description 1',
    },
  },
  {
    id: 2,
    start: {longitude: 25, latitude: 26, altitude: 2},
    end: {longitude: 27, latitude: 28, altitude: 2},
    poi: {
      id: 2,
      name: 'Point of interest 2',
      description: 'Point of interest description 2',
    },
  },
]);

const DTOs: RouteResponseDTO[] = [
  {routeId: 1, name: 'Route response 1', distance: 11, segments: []},
  {routeId: 2, name: 'Route response 2', distance: 22, segments: []},
];

const array = require('lodash/array');

describe('Route Mapper tests', () => {
  it('Maps to maps line correctly', () => {
    const mapsLine = RouteMapper.toMapsLine(routeDomain);

    expect(array.first(mapsLine.coordinates).longitude).toBe(
      array.first(routeDomain.segments).start.longitude,
    );

    expect(array.first(mapsLine.coordinates).latitude).toBe(
      array.first(routeDomain.segments).start.latitude,
    );

    expect(array.last(mapsLine.coordinates).longitude).toBe(
      array.last(routeDomain.segments).end.longitude,
    );

    expect(array.last(mapsLine.coordinates).latitude).toBe(
      array.last(routeDomain.segments).end.latitude,
    );
  });

  it('Maps to maps point correctly', () => {
    const mapsPoint = RouteMapper.toMapsPoint(routeDomain);

    expect(array.first(mapsPoint.coordinates)[0]).toBe(
      array.first(routeDomain.segments).start.longitude,
    );

    expect(array.first(mapsPoint.coordinates)[1]).toBe(
      array.first(routeDomain.segments).start.latitude,
    );

    expect(array.last(mapsPoint.coordinates)[0]).toBe(
      array.last(routeDomain.segments).end.longitude,
    );

    expect(array.last(mapsPoint.coordinates)[1]).toBe(
      array.last(routeDomain.segments).end.latitude,
    );
  });

  it('Maps DTO to domain correctly', () => {
    const domain = RouteMapper.toDomain(DTOs[0]);

    expect(domain.id).toBe(DTOs[0].routeId);
    expect(domain.name).toBe(DTOs[0].name);
    expect(domain.distance).toBe(DTOs[0].distance);
    expect(domain.segments).toStrictEqual(DTOs[0].segments);
  });

  it('Maps DTOs to domains correctly', () => {
    const domains = RouteMapper.multipleToDomain(DTOs);

    for (let i = 0; i > domains.length; i++) {
      expect(domains[i].id).toBe(DTOs[i].routeId);
      expect(domains[i].name).toBe(DTOs[i].name);
      expect(domains[i].distance).toBe(DTOs[i].distance);
      expect(domains[i].segments).toStrictEqual(DTOs[i].segments);
    }
  });
});
