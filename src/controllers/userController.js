import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import validator from '../helpers/validations/validator';
import User from '../models/user';

dotenv.config();

const router = express.Router();
/**
 * Sign Up User
 */
router.post('/signup',(req, res) => {
  const errors = validator.validate(req.body, [
    'name','email', 'phoneNumber','confirmPhone', 'password', 'confirmPassword'
  ]);
  if (errors.length <= 0) {
    const user = new User();
    user.checkUserExistBefore(req.body)
      .then((emailExists) => {
        if (!emailExists) {
          user.signup()
            .then((result) => {
              const payload = {
                userId: result.userId,
                admin: result.admin,
               };
              const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5hr' });
              res.status(200).json(
                {
                  status: 'success',
                  token,
                  message: 'Account created Successfully',
                },
              );
            })
            .catch(() => {
              res.status(500).json({ status: 'failed', message: 'Problem signing up' });
            });
        } else {
          res.status(422).json({ status: 'failed', message: 'email exist', email: emailExists.email });
        }
      });
  } else {
    res.status(400).json({ status: 'failed', message: errors[0].message });
  }
});

/**
 * Login User
 */
router.post('/login', (req, res) => {
  const errors = validator.validate(req.body, [
    'email', 'password'
  ]);
  if (errors.length <= 0) {
    const user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.login()
      .then((result) => {
        switch (result.code) {
          case 2:
            {
              const payload = {
                userId: result.id,
                admin: result.admin,
              };
              const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5hr' });
              res.status(200).json({ status: 'success', message: 'You are logged in!', token });
            }
            break;
          default:
            res.status(401).json({ status: 'failed', message: 'invalid Email or Password' });
        }
      })
      .catch(() => {
        res.status(500).json({ status: 'failed', message: 'internal server error' });
      });
  } else {
    res.status(400).json({ status: 'failed', message: errors[0].message });
  }
});

/**
 * Create Admin user
 */
router.put('/admin', (req, res) =>{
  const user = new User();
  user.checkUserExistBefore(req.body)
      .then((emailExists) => {
        if (emailExists) {
          user.createAdmin(req.body.email)
          .then((result) => {
            if(result.rows[0]) {
              const newAdmin = result.rows[0];
              res.status(200).json({  status: 'Success', message: 'New Admin Created', newAdmin });
            }
          })
          .catch(() => {
            res.status(500).json({ status: 'failed', message: 'Problem updating user' });
          });
        } else {
          res.status(404).json({ status: 'failed', message: 'email not found' });
        }
      });
});

export default router;
