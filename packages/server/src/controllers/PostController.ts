import { getConnection } from 'typeorm';
import Post from '../models/Post';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

function getIdFromToken (authHeader: string) {
  try {
    const [, token] = authHeader.split(' ');
    const decoded = jwt.verify(token, process.env.APP_SECRET);

    return decoded.id;
  } catch (err) {
    return false;
  }
}

export default class PostController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      title,
      description,
      subject
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
}
