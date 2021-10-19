import { Router } from 'express';

import { sanitizePublishRequest, sanitizeSubscribeRequest, validateRequest } from '../middlewares/request_validator.js';
import { publisherController, subscriberController, indexController, eventController } from '../controller/controller.js';
const router = Router();


router.post('/publish/:topic', sanitizePublishRequest, validateRequest, publisherController);
router.post('/event', eventController)
router.post('/subscribe/:topic', sanitizeSubscribeRequest, validateRequest, subscriberController)
router.get('/', indexController);

export const appRouter = router