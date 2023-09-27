import { Schema, model, models } from 'mongoose';

import { v4 as uuidv4 } from 'uuid';

const userSchema = new Schema(
  {
    id: {
      type: String,
      default: uuidv4,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String },
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
    resetToken: { type: String },
    isVerified: { type: Boolean, default: false },
    emailToken: { type: String },
  },
  { timestamps: true }
);

// const userSchema = new Schema(
//   {
//     id: {
//       type: String,
//       default: uuidv4,
//     },
//     firstName: {
//       type: String,
//       required: true,
//     },
//     lastName: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//     },
//     password: { type: String },
//     phone: {
//       areaCode: {
//         type: String,
//         default: '',
//       },
//       phoneNumber: {
//         type: String,
//         default: '',
//       },
//     },
//     dateOfBirth: {
//       type: String,
//       default: '',
//     },
//     homeTown: {
//       type: String,
//       default: '',
//     },
//     role: {
//       type: String,
//       enum: ['user', 'guide', 'admin'],
//       default: 'user',
//     },
//     image: {
//       type: String,
//       default: '',
//     },
//     authProvider: {
//       type: String,
//       default: '',
//     },
//     paymentCards: {
//       type: String,
//       default: '',
//     },
//     subscribe: {
//       type: Boolean,
//       default: false,
//     },
//     tourLanguage: {
//       type: String,
//       default: '',
//     },
//     specialReq: {
//       type: String,
//       default: '',
//     },
//     languageCountry: {
//       type: String,
//       default: 'English (US)',
//     },
//     currency: {
//       type: String,
//       default: '$ - USD',
//     },
//     status: {
//       online: {
//         type: Boolean,
//         default: false,
//       },
//     },
//     banned: {
//       type: Boolean,
//       default: false,
//     },
//     active: {
//       type: Boolean,
//       default: true,
//     },
//   },

//   { timestamps: true }
// );

const User = models?.user || model('user', userSchema);

export default User;
