import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostProps } from './entities/post.entity';
import { PrismaService } from 'src/database/prisma.service';
import { LikePostDto } from './dto/like-post.dto';
import { DislikePostDto } from './dto/dislike-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto): Promise<PostProps> {
    const createdPost = await this.prisma.post.create({
      data: createPostDto,
    });
    
    const updatedUser = await this.prisma.user.update({
      where: {
        id: createPostDto.creator
      },
      data: {
        qtdPosts: {
          increment: 1
        },
        posts: {
          push: createdPost.id
        }
      }
    })

    return createdPost;
  }

  async findAll(): Promise<PostProps[]> {
    const posts = await this.prisma.post.findMany({
      where: {
        title: { not: 'Resposta' },
      },
    });

    console.log(posts)

    return posts
  }

  findPostChilds(id: string): Promise<PostProps[]> {
    return this.prisma.post.findMany({
      where: {
        parent: id,
      },
    });
  }

  findOne(id: string): Promise<PostProps> {
    return this.prisma.post.findUnique({
      where: {
        id: id,
      },
    });
  }

  likePost(data: LikePostDto): Promise<PostProps> {
    return this.prisma.post.update({
      where: {
        id: data.postId
      },
      data: {
        likes: {
          push: data.userId
        },
        qtdLikes: {increment: 1}
      }
    })
  }

  dislikePost(data: DislikePostDto): Promise<PostProps> {
    return this.prisma.post.update({
      where: {
        id: data.postId
      },
      data: {
        likes: {
          set: data.likes.filter((userId) => userId !== data.userId)
        },
        qtdLikes: {decrement: 1}
      }
    })
  }

  // update(id: number, updatePostDto: UpdatePostDto) {
  //   return `This action updates a #${id} post`;
  // }

  async remove(id: string): Promise<void> {
    await this.prisma.post.delete({
      where: {
        id: id,
      },
    });
  }
}
