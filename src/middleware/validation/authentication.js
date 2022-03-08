/**
 * The authentication validators
 */
 import { body } from "express-validator";

export default [
  body('email')
    .notEmpty()
    .withMessage('Geen e-mail ingevoerd')
    .bail()
    .isEmail()
    .withMessage('Geen correct e-mailadres'),
  body('password')
    .notEmpty()
    .withMessage('Geen wachtwoord ingevoerd')
    .bail()
    .isLength({ min: 6 })
    .withMessage('wachtwoord moet minimum 6 karakters lang zijn'),
]