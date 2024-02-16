import { Schema, model, models } from 'mongoose';
import { EMAIL_REGX } from '@utils/yup/credentialsSchema';

const tokenSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  email: [
    {
      email: {
        type: String,
        trim: true,
        required: [true, 'Email address is required'],
        match: [EMAIL_REGX, 'Invalid email address'],
      },
      token: {
        type: String,
        required: true,
      },
      expireTimestamp: {
        type: Number,
        required: true,
      },
      requestCount: {
        type: Number,
        default: undefined,
      },
      rateLimit: {
        type: Boolean,
        default: undefined,
      },
      _id: false,
    },
  ],
});

const Token = models?.token || model('token', tokenSchema);

export default Token;
