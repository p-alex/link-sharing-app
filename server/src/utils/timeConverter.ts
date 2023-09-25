import { injectable } from "inversify";

interface ITime {
  milisecond: number;
  second: number;
  minute: number;
  hour: number;
  day: number;
  month: number;
  year: number;
}

@injectable()
export class TimeConverter {
  private readonly _inMs: ITime;
  constructor() {
    this._inMs = {
      milisecond: 1,
      second: 1 * 1000,
      minute: 1 * 60 * 1000,
      hour: 1 * 60 * 60 * 1000,
      day: 1 * 24 * 60 * 60 * 1000,
      month: 1 * 30 * 24 * 60 * 60 * 1000,
      year: 1 * 12 * 30 * 24 * 60 * 60 * 1000,
    };
  }
  toMs(number: number, type: keyof typeof this._inMs) {
    return number * this._inMs[type];
  }
  toSeconds(number: number, type: keyof typeof this._inMs) {
    return Math.floor(number * (this._inMs[type] / this._inMs["second"]));
  }
}
