import { getConnection } from 'typeorm';
import Post from '../models/Post';
import { Request, Response } from 'express';

export default class PostController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      title,
      description,
      subject
    } = request.body;

    const student = request.headers.authorization;

    const post = {
      title,
      description,
      student,
      subject
    };

    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Post)
        .values(post)
        .execute();

      return response.status(201).send({
        succes: 'Registered successfully',
        data: post
      });
    } catch (err) {
      console.log(err);
      return response.status(400).send({
        error: 'Failed to create post',
        message: err.sqlMessage
      });
    }
  };
  async index(request: Request, response: Response): Promise<Response> {
    const student = request.headers.authorization;

    try {
      const findAllPosts = await getConnection()
        .getRepository(Post)
        .createQueryBuilder('post')
        .where('studentId = :student', {student})
        .getMany();

      return response.status(200).send(findAllPosts)
    } catch (err) {
      console.log(err);
      return response.status(400).send({
        error: 'Failed to list posts',
        message: err.sqlMessage,
      });
    }
  }
}
