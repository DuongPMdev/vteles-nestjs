import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entity/account.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private jwtService: JwtService
  ) {}

  async validateAccount(loginDTO: LoginDTO): Promise<any> {
    if (loginDTO.custom_login_id !== null && loginDTO.custom_login_id !== '') {
      const account = await this.accountRepository.findOne({ where: { custom_login_id: loginDTO.custom_login_id } });
      return account;
    }
    return null;
  }

  async login(account: any) {
    const payload = { account_id: account.account_id };
    return this.jwtService.sign(payload);
  }

  async getAccount(account_id: string): Promise<any> {
    if (account_id !== null && account_id !== '') {
      const account = await this.accountRepository.findOne({ where: { account_id: account_id } });
      return account;
    }
    return null;
  }
  
}