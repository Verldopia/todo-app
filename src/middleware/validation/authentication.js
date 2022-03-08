/**
 * The authentication validators
 */
 import { body } from "express-validator";


export default [
  body('email')
    .notEmpty()
    .withMessage('Geen  e-mail gegeven')
    .bail()
    .isEmail()
    .withMessage('Geen correcte e-mail'),
  body('password')
    .notEmpty()
    .withMessage('Geen ww gegeven')
    .bail()
    .isLength({ min: 6 })
    .withMessage('Wachtwoord minlengte: 6'),
]