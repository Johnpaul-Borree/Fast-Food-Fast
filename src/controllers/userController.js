import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import validator from '../helpers/validations/userValidator';
import User from '../models/user';

dotenv.config();

const router = express.Router();

// signup route
router.post('/signup', validator.singUp, (req, res) => {
  const errors = validator.validationResult(req);
  if (errors.isEmpty()) {
    const user = new User();
    user.checkUserExistBefore(req.body)
      .then((emailExists) => {
        if (!emailExists) { // Email doesn't exist so signup user;
          user.signup()
            .then((userId) => {
              const payload = { userId };
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
    res.status(400).json({ status: 'failed', message: errors.array()[0].msg });
  }
});

export default router;
