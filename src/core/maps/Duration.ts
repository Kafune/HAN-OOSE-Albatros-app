export class Duration {
  current: number;

  /**
   * Creates an instance of Duratation.
   * @param {number} current
   * @memberof Duratation
   */
  constructor(current: number) {
    this.current = current;
  }

  /**
   * returns HH:MM:SS of date
   *
   * @return {string}
   * @memberof Duration
   */
  getHMS(): string {
    let hours = 0;
    let minutes = Math.floor(this.current / 60000);
    if (minutes / 60 > 1) {
      hours = Math.floor(minutes / 60);
      minutes = minutes - 60 * hours;
    }
    let seconds: number = Math.floor((this.current % 60000) / 1000);
    return (
      (hours < 10 ? '0' : '') +
      hours +
      ':' +
      (minutes < 10 ? '0' : '') +
      minutes +
      ':' +
      (seconds < 10 ? '0' : '') +
      seconds
    );
  }
}
