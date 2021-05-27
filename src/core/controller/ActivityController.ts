import {ActivityDTO} from '../dto/ActivityDTO';
import api from '../data/api';

export class ActivityController {
  static async post(activity: ActivityDTO, token: number) {
    await fetch(
      `${api.baseUrl}/activities?token=${token}`,
      api.headersPost(activity),
    );
  }
}
