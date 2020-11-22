import { Module } from '@nestjs/common';
import { AppController } from './app-controller';
import { PostModule } from './post/post-module';

@Module({
  imports: [PostModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
