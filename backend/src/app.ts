import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { requestLogger } from './middleware/request-logger.middleware';
import { errorHandler } from './middleware/error.middleware';
import routes from './routes';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

export default app;
