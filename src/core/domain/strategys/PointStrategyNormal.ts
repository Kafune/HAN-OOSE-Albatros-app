import {IPointStrategy} from './IPointStrategy';

export class PointStrategyNormal implements IPointStrategy {
  calculate(duration: number, distance: number): number {
    if (distance < 1) {
      return 0;
    }
    return (distance / (duration / 1000 / 60)) * 10;
  }
}
