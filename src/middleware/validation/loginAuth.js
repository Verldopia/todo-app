/**
 * The authentication validators
 */
import { body } from 'express-validator';

export default [
  body('email')
    .notEmpty()
    .withMessage('No email detected')
    .bail()
    .isEmail()
    .withMessage('Incorrect email'),
  body('password')
    .notEmpty()
    .withMessage('No password detected')
    .bail()
    .isLength({ min: 6 })
    .withMessage('Password is not safe enough!'),
];
