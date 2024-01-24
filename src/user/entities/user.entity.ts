export class User {
  id: string;
  photo: string;
  uuid: string;
  name: string;
  email: string;
  password?: string;
  posts: string[];
  qtdPosts?: number;
  likes: string[];
  supportDriver: boolean;
  blogDriver: boolean;
  createPostDriver: boolean;
}
