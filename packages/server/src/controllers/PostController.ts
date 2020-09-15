import { getConnection } from 'typeorm';
import Post from '../models/Post';
import { Request, Response } from 'express';

export default class PostController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      title,
      description,
      subjectId,
      studentId
    } = request.body;

    // const studentId = request.headers.authorization;

    const post = {
      title,
      description,
      studentId,
      subjectId
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
  }
}
