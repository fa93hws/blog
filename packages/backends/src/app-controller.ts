import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index.ejs')
  getHello() {
    return { message: '123' };
  }
}
