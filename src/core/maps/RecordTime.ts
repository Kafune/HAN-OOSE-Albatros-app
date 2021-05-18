export class RecordTime {
  dateTime: number;
  isEndNode: boolean;
  constructor(isEndNode: boolean) {
    let date = new Date();
    this.dateTime = date.getTime();
    this.isEndNode = isEndNode;
  }
}
