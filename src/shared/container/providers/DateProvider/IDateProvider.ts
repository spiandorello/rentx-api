interface IDateProvider {
  compareInHours(startAt: Date, finishAt: Date): number;
  compareInDays(startAt: Date, finishAt: Date): number;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  isBefore(startAt: Date, finishAt: Date): boolean;
}
