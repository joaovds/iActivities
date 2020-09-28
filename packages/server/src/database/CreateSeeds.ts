import {getConnection} from 'typeorm';
import Subject from '../models/Subject';
import { Request, Response } from 'express';

export default class CreateSeeds {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Subject)
        .values([
          {
            name: 'Língua Portuguesa & Literatura'
          },
          {
            name: 'Matemática'
          },
          {
            name: 'História'
          },
          {
            name: 'Geografia'
          },
          {
            name: 'Biologia'
          },
          {
            name: 'Física'
          },
          {
            name: 'Química'
          },
          {
            name: 'Inglês'
          },
          {
            name: 'Educação Física'
          },
          {
            name: 'Educação Artística'
          },
          {
            name: 'Sociologia'
          },
          {
            name: 'Filosofia'
          },
          {
            name: 'Tecnologia'
          },
        ])
        .execute();

      return response.status(201).send({
        succes: 'Seeds successfully created'
      });
    } catch (err) {
      console.log(err);
      return response.status(400).send({
        error: 'Failed to create seeds',
        message: err.sqlMessage
      });
    }
  }
}
