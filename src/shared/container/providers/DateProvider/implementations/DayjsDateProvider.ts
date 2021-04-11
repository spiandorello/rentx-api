import dayjs from 'dayjs';

class DayjsDateProvider implements IDateProvider {
    compareInHours(startAt: Date, finishAt: Date): number {
        return dayjs(finishAt).diff(startAt, 'hours');
    }

    compareInDays(startAt: Date, finishAt: Date): number {
        return dayjs(finishAt).diff(startAt, 'days');
    }

    addDays(days: number): Date {
        return dayjs().add(days, 'days').toDate();
    }

    addHours(hours:number): Date {
        return dayjs().add(hours, 'hours').toDate();
    }
}

export default DayjsDateProvider;
