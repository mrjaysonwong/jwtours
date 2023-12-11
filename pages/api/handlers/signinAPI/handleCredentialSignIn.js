import User from '@model/userModel';
import { compare } from 'bcryptjs';

export async function handleCredentialSignIn(credentials, req) {
  // check if user exists
  const user = await User.findOne({ email: credentials.email });

  if (!user) {
    throw new Error('Invalid email or password.');
  } else if (!user.isVerified) {
    throw new Error('Verify Email First.');
  } else if (user.accountType !== '' && user.password === '') {
    throw new Error(`Please use the ${user.accountType} sign-in method.`);
  }

  // check password with bcrypt compare function
  const passwordMatch = await compare(credentials.password, user.password);

  // if incorrect password or email
  if (!passwordMatch || user.email !== credentials.email) {
    throw new Error('Invalid email or password.');
  }

  const { email, firstName, lastName, role, image, id } = user;
  const name = `${firstName} ${lastName}`;

  const userObj = {
    email,
    name,
    role,
    image: image?.url,
    id,
  };

  return userObj;
}
