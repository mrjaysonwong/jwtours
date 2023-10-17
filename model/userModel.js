import { Schema, model, models } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { EMAIL_REGX } from '@utils/yup/credentialsSchema';

const userSchema = new Schema(
  {
    id: {
      type: String,
      default: uuidv4,
    },
    firstName: {
      type: String,
      required: true,
      match: [/^[A-Za-z ]*$/, 'Please enter valid name'],
    },
    lastName: {
      type: String,
      required: true,
      match: [/^[A-Za-z ]*$/, 'Please enter valid name'],
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'Email address is required'],
      match: [EMAIL_REGX, 'Invalid email address'],
    },
    gender: {
      type: String,
      enum: ['', 'male', 'female', 'other'],
      default: '',
    },
    password: {
      type: String,
      // only type: String for providers login passwordless default to empty string & not required
    },
    role: {
      type: String,
      enum: ['user', 'guide', 'admin'],
      default: 'admin',
    },
    image: {
      type: String,
      default: '',
    },
    accountType: {
      type: String,
      default: '',
    },
    phone: {
      areaCode: {
        type: String,
        default: '',
      },
      phoneNumber: {
        type: String,
        default: '',
      },
    },
    dateOfBirth: {
      type: String,
      default: '',
    },
    homeTown: {
      type: String,
      default: '',
    },
    paymentCards: {
      type: String,
      default: '',
    },
    subscribe: {
      type: Boolean,
      default: false,
    },
    tourLanguage: {
      type: String,
      default: '',
    },
    specialReq: {
      type: String,
      default: '',
    },
    languageCountry: {
      type: String,
      default: 'English (US)',
    },
    currency: {
      type: String,
      default: '$ - USD',
    },
    status: {
      online: {
        type: Boolean,
        default: false,
      },
    },
    banned: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    resetToken: { type: String },
    isVerified: { type: Boolean, default: false },
    emailToken: { type: String },
  },
  { timestamps: true }
);

const User = models?.user || model('user', userSchema);

export default User;
