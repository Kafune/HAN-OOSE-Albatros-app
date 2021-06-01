import 'react-native';
import {Route} from '../../src/core/domain/Route';
import {Activity} from '../../src/core/domain/Activity';
import {ActivityMapper} from '../../src/core/mapper/ActivityMapper';
import {ActivityDTO} from '../../src/core/dto/ActivityDTO';

let activityId = 99;
let routeId = 88;
let userId = 77;
let point = 66;
let duration = 55;
let distance = 44;
let segments = [
  {
    id: 33,
    start: {
      longitude: 1,
      latitude: 2,
      altitude: 3,
    },
    end: {
      longitude: 4,
      latitude: 5,
      altitude: 6,
    },
  },
  {
    id: 33,
    start: {
      longitude: 7,
      latitude: 8,
      altitude: 9,
    },
    end: {
      longitude: 10,
      latitude: 11,
      altitude: 12,
    },
  },
];

const ACTIVITY = new Activity(
  activityId,
  routeId,
  userId,
  point,
  duration,
  distance,
  segments,
);

const activityDTOS: ActivityDTO[] = [
  {
    routeId: 1,
    userId: 1,
    point: 100,
    duration: 5000000,
    distance: 10,
    segments: [],
  },
  {
    routeId: 2,
    userId: 1,
    point: 500,
    duration: 2500000,
    distance: 15,
    segments: [],
  },
];

describe('Activity Mapper tests', () => {
  it('activityToRoute.', () => {
    const EXPECTED_RESULT = new Route(
      ACTIVITY.activityId,
      '-1',
      ACTIVITY.distance,
      '-1',
      ACTIVITY.segments,
    );
    const RESPONSE = ActivityMapper.activityToRoute(ACTIVITY);

    expect(RESPONSE.id).toEqual(ACTIVITY.activityId);
    expect(RESPONSE.name).toEqual('-1');
    expect(RESPONSE.description).toEqual('-1');
    expect(RESPONSE.distance).toEqual(ACTIVITY.distance);
    expect(RESPONSE.segments).toEqual(ACTIVITY.segments);
    expect(RESPONSE).toStrictEqual(EXPECTED_RESULT);
  });
  it('Maps activity DTO to domain', () => {
    const domain = ActivityMapper.toDomain(activityDTOS[0]);

    expect(domain.routeId).toBe(activityDTOS[0].routeId);
    expect(domain.userId).toBe(activityDTOS[0].userId);
    expect(domain.point).toBe(activityDTOS[0].point);
    expect(domain.duration).toBe(activityDTOS[0].duration);
    expect(domain.distance).toBe(activityDTOS[0].distance);
    expect(domain.segments).toStrictEqual(activityDTOS[0].segments);
  });
  it('Maps multiple activity DTOs to domains correctly', () => {
    const domains = ActivityMapper.multipleToDomain(activityDTOS);

    for (let i = 0; i > domains.length; i++) {
      expect(domains[i].routeId).toBe(activityDTOS[i].routeId);
      expect(domains[i].userId).toBe(activityDTOS[i].userId);
      expect(domains[i].point).toBe(activityDTOS[i].point);
      expect(domains[i].duration).toBe(activityDTOS[i].duration);
      expect(domains[i].distance).toBe(activityDTOS[i].distance);
      expect(domains[i].segments).toStrictEqual(activityDTOS[i].segments);
    }
  });
});
