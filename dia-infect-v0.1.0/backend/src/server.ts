import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

const port = Number(process.env.PORT ?? 4000);

const frontendOrigin =
  process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173';

app.disable('x-powered-by');

app.use(helmet());

app.use(
  cors({
    origin: frontendOrigin,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(express.json({ limit: '100kb' }));

// Health check
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'dia-infect-api',
    version: '0.1.0',
    timestamp: new Date().toISOString(),
  });
});

// API root
app.get('/api', (_req, res) => {
  res.status(200).json({
    service: 'DiaInfect API',
    version: '0.1.0',
    health: '/api/health',
  });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    error: 'NOT_FOUND',
    message: 'Route not found.',
  });
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`DiaInfect API listening on port ${port}`);
});
