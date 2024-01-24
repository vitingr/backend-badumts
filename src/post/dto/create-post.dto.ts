export class CreatePostDto {
  parent?: string;
  creator: string;
  creatorName: string;
  creatorPhoto: string;
  title: string;
  content: string;
  topics: string[];
}
