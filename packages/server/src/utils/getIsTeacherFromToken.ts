import * as jwt from 'jsonwebtoken';

export function getIsTeacherFromToken (authHeader: string) {
  try {
    const [, token] = authHeader.split(' ');
    const decoded = jwt.verify(token, process.env.APP_SECRET);

    return decoded.isTeacher;
  } catch (err) {
    return false;
  }
}
