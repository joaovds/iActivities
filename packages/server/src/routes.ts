import { Router } from 'express';

import StudentController from './controllers/StudentController';

const routes = Router();

const studentController = new StudentController();

routes.post('/student', studentController.create);

export default routes;
