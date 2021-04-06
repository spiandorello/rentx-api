interface ICreateRentalDto {
    userId: string;
    carId: string;
    startAt: Date;
    expectReturnDate: Date;
}

export default ICreateRentalDto;
