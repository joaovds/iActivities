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

    const teacher = getIdFromToken(authHeader);

    if (teacher === false) {
      return response.status(401).json({
        message: 'Token invalid',
      });
    };

    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(ResponseClass)
        .values({ teacher, response_body, post: postId })
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
  async delete(request: Request, response: Response): Promise<Response> {
    const { cd_response } = request.params;

    try {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(ResponseClass)
        .where('id = :id', { id: cd_response })
        .execute();

      return response.status(200).send({
        success: `Response with id ${cd_response} has been successfully deleted`,
      });
    } catch (err) {
      console.log(err);
      return response.status(400).send({
        error: 'Failed to delete response',
        message: err.sqlMessage,
      });
    };
  }
}
