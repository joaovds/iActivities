import { Router } from 'express';

import StudentController from './controllers/StudentController';

const routes = Router();

const studentController = new StudentController();

routes.post('/student', studentController.create);
routes.get('/student/:cd_student', studentController.show);

export default routes;