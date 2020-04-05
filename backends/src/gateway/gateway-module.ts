import { Module } from '@nestjs/common';
import { GatewayController } from './gateway-controller';

@Module({
  imports: [],
  controllers: [GatewayController],
  providers: [],
})
export class GatewayModule {}
