import User from '@model/userModel';

export async function ProviderSignIn(user, account) {
  try {
    // check for existing user
    const userExists = await User.findOne({
      email: {
        $elemMatch: {
          email: user.email,
        },
      },
    });
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
        email: [
          {
            email: newUser.email,
            isPrimary: true,
            isVerified: newUser.isVerified,
          },
        ],
        password: newUser.password,
        image: {
          url: newUser.image,
        },
        accountType: newUser.accountType,
      });
    }

    if (userExists) {
      // if existing user
      await User.findOneAndUpdate(
        {
          email: {
            $elemMatch: {
              email: user.email,
            },
          },
        },
        {
          $set: {
            id: user.id,
            'email.$.isPrimary': true,
            'email.$.isVerified': true,
            image: {
              public_id: userExists.image.public_id,
              url: userExists.image.url,
            },
            accountType: account.provider,
          },
        },
        { new: true }
      );
    }
  } catch (error) {
    console.error('ProviderSignIn Error:', error.message);
    throw new Error('An error occured. Please try again or Refresh the page.');
  }
}
