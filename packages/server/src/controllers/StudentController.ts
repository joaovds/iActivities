import { getConnection } from 'typeorm';
import Student from '../models/Student';
import { Request, Response } from 'express';

import { emailService } from '../services/emailServices';

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

      emailService(
        email,
        'iActivities010@gmail.com',
        'Bem vindo(a) ao iActivities!',
        `Olá ${name}, seja bem vindo(a) ao iActivities!`,
        `<h3>Olá ${name}, seja bem vindo(a) ao iActivities!</h3>`,
      );

      return response.status(201).send({
        succes: 'Registered successfully',
        data: user
      });
    } catch (err) {
      console.log(err);
      return response.status(400).send({
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
        .where('id = :id', { id: cd_student })
        .getOne();

      return response.status(200).send({findStudent});
    } catch (err) {
      console.log(err);
      return response.status(400).send({
        error: 'Failed to create student',
        message: err.sqlMessage,
      });
    };
  };
  async delete(request: Request, response: Response): Promise<Response> {
    const { cd_student } = request.params;

    try {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Student)
        .where('id = :id', { id: cd_student })
        .execute();

      return response.status(200).send({
        success: `User with id ${cd_student} has been successfully deleted`,
      });
    } catch (err) {
      console.log(err);
      return response.status(400).send({
        error: 'Failed to create student',
        message: err.sqlMessage,
      });
    };
  };
  async update(request: Request, response: Response): Promise<Response> {
    const { cd_student } = request.params;

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
        .update(Student)
        .set(user)
        .where('id = :id', { id: cd_student })
        .execute();

      return response.status(200).send({
        success: `User with id ${cd_student} has been successfully updated`,
        data: user,
      });
    } catch (err) {
      console.log(err);
      return response.status(400).send({
        error: 'Failed to create student',
        message: err.sqlMessage,
      });
    }
  };
};
