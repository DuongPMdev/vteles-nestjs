import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
    
  @ApiProperty({ example: 'admin_marketing', description: 'Custom login ID' })
  custom_login_id: string;

  @ApiProperty({ example: '111111', description: 'Password' })
  password: string;

}