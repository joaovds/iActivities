import { getConnection, getRepository } from 'typeorm';
import Student from '../models/Student';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { emailService } from '../services/emailServices';
import { getIdFromToken } from '../utils/getIdFromToken';

import { azureCreate } from '../services/azureServiceCreate';

export default class StudentController {
  async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const student = await getRepository(Student).find({
      where: {
        email
      }
    });

    if (student.length === 1) {
      if (password === student[0].password) {
        const token = jwt.sign({ id: student[0].id, isTeacher: false }, process.env.APP_SECRET, {
          expiresIn: '1d'
        });
        const data = {
          id: student[0].id,
          name: student[0].name,
          email: student[0].email,
          age: student[0].age,
          institution: student[0].institution,
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
      image
    } = request.body;

    const photography = azureCreate('images', image);

    const user = {
      name,
      institution,
      age,
      email,
      password,
      photography
    };

    const userExist = await getConnection()
      .getRepository(Student)
      .createQueryBuilder('student')
      .where('email = :email', { email: email })
      .getOne();

    if (userExist) {
      return response.status(401).send({
        error: 'Conflict between fields'
      })
    }

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
  async index(request: Request, response: Response): Promise<Response> {
    try {
      const users = await getConnection()
        .getRepository(Student)
        .createQueryBuilder('student')
        .select(['id', 'name', 'institution', 'age', 'email'])
        .getRawMany();

      return response.status(200).json({
        students: users
      })
    } catch (err) {
      console.log(err);
      return response.status(400).send({
        error: 'Failed to list all users',
        message: err.sqlMessage,
      });
    }
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
        error: 'Failed to show student',
        message: err.sqlMessage,
      });
    };
  };
  async delete(request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization;

    const cd_student = getIdFromToken(authHeader);

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
        error: 'Failed to delete student',
        message: err.sqlMessage,
      });
    };
  };
  async update(request: Request, response: Response): Promise<Response> {
    const authHeader = request.headers.authorization;

    const cd_student = getIdFromToken(authHeader);

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
        error: 'Failed to update student',
        message: err.sqlMessage,
      });
    }
  };
};
