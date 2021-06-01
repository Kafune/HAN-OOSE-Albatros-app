import 'react-native';
import {Route} from '../../src/core/domain/Route';
import {Activity} from '../../src/core/domain/Activity';
import {ActivityMapper} from '../../src/core/mapper/ActivityMapper';

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

describe('Activity Mapper tests', () => {
  it('activityToRoute.', () => {
    const EXPECTED_RESULT = new Route(
      ACTIVITY.activityId,
      '-1',
      Number(ACTIVITY.distance.toFixed(0)),
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
});
