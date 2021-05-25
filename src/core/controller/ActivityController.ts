import {ActivityDTO} from '../dto/ActivityDTO';
import api from '../data/api';

export class ActivityController {
  static async post(activity: ActivityDTO) {
    await fetch(`${api.baseUrl}/activities`, api.headersPost(activity));
  }
}
