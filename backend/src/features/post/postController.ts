import { Request, Response } from "express";
import { Post } from "./postEntity";
import { postRepository } from "./postRepository";

class PostController {
  public async createPost(req: Request, res: Response): Promise<void> {
    const { title, content, user_id } = req.body;

    const post = new Post();
    post.title = title;
    post.content = content;
    post.user_id = user_id;

    const response = await postRepository.createPost(post);
    res.json(response);
  }

  public async getAllPosts(req: Request, res: Response): Promise<void> {
    console.log("GETTING ALL THE POSTS");

    const posts = await postRepository.getAllPosts();
    res.json(posts);
  }

  public async getPostById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const post = await postRepository.getPostById(id);
    res.json(post);
  }

  public async updatePost(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { title, content, user_id } = req.body;

    const post = new Post();
    post.title = title;
    post.content = content;
    post.user_id = user_id;

    const response = await postRepository.updatePost(id, post);
    res.json(response);
  }

  public async deletePost(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const response = await postRepository.deletePost(id);
    res.json(response);
  }
}

export const postController = new PostController();
