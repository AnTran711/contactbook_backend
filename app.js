import express from 'express';
import cors from 'cors';
import contactRouter from './app/routes/contact.route.js';
import ApiError from './app/api_error.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactRouter);

app.get('/', (req, res) => {
  res.json({ message: "Welcome to contact book application." });
});

// Handle 404 response
app.use((req, res, next) => {
  return next(new ApiError(404, 'Resource not found'));
});

// Define error-handling middleware last
app.use((err, req, res) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error'
  });
});

export default app;
