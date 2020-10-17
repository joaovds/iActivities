import { Router } from 'express';

import StudentController from './controllers/StudentController';
import TeacherController from './controllers/TeacherController';
import PostController from './controllers/PostController';
import SubjectController from './controllers/SubjectController';
import ResponseController from './controllers/ResponseController';
import CreateSeeds from './database/CreateSeeds';

import Middlewares from './middlewares/auth';

const routes = Router();

const studentController = new StudentController();
const teacherController = new TeacherController();
const postControlller = new PostController();
const subjectController = new SubjectController();
const responseController = new ResponseController();
const createSeeds = new CreateSeeds();

const auth = new Middlewares();

routes.post('/student/login', studentController.login);
routes.post('/student', studentController.create);
routes.get('/student', studentController.index);
routes.get('/student/:cd_student', studentController.show);
routes.delete('/student', auth.auth, studentController.delete);
routes.put('/student', auth.auth, studentController.update);

routes.post('/teacher/login', teacherController.login);
routes.post('/teacher', teacherController.create);
routes.get('/teacher/:cd_teacher', teacherController.show);
routes.delete('/teacher', auth.auth, teacherController.delete);
routes.put('/teacher', teacherController.update);

routes.post('/post', auth.auth, postControlller.create);
routes.get('/post', auth.auth, postControlller.index);
routes.get('/post/:postId', auth.auth, postControlller.show);
routes.put('/post/:postId', auth.auth, postControlller.update);
routes.delete('/post/:postId', auth.auth, postControlller.delete);

routes.post('/response', auth.auth, responseController.create);
routes.delete('/response/:cd_response', auth.auth, responseController.delete);

routes.post('/subject', subjectController.create);
routes.get('/subject/:cd_subject', subjectController.show);
routes.get('/subject', subjectController.index);
routes.put('/subject/:cd_subject', subjectController.update);
routes.delete('/subject/:cd_subject', subjectController.delete);

routes.post('/seeds', createSeeds.create);

export default routes;
