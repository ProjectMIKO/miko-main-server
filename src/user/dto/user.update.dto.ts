import { PartialType } from '@nestjs/mapped-types';
import { UserCreateDto } from './user.create.dto';

export class UserUpdateDto extends PartialType(UserCreateDto) {
//   Not in use for now
}
