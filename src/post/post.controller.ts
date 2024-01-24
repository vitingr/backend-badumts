import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostProps } from './entities/post.entity';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  create(@Body() createPostDto: CreatePostDto): Promise<PostProps> {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll(): Promise<PostProps[]> {
    return this.postService.findAll();
  }

  @Get('/postChild/:id')
  findPostChilds(@Param('id') id: string): Promise<PostProps[]> {
    return this.postService.findPostChilds(id)
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PostProps> {
    return this.postService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
  //   return this.postService.update(+id, updatePostDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.postService.remove(id).then(() => {
      return true
    }).catch((error) => {
      return false
    })
  }
}
