import { Controller, Get } from '@nestjs/common';

@Controller()
export class GatewayController {
  constructor() {}

  @Get()
  getHello(): string {
    return '123';
  }
}
