import { getConnection } from 'typeorm';
import Post from '../models/Post';
import { Request, Response } from 'express';
import { getIdFromToken } from '../utils/getIdFromToken';

export default class PostController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      title,
      description,
      subject,
      photography = 0
    } = request.body;

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return response.status(401).json({
        message: 'Token is require',
      });
    };

    const student = getIdFromToken(authHeader);

    if (student === false) {
      return response.status(401).json({
        message: 'Token invalid',
      })
    }

    const post = {
      title,
      description,
      student,
      subject,
      photography
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
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return response.status(401).json({
        message: 'Token is require',
      });
    };

    const student = getIdFromToken(authHeader);

    if (student === false) {
      return response.status(401).json({
        message: 'Token invalid',
      })
    }

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
  async show(request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization;
    const { postId } = request.params;

    if (!authHeader) {
      return response.status(401).json({
        message: 'Token is require',
      });
    };

    const student = getIdFromToken(authHeader);

    if (student === false) {
      return response.status(401).json({
        message: 'Token invalid',
      })
    }

    try {
      const findPost = await getConnection()
        .getRepository(Post)
        .createQueryBuilder('post')
        .where('id = :postId', { postId })
        .andWhere('studentId = :student', {student})
        .getOne();

      return response.status(200).send({ findPost });
    } catch (err) {
      console.log(err);
      return response.status(400).send({
        error: 'Failed to list post',
        message: err.sqlMessage,
      });
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization;
    const { postId } = request.params;
    const {
      title,
      description,
      subject
    } = request.body;

    if (!authHeader) {
      return response.status(401).json({
        message: 'Token is require',
      });
    };

    const student = getIdFromToken(authHeader);

    if (student === false) {
      return response.status(401).json({
        message: 'Token invalid',
      })
    }

    const post = {
      title,
      description,
      student,
      subject
    };

    try {
      await getConnection()
        .createQueryBuilder()
        .update(Post)
        .set(post)
        .where('id = :id', { id: postId })
        .andWhere('studentId = :studentId', { studentId: student })
        .execute();

      return response.status(200).send({
        succes: `Post with id ${postId} has been successfully updated`,
        data: post
      });
    } catch (err) {
      console.log(err);
      return response.status(400).send({
        error: 'Failed to update post',
        message: err.sqlMessage,
      });
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization;
    const { postId } = request.params;

    if (!authHeader) {
      return response.status(401).json({
        message: 'Token is require',
      });
    };

    const student = getIdFromToken(authHeader);

    if (student === false) {
      return response.status(401).json({
        message: 'Token invalid',
      })
    }

    try {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Post)
        .where('id = :id', { id: postId })
        .andWhere('studentId = :studentId', { studentId: student })
        .execute();

      return response.status(200).send({
        success: `Post with id ${postId} has been successfully deleted`,
      });
    } catch (err) {
      console.log(err);
      return response.status(400).send({
        error: 'Failed to delete post',
        message: err.sqlMessage,
      });
    };
  };
}
