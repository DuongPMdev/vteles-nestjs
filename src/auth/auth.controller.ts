import { Controller, Post, Get, Body, Query, Request, UseGuards, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDTO } from './dto/login.dto';


@Injectable()
@ApiTags('account')
@Controller('account')
export class AuthController {
  constructor(private readonly authService: AuthService
  ) {}


  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Successful login', schema: { example: { access_token: 'your-jwt-token-here' }}})
  async login(@Body() loginDTO: LoginDTO) {
    if (loginDTO.custom_login_id == '') {
      throw new BadRequestException('Invalid credentials');
    }
    if (loginDTO.password == '') {
      throw new BadRequestException('Invalid credentials');
    }
    const account = await this.authService.validateAccount(loginDTO);
    let loginResult = {};
    if (account !== null) {
      loginResult['is_valid_account'] = true;
      loginResult['access_token'] = await this.authService.login(account);
    }
    else {
      loginResult['is_valid_account'] = false;
      loginResult['access_token'] = null;
    }
    return loginResult;
  }

  @Get('account')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Token is valid.' })
  @ApiResponse({ status: 401, description: 'Token is expired or invalid.' })
  async account(@Request() req) {
    const account = await this.authService.getAccount(req.user.account_id);
    return { account: account };
  }

}