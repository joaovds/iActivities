import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import Like from '../models/Like';
import { getIdFromToken } from '../utils/getIdFromToken';
import { getIsTeacherFromToken } from '../utils/getIsTeacherFromToken';

export default class ResponseController {
  async create(request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization;
    const { cd_response } = request.params;

    const user = getIdFromToken(authHeader);
    const isTeacher = getIsTeacherFromToken(authHeader);

    if (isTeacher) {
      try {
        const like = await getConnection()
          .createQueryBuilder()
          .insert()
          .into(Like)
          .values({ teacher: user, response: { id: Number(cd_response) } })
          .execute();

        return response.status(201).send({
          succes: 'Registered successfully',
          data: like
        })
      } catch (err) {
        console.log(err);
        return response.status(400).send({
          error: 'Failed to create like',
          message: err.sqlMessage
        });
      }
    } else {
      try {
        const like = await getConnection()
          .createQueryBuilder()
          .insert()
          .into(Like)
          .values({ student: user, response: { id: Number(cd_response) } })
          .execute();

        return response.status(201).send({
          succes: 'Registered successfully',
          data: like
        })
      } catch (err) {
        console.log(err);
        return response.status(400).send({
          error: 'Failed to create like',
          message: err.sqlMessage
        });
      }
    }
  };
}
