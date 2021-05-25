export interface IPointStrategy {
  calculate(duration: number, distance: number): number;
}
