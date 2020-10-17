import { getConnection, getRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import Teacher from '../models/Teacher';
import { Request, Response } from 'express';
import { getIdFromToken } from '../utils/getIdFromToken';

import { azureCreate } from '../services/azureServiceCreate';

export default class TeacherController {
  async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const teacher = await getRepository(Teacher).find({
      where: {
        email
      }
    });

    if (teacher.length === 1) {
      if (password === teacher[0].password) {
        const token = jwt.sign({ id: teacher[0].id }, process.env.APP_SECRET, {
          expiresIn: '1d'
        });
        const data = {
          id: teacher[0].id,
          name: teacher[0].name,
          email: teacher[0].email,
          age: teacher[0].age,
          institution: teacher[0].institution,
          token
        };
        return response.status(200).json(data);
      } else {
        return response.status(404).json({
          message: 'User not found',
        });
      }
    } else {
      return response.status(404).json({
        message: 'User not found',
      });
    }
  }

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

    const teacherExist = await getConnection()
      .getRepository(Teacher)
      .createQueryBuilder('teacher')
      .where('email = :email', { email: email })
      .getOne();

    if (teacherExist) {
      return response.status(401).send({
        error: 'Conflict between fields'
      })
    }

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
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return response.status(401).json({
        message: 'Token is require',
      });
    };
    const cd_teacher = getIdFromToken(authHeader);

    if (cd_teacher === false) {
      return response.status(401).json({
        message: 'Token invalid',
      })
    }
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
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return response.status(401).json({
        message: 'Token is require',
      });
    };
    const cd_teacher = getIdFromToken(authHeader);

    if (cd_teacher === false) {
      return response.status(401).json({
        message: 'Token invalid',
      })
    }
    const {
      name,
      institution,
      age,
      email,
      password,
      subject
    } = request.body;

    const teacher = {
      name,
      institution,
      age,
      email,
      password,
      subject
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
