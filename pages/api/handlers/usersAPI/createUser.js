import User from '@model/userModel';
import jwt from 'jsonwebtoken';
import { hash } from 'bcryptjs';
import { sendEmail } from '@utils/config/email/sendMail';
import { htmlContent } from '@src/theme/emailTemplate';

export async function createUser(req, res) {
    try {
      if (!req.body) {
        return res.status(400).json({
          error: {
            code: 'BAD_REQUEST',
            message: 'Empty form data',
          },
        });
      }
  
      const { firstName, lastName, email, gender, password } = req.body;
  
      // check for existing user
      const user = await User.findOne({ email });
  
      if (user) {
        return res.status(422).json({
          error: {
            code: 'UNPROCESSABLE',
            message: 'Email Already Exists.',
          },
        });
      }
  
      const hashedPassword = await hash(password, 12);
  
      // create and hash password
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        gender,
        password: hashedPassword,
      });
  
      // Create an email verification token
      const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, {
        expiresIn: '2m',
      });
  
      newUser.emailToken = token;
      await newUser.save();
  
      const link = `${process.env.NEXTAUTH_URL}/verify?email=${newUser.email}&token=${token}`;
  
      const message = htmlContent(link, newUser.email);
  
      await sendEmail({
        to: newUser.email,
        subject: 'JWtours Email Verification',
        text: message,
      });
  
      return res.status(201).json({
        code: 'SUCCESS',
        message: `Verification link sent to ${newUser.email}`,
      });
    } catch (error) {
      console.error('User creation failed:', error);
  
      return res.status(500).json({
        error: {
          code: 'SERVER_ERROR',
          message: 'User creation failed.',
          error: error.errors,
        },
      });
    }
  }