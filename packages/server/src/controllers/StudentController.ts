import { getConnection } from 'typeorm';
import Student from '../models/Student';

export default class StudentController {
  async create(request, response): Promise<void> {
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
        .values({
          user
        });

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
};
