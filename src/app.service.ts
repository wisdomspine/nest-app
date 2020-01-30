import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/config.service';

@Injectable()
export class AppService {
  private isAuthEnabled : boolean = false;

  constructor(private configService: ConfigService){
    this.isAuthEnabled = configService.get("IS_AUTH_ENABLED")==="true";
  }
  getHello(): object {
    return {'Hello World!': "yes"};
  }
}
