import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Hi, there?' })
  @ApiResponse({ status: 200, description: 'Hi, there!' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
