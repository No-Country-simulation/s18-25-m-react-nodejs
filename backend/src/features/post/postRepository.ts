import con from "../../config/database";
import { Post } from "./postEntity";

class PostRepository {
  private repository = con.getRepository(Post);

  public async createPost(user: Post): Promise<Post> {
    return await this.repository.save(user);
  }

  public async getAllPosts(): Promise<Post[]> {
    return await this.repository.find();
  }

  public async getPostById(id): Promise<Post> {
    return await this.repository.findOneBy({ id: id });
  }

  public async updatePost(id, post: Post): Promise<Post> {
    return (await this.repository.update(id, post)).raw;
  }

  public async deletePost(id): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }
}

export const postRepository = new PostRepository();
