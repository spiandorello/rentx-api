import { classToClass } from 'class-transformer';

import User from '@modules/accounts/infra/typeorm/entities/User';
import IUserResponseDTO from '@modules/accounts/dtos/IUserResponseDto';

class UserMap {
  static toDTO({
    id,
    name,
    email,
    avatar,
    avatar_url,
    driverLicense,
  }: User): IUserResponseDTO {
    return classToClass({
      id,
      name,
      email,
      avatar,
      avatar_url,
      driver_license: driverLicense,
    });
  }
}

export default UserMap;
