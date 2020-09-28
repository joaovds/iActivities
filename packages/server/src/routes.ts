import { Router } from 'express';

import StudentController from './controllers/StudentController';
import TeacherController from './controllers/TeacherController';
import PostController from './controllers/PostController';
import SubjectController from './controllers/SubjectController';
import CreateSeeds from './database/CreateSeeds';

import Middlewares from './middlewares/auth';

const routes = Router();

const studentController = new StudentController();
const teacherController = new TeacherController();
const postControlller = new PostController();
const subjectController = new SubjectController();
const createSeeds = new CreateSeeds();

const auth = new Middlewares();

routes.post('/student/login', studentController.login);
routes.post('/student', studentController.create);
routes.get('/student', studentController.index);
routes.get('/student/:cd_student', studentController.show);
routes.delete('/student', auth.auth, studentController.delete);
routes.put('/student', auth.auth, studentController.update);

routes.post('/teacher', teacherController.create);
routes.get('/teacher/:cd_teacher', teacherController.show);
routes.delete('/teacher/:cd_teacher', teacherController.delete);

routes.post('/post', auth.auth, postControlller.create);
routes.get('/post', auth.auth, postControlller.index);
routes.get('/post/:postId', auth.auth, postControlller.show);

routes.post('/subject', subjectController.create);
routes.get('/subject/:cd_subject', subjectController.show);
routes.get('/subject', subjectController.index);
routes.put('/subject/:cd_subject', subjectController.update);
routes.delete('/subject/:cd_subject', subjectController.delete);

routes.post('/seeds', createSeeds.create);

export default routes;
