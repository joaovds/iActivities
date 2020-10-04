import { getConnection } from 'typeorm';
import Teacher from '../models/Teacher';
import { Request, Response } from 'express';

import { azureCreate } from '../services/azureServiceCreate';

export default class TeacherController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      institution,
      age,
      email,
      password,
      subject,
      image
    } = request.body;

    const photography = azureCreate('images', image);

    const teacher = {
      name,
      institution,
      age,
      email,
      password,
      subject,
      photography
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
    };
  };
  async show(request: Request, response: Response): Promise<Response> {
    const { cd_teacher } = request.params;

    try {
      const findTeacher = await getConnection()
        .getRepository(Teacher)
        .createQueryBuilder('teacher')
        .where('id = :id', { id: cd_teacher })
        .getOne();

      return response.status(200).send({findTeacher});
    } catch (err) {
      console.log(err);
      return response.status(400).send({
        error: 'Failed to show teacher',
        message: err.sqlMessage,
      });
    };
  };
  async delete(request: Request, response: Response): Promise<Response> {
    const { cd_teacher } = request.params;

    try {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Teacher)
        .where('id = :id', { id: cd_teacher })
        .execute();

      return response.status(200).send({
        success: `Teacher with id ${cd_teacher} has been successfully deleted`,
      });
    } catch (err) {
      console.log(err);
      return response.status(400).send({
        error: 'Failed to delete teacher',
        message: err.sqlMessage,
      });
    };
  };
  async update(request: Request, response: Response): Promise<Response> {
    const { cd_teacher } = request.params;

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
        .update(Teacher)
        .set(teacher)
        .where('id = :id', { id: cd_teacher })
        .execute();

      return response.status(200).send({
        success: `Teacher with id ${cd_teacher} has been successfully updated`,
        data: teacher,
      });
    } catch (err) {
      console.log(err);
      return response.status(400).send({
        error: 'Failed to updated teacher',
        message: err.sqlMessage,
      });
    };
  };
};
