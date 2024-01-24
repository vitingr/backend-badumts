import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostProps } from './entities/post.entity';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto): Promise<PostProps> {
    const createdPost = await this.prisma.post.create({
      data: createPostDto
    })
    return createdPost
  }

  findAll(): Promise<PostProps[]> {
    return this.prisma.post.findMany()
  }

  findPostChilds(id: string): Promise<PostProps[]> {
    return this.prisma.post.findMany({
      where: {
        parent: id
      }
    })
  }

  findOne(id: string): Promise<PostProps> {
    return this.prisma.post.findUnique({
      where: {
        id: id
      }
    })
  }

  // update(id: number, updatePostDto: UpdatePostDto) {
  //   return `This action updates a #${id} post`;
  // }

  async remove(id: string): Promise<void> {
    await this.prisma.post.delete({
      where: {
        id: id
      }
    })
  }
}
