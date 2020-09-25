import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import Subject from '../models/Subject';

export default class SubjectController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    try {
      await getConnection().createQueryBuilder().insert().into(Subject).values({ name }).execute();

      return response.status(201).send({
        succes: 'Registered successfully',
        data: name,
      });
    } catch (err) {
      console.log(err);
      return response.status(400).send({
        error: 'Failed to create subject',
        message: err.sqlMessage,
      });
    }
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { cd_subject } = request.params;

    try {
      const findSubject = await getConnection()
        .getRepository(Subject)
        .createQueryBuilder('subject')
        .where('id = :id', { id: cd_subject })
        .getOne();

      return response.status(200).send({ findSubject });
    } catch (err) {
      console.log(err);
      return response.status(400).send({
        error: 'Failed to show subject',
        message: err.sqlMessage,
      });
    }
  }

  async index(request: Request, response: Response): Promise<Response> {
    try {
      const subjects = await getConnection()
        .getRepository(Subject)
        .createQueryBuilder('subject')
        .getMany();

      return response.status(200).send({ subjects });
    } catch (err) {
      console.log(err);
      return response.status(400).send({
        error: 'Failed to index subjects',
        message: err.sqlMessage,
      });
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { cd_subject } = request.params;
    const { name } = request.body;

    try {
      await getConnection()
        .createQueryBuilder()
        .update(Subject)
        .set({ name })
        .where('id = :id', { id: cd_subject })
        .execute();

      return response.status(201).send({
        succes: `Subject with id ${cd_subject} has been successfully updated`,
        data: name,
      });
    } catch (err) {
      console.log(err);
      return response.status(400).send({
        error: 'Failed to update subject',
        message: err.sqlMessage,
      });
    }
  }
}
