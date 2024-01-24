export class PostProps {
  id: string;
  parent?: string;
  creator: string;
  creatorName: string;
  creatorPhoto: string;
  likes: string[];
  qtdLikes?: number;
  title: string;
  content: string;
  created: Date;
  topics: string[];
}
