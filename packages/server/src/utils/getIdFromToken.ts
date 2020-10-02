import * as jwt from 'jsonwebtoken';

export function getIdFromToken (authHeader: string) {
  try {
    const [, token] = authHeader.split(' ');
    const decoded = jwt.verify(token, process.env.APP_SECRET);

    return decoded.id;
  } catch (err) {
    return false;
  }
}
