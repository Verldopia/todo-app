/**
 * A Register Controller
 */

import { validationResult } from 'express-validator';
import { getConnection } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
  // errors
  const formErrors = req.formErrors ? req.formErrors : [];

  // input fields
  const inputs = [{
    name: 'email',
    label: 'E-mail',
    type: 'text',
    value: req.body?.email ? req.body.email : "",
    error: req.formErrorFields?.email ? req.formErrorFields?.email : ""
  }, {
    name: 'password',
    label: 'Password',
    type: 'password',
    value: req.body?.password ? req.body.password : "",
    error: req.formErrorFields?.password ? req.formErrorFields?.password : ""
  }, {
    name: 'name',
    label: 'Name',
    type: 'text',
    value: req.body?.name ? req.body.name : "",
    error: req.formErrorFields?.name ? req.formErrorFields?.name : ""
  }]

  // render the register page
  res.render('register', {
    layout: 'authentication',
    inputs,
    formErrors,
  });
}

export const postRegister = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
      req.formErrorFields = {};
      errors.array().forEach(({ msg, param }) => { req.formErrorFields[param] = msg })
      return next();
    } else {
      // Get the user repository
      const userRepository = getConnection().getRepository('User');

      // Validate if user exists
      const user = await userRepository.findOne({
        where: { email: req.body.email }
      });

      // Check if we found a user
      if(user) {
        req.formErrors = [{ message: "E-mail already registered" }]
        return next();
      };

      // Hash the password
      const hashedPassword = bcrypt.hashSync(req.body.password, 12)

      // Create a new user
      await userRepository.save({
        email: req.body.email,
        password: hashedPassword,
        name: req.body.name,
        categories: [
          {
            title: 'Default',
            slug: 'default',
            tasks: [
              {
                title: 'Click the icon to switch themes!',
                categoryId: 1,
                checked: false,
              },
              {
                title: 'Unleash chaos upon Gotham',
                categoryId: 1,
                checked: false,
              },
              {
                title: 'Registered for this app',
                categoryId: 1,
                checked: true,
              },
            ],
          },
        ],
      });

      // Go to login page
      res.redirect('/login');
    }

  } catch(e) {
    next(e.message);
  }
}

export const login = async (req, res) => {
  try { 
    // If there are cookies 
    if(req.cookies.token) {
      return res.redirect('/');
    }

    const formErrors = req.formErrors ? req.formErrors : [];

    // input fields
    const inputs = [{
      name: 'email',
      label: 'E-mail',
      type: 'text',
      value: req.body?.email ? req.body.email : "",
      error: req.formErrorFields?.email ? req.formErrorFields?.email : ""
    }, {
      name: 'password',
      label: 'Password',
      type: 'password',
      value: req.body?.password ? req.body.password : "",
      error: req.formErrorFields?.password ? req.formErrorFields?.password : ""
    }]
  
    // render the register page
    res.render('login', {
      layout: 'authentication',
      inputs,
      formErrors,
    });
  } catch(e) {
    next(e.message);
  }
}

export const postLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      req.formErrorFields = {};
      errors.array().forEach(({ msg, param }) => { req.formErrorFields[param] = msg })
      return next();

    }
    
    // Get the user repository
    const userRepository = getConnection().getRepository('User');

    // Validate if user exists
    const user = await userRepository.findOne({
      where: { email: req.body.email }
    });

    // Check if we found a user
    if(!user) {
      req.formErrors = [{ message: "User is not registered" }]
      return next();
    };

    // If password is equal to database
    const isEqual = bcrypt.compareSync(req.body.password, user.password)

    // If password is wrong
    if(!isEqual) {
      req.formErrors = [{ message: "Password is incorrect" }]
      return next();
    }
    
    // Create a webtoken
    const token = jwt.sign({ 
        userId: user.id, 
        email: user.email
      },
      process.env.TOKEN_SALT,
      { expiresIn: "10y" }
    )
    // Add the cookie to the response
    res.cookie('token', token, { httpOnly: true });

    // Redirect to homepage
    res.redirect('/'); 
  } catch(e) {
    next(e.message);
  }
}

export const logout = (req, res, next) => {
  try {
    res.clearCookie('token');
    return res.redirect('/login');
  } catch(e) {
    next(e.message);
  }
}