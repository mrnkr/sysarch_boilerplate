import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import db from 'mongoose';
import passport from './auth';
import router from './routes';

db.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.authenticate(['jwt', 'anonymous'], { session: false }));

app.use('/api/users', router);
app.use((req, res) => res.status(404).end());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.code || 500).json(err);
});

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
