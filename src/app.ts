import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

// Заглушка авторизации
app.use((req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore — пока так, потом починим типы
  req.user = {
    _id: '692708d9cb2eb21b7a457d9e'
  };
  return next();
});

app.use('/users', usersRouter);  
app.use('/cards', cardsRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});