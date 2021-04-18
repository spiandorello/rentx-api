export default interface ICreateUserDto {
  id?: string;
  avatar?: string;
  name: string;
  email: string;
  password: string;
  driverLicense: string;
}
