import User from '@model/userModel';
import { compare } from 'bcryptjs';

export async function handleCredentialSignIn(credentials, req) {
  try {
    // check if user exists
    const user = await User.findOne({ email: credentials.email });

    if (!user) {
      throw new Error('Invalid email or password.');
    } else if (user.isVerified !== 'yes') {
      throw new Error('Verify Email First.');
    } else if (user.authProvider !== '') {
      throw new Error(`Please use the ${user.authProvider} sign-in method.`);
    }

    // check password with bcrypt compare function
    const passwordMatch = await compare(credentials.password, user.password);

    // if incorrect password or email
    if (!passwordMatch || user.email !== credentials.email) {
      throw new Error('Invalid email or password.');
    }

    const { email, firstName, lastName, role, image, id } = user;
    const name = `${firstName} ${lastName}`;
    const userObj = { email, name, role, image, id };

    return userObj;
  } catch (error) {
    // console.error(error);
    throw new Error(error.message);
  }
}

export async function handleProviderSignIn(user, account) {
  if (account.provider !== 'credentials') {
    const [firstName, lastName] = user.name.split(' ');

    const newUser = {
      id: user.id,
      firstName: firstName,
      lastName: lastName ?? '',
      email: user.email,
      password: '',
      image: user.image,
      authProvider: account.provider,
      isVerified: 'yes',
    };

    // check for existing user
    const userExists = await User.findOne({ email: user.email });

    // if user exists
    if (userExists) {
      await User.findOneAndUpdate(
        {
          email: user.email,
        },
        {
          id: user.id,
          email: user.email,
          image: user.image,
          authProvider: account.provider,
        },
        { new: true }
      );
    } else {
      User.create({
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
        image: newUser.image,
        authProvider: newUser.authProvider,
        isVerified: newUser.isVerified,
      });
    }
  }
}
