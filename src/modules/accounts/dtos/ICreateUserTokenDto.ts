export default interface ICreateUserTokenDto {
  refreshToken: string;
  userId: string;
  expiresDate: Date;
}
