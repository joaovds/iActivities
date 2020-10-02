import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import ResponseClass from '../models/Response';
import { getIdFromToken } from '../utils/getIdFromToken';

export default class ResponseController {
  async create(request: Request, response: Response): Promise<Response> {
    const { response_body, postId } = request.body;

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
      });
    };

    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(ResponseClass)
        .values({ response_body, post: postId })
        .execute();

      return response.status(201).send({
        succes: 'Registered successfully',
        data: { response_body, postId }
      })
    } catch (err) {
      console.log(err);
      return response.status(400).send({
        error: 'Failed to create response',
        message: err.sqlMessage
      });
    }
  };
}
