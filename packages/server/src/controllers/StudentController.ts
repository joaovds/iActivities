import { getConnection } from 'typeorm';
import Student from '../models/Student';
import { Request, Response } from 'express';

export default class StudentController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      institution,
      age,
      email,
      password
    } = request.body;

    const user = {
      name,
      institution,
      age,
      email,
      password
    };

    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Student)
        .values(
          user
        )
        .execute();

      return response.status(201).send({
        succes: 'Registered successfully',
        data: user
      });
    } catch (err) {
      console.log(err);
      response.status(400).send({
        error: 'Failed to create student',
        message: err.sqlMessage,
      });
    };
  };
  async show(request: Request, response: Response): Promise<Response> {
    const { cd_student } = request.params;

    try {
      const findStudent = await getConnection()
        .getRepository(Student)
        .createQueryBuilder('student')
        .where('cd_student = :id', { id: cd_student })
        .getOne();

      return response.status(200).send({findStudent});
    } catch (err) {
      console.log(err);
      response.status(400).send({
        error: 'Failed to create student',
        message: err.sqlMessage,
      });
    }
  }
};
