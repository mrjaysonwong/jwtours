import User from '@model/userModel';
import { compare } from 'bcryptjs';

export async function handleCredentialSignIn(credentials, req) {
  try {
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
    const userObj = { email, name, role, image, id };

    return userObj;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function handleProviderSignIn(user, account) {
  try {
    // check for existing user
    const userExists = await User.findOne({ email: user.email });
    const [firstName, lastName] = user.name.split(' ');

    const newUser = {
      id: user.id,
      firstName,
      lastName: lastName ?? '',
      email: user.email,
      password: '',
      image: user.image,
      accountType: account.provider,
      isVerified: true,
    };

    if (!userExists) {
      await User.create({
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
        image: newUser.image,
        accountType: newUser.accountType,
        isVerified: newUser.isVerified,
      });
    }

    if (userExists) {
      // if existing user and with provider
      await User.findOneAndUpdate(
        {
          email: user.email,
        },
        {
          id: user.id,
          email: user.email,
          image: user.image,
          accountType: account.provider,
        },
        { new: true }
      );
    }
  } catch (error) {
    console.error('Provider error:', error);
    throw new Error(error.message);
  }
}
