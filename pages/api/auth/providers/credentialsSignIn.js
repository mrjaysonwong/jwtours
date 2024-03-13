import User from '@model/userModel';
import connectMongo from 'lib/database/connection';
import { compare } from 'bcryptjs';

export async function credentialsSignIn(credentials, req) {
  await connectMongo();

  // check if user exists
  const userExists = await User.findOne({
    'email.email': credentials.email,
  });

  if (!userExists) {
    throw new Error('Invalid email or password');
  }

  const isVerified = await User.findOne({
    'email.email': credentials.email,
    'email.isVerified': true,
  });

  if (!isVerified) {
    throw new Error('Verify Email First');
  } else if (userExists.accountType !== '' && userExists.password === '') {
    throw new Error(`Please use the ${userExists.accountType} sign in method`);
  }

  // check password with bcrypt compare function
  const passwordMatch = await compare(
    credentials.password,
    userExists.password
  );

  // if incorrect password
  if (!passwordMatch) {
    throw new Error('Invalid email or password');
  }

  const { firstName, lastName, role, image, id } = userExists;

  const foundPrimaryEmail = userExists.email.find((e) => e.isPrimary === true);

  const name = `${firstName} ${lastName}`;

  const user = {
    email: foundPrimaryEmail.email,
    name,
    role,
    image: image.url,
    id,
  };

  return user;
}
