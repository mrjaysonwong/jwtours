import User from '@model/userModel';
import Token from '@model/tokenModel';
import { handleResponseError } from '@utils/helper/functions/errorHandler';

export async function authSignIn(req, res) {
  const { token, email, mode } = req.body;
  const isSignUp = mode === 'signup';

  const userExists = await User.findOne({
    'email.email': email,
  });

  if (!userExists) {
    return handleResponseError(
      res,
      404,
      'Requested resource not found',
      'User not found'
    );
  }

  const userTokenExists = await Token.findOne({
    'email.email': email,
    'email.token': token,
  });

  if (!userTokenExists) {
    return handleResponseError(
      res,
      401,
      'Invalid sign in link',
      'User token not found'
    );
  }

  const userTokenVerified = await Token.findOne({
    'email.email': email,
    'email.isVerified': true,
  });

  if (userTokenVerified) {
    return handleResponseError(
      res,
      401,
      'Email has been already verified',
      'User token has been already verified'
    );
  }

  if (isSignUp) {
    // Set isVerified to true for the newly signed-up user
    await User.findOneAndUpdate(
      {
        'email.email': email,
      },
      {
        $set: {
          'email.$.isVerified': true,
        },
      },
      {
        new: true,
      }
    );
  }

  await Token.findOneAndUpdate(
    { 'email.email': email },
    {
      $set: {
        'email.$.isVerified': true,
      },
    },
    { new: true }
  );

  const { firstName, lastName, image, id } = userExists;

  const foundEmail = userExists.email.find((e) => e.email === email);
  const name = `${firstName} ${lastName}`;

  const userObj = {
    email: foundEmail.email,
    name,
    image: image.url ?? null,
    id,
  };

  return res.status(200).json(userObj);
}
