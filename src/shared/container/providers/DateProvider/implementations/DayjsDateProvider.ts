import dayjs from 'dayjs';

class DayjsDateProvider implements IDateProvider {
    compareInHours(startAt: Date, finishAt: Date): number {
        return dayjs(finishAt).diff(startAt, 'hours');
    }

    compareInDays(startAt: Date, finishAt: Date): number {
        return dayjs(finishAt).diff(startAt, 'days');
    }
}

export default DayjsDateProvider;
