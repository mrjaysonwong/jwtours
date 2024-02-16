import User from '@model/userModel';
import { compare } from 'bcryptjs';

export async function CredentialSignIn(credentials, req) {
  try {
    // check if user exists
    const user = await User.findOne({
      'email.email': credentials.email,
    });

    if (!user) {
      throw new Error('Invalid email or password.');
    }

    const isVerified = await User.findOne({
      email: {
        $elemMatch: {
          email: credentials.email,
          isVerified: true,
        },
      },
    });

    if (!isVerified) {
      throw new Error('Verify Email First.');
    } else if (user.accountType !== '' && user.password === '') {
      throw new Error(`Please use the ${user.accountType} sign-in method.`);
    }

    // check password with bcrypt compare function
    const passwordMatch = await compare(credentials.password, user.password);

    // if incorrect password
    if (!passwordMatch) {
      throw new Error('Invalid email or password.');
    }

    const { firstName, lastName, role, image, id } = user;

    const foundPrimaryEmail = user.email.find((e) => e.isPrimary === true);

    const name = `${firstName} ${lastName}`;

    const userObj = {
      email: foundPrimaryEmail.email,
      name,
      role,
      image: image.url,
      id,
    };

    return userObj;
  } catch (error) {
    throw error;
  }
}
