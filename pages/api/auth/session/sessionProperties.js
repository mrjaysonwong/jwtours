import connectMongo from 'lib/database/connection';
import User from '@model/userModel';

export async function sessionProperties(session, token) {
  try {
    await connectMongo();

    // check for existing user
    const userExists = await User.findOne({
      'email.email': token.user.email,
    });

    if (!userExists) {
      throw new Error('User Not Found.');
    }

    // add prop token user to session user object
    session.user = token.user;
    session.user._id = `${userExists._id}`;
    session.user.name =
      `${userExists.firstName} ${userExists.lastName}` ?? token.user.name;
    session.user.role = userExists.role;
    session.user.accountType = userExists.accountType;
  } catch (error) {
    throw error;
  }
}
