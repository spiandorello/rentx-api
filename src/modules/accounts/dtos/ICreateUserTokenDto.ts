interface ICreateUserTokenDto {
    refreshToken: string;
    userId: string;
    expiresDate: Date;
}

export default ICreateUserTokenDto;
