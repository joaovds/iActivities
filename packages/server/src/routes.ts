import { Router } from 'express';

import StudentController from './controllers/StudentController';
import TeacherController from './controllers/TeacherController';

const routes = Router();

const studentController = new StudentController();
const teacherController = new TeacherController();

routes.post('/student', studentController.create);
routes.get('/student/:cd_student', studentController.show);
routes.delete('/student/:cd_student', studentController.delete);
routes.put('/student/:cd_student', studentController.update);

routes.post('/teacher', teacherController.create);
routes.get('/teacher/:cd_teacher', teacherController.show);

export default routes;
