import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ModeratorRequestDto {
  @ApiProperty({
    description: 'The token of the moderator',
    example: 'moderator-token-123',
  })
  @IsString()
  readonly token: string;
}
