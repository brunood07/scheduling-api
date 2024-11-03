import { Router } from 'express';
import { HealthCheckController } from '../controllers/health-check-controller';

const healthCheckRoutes = Router();

const healthCheckController = new HealthCheckController();

healthCheckRoutes.get('/health-check', healthCheckController.handle);

export { healthCheckRoutes };