import { Module } from '@nestjs/common';
import { PostController } from './post-controller';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [],
})
export class PostModule {}
