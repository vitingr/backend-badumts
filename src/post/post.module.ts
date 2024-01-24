import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService],
})
export class PostModule {}
