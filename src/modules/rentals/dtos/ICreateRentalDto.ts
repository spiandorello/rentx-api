interface ICreateRentalDto {
    userId: string;
    carId: string;
    startAt: Date;
    expectReturnDate: Date;
    id?: string;
    finishAt?: Date;
    total?: number;
}

export default ICreateRentalDto;
