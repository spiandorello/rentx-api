interface IDateProvider {
    compareInHours(startAt: Date, finishAt: Date): number;
    compareInDays(startAt: Date, finishAt: Date): number;
    addDays(days: number): Date;
}
