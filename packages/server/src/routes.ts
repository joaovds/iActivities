import { Router } from 'express';

import StudentController from './controllers/StudentController';
import TeacherController from './controllers/TeacherController';
import PostController from './controllers/PostController';

import Middlewares from './middlewares/auth';

const routes = Router();

const studentController = new StudentController();
const teacherController = new TeacherController();
const postControlller = new PostController();

const auth = new Middlewares();

routes.post('/student/login', studentController.login);
routes.post('/student', studentController.create);
routes.get('/student/:cd_student', studentController.show);
routes.delete('/student/:cd_student', auth.auth, studentController.delete);
routes.put('/student/:cd_student', auth.auth, studentController.update);

routes.post('/teacher', teacherController.create);
routes.get('/teacher/:cd_teacher', teacherController.show);
routes.delete('/teacher/:cd_teacher', teacherController.delete);

routes.post('/post', auth.auth, postControlller.create);
routes.get('/post', auth.auth, postControlller.index);
routes.get('/post/:postId', auth.auth, postControlller.show);

export default routes;
