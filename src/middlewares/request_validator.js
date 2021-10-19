import { body, validationResult } from 'express-validator';

export const sanitizePublishRequest = [
    body('message').not().isEmpty()
        .isString()
        .withMessage('message must be a string')
        .isLength({min: 1})
        .withMessage('message cannot be empty'),
]

export const sanitizeSubscribeRequest = [
    body('url').not().isEmpty()
        .isURL()
        .withMessage('url param must be a valid url')
        .isString()
        .withMessage('url must be a string')
]



export function validateRequest(req, res, next) {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'RequestValidationError',
            message: 'Bad request',
            data: {
                errors: errors.array() 
            }
        })
    }

    next();
}