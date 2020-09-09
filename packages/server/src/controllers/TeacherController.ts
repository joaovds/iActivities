import { getConnection } from 'typeorm';
import Teacher from '../models/Teacher';
import { Request, Response } from 'express';

export default class TeacherController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      institution,
      age,
      email,
      password,
      id_subject
    } = request.body;

    const teacher = {
      name,
      institution,
      age,
      email,
      password,
      id_subject
    };

    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Teacher)
        .values(
          teacher
        )
        .execute();

      return response.status(201).send({
        succes: 'Registered successfully',
        data: teacher
      });
    } catch (err) {
      console.log(err);
      return response.status(400).send({
        error: 'Failed to create teacher',
        message: err.sqlMessage,
      });
    }
  };
};
