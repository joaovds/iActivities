import 'reflect-metadata';
import './database/connection';
import * as express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Running server in http://localhost:3333...');
})

app.listen(3333)
